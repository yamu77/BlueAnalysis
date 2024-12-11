import time
import urllib.parse
from io import StringIO

import pandas as pd
import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from tqdm import tqdm

HOSHINO = "ホシノ（臨戦）"


def get_student_list() -> pd.DataFrame:
    # URLを指定
    url = "https://bluearchive.wikiru.jp/?%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E4%B8%80%E8%A6%A7"

    # ページの内容を取得
    response = requests.get(url)
    response.encoding = "utf-8"

    # テーブルを読み込み
    df = pd.read_html(StringIO(response.text), attrs={"id": "sortabletable1"})[0]

    # 空の行を削除
    df = df.dropna(subset=["名前"])

    # カラム名の空白を削除
    df.columns = df.columns.str.replace(" ", "")

    # 値の空白を削除
    df = df.apply(lambda x: x.str.replace(" ", "") if x.dtype == "object" else x)

    # 画像カラムを削除
    df = df.drop(["画像", "募集", "追加"], axis=1)

    return df


def get_student_appearance() -> pd.DataFrame:
    # URLを指定
    url = "https://bluearchive.wikiru.jp/?%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E5%AE%9F%E8%A3%85%E5%B1%A5%E6%AD%B4"

    # ページの内容を取得
    response = requests.get(url)
    response.encoding = "utf-8"

    # テーブルを読み込み
    df = pd.read_html(StringIO(response.text), attrs={"id": "sortabletable1"})[0]

    # 空の行を削除
    df = df.dropna(subset=["名前"])

    # カラム名の空白を削除
    df.columns = df.columns.str.replace(" ", "")

    # 画像カラムを削除
    drop_columns = [i for i in df.columns if i not in ["名前", "実装日"]]
    df = df.drop(drop_columns, axis=1)

    return df


def get_student_profile_for_playwright(url, switch=False) -> dict:
    """キャラクターのプロフィール情報を取得する関数

    Args:
        url (str): キャラクターページのURL

    Returns:
        dict: キャラクターのプロフィール情報
    """
    with sync_playwright() as p:
        # ブラウザを起動
        browser = p.chromium.launch()
        page = browser.new_page()

        # URLにアクセス
        page.goto(url)

        # 指定要素を取得
        if switch:
            profile = {
                "名前": page.locator(
                    "#content_1_0+p+div>div:nth-child(3) table > tbody > tr:nth-child(2) > td:nth-child(3)"
                ).text_content(),
                "学園": page.locator(
                    "#content_1_0+p+div >div:nth-child(3) table > tbody > tr:nth-child(12) > td:nth-child(2)"
                ).text_content(),
                "部活": page.locator(
                    "#content_1_0+p+div >div:nth-child(3) table > tbody > tr:nth-child(13) > td:nth-child(2)"
                ).text_content(),
                "年齢": page.locator(
                    "#content_1_0+p+div >div:nth-child(3) table > tbody > tr:nth-child(14) > td:nth-child(2)"
                ).text_content(),
                "誕生日": page.locator(
                    "#content_1_0+p+div >div:nth-child(3) table > tbody > tr:nth-child(15) > td:nth-child(2)"
                ).text_content(),
                "身長": page.locator(
                    "#content_1_0+p+div >div:nth-child(3) table > tbody > tr:nth-child(16) > td:nth-child(2)"
                ).text_content(),
            }
            table = page.locator(
                "#content_1_0+p+div>div:nth-child(3)>div:nth-child(3)"
            ).inner_html()
        else:
            profile = {
                "名前": page.locator(
                    "#content_1_0+p+div>div:nth-child(2) table > tbody > tr:nth-child(2) > td:nth-child(3)"
                ).text_content(),
                "学園": page.locator(
                    "#content_1_0+p+div >div:nth-child(2) table > tbody > tr:nth-child(12) > td:nth-child(2)"
                ).text_content(),
                "部活": page.locator(
                    "#content_1_0+p+div >div:nth-child(2) table > tbody > tr:nth-child(13) > td:nth-child(2)"
                ).text_content(),
                "年齢": page.locator(
                    "#content_1_0+p+div >div:nth-child(2) table > tbody > tr:nth-child(14) > td:nth-child(2)"
                ).text_content(),
                "誕生日": page.locator(
                    "#content_1_0+p+div >div:nth-child(2) table > tbody > tr:nth-child(15) > td:nth-child(2)"
                ).text_content(),
                "身長": page.locator(
                    "#content_1_0+p+div >div:nth-child(2) table > tbody > tr:nth-child(16) > td:nth-child(2)"
                ).text_content(),
            }
            table = page.locator(
                "#content_1_0+p+div>div:nth-child(2)>div:nth-child(2)"
            ).inner_html()

        # ブラウザを閉じる
        browser.close()

        return profile, table


def get_student_profile(name: str, switch=False) -> pd.DataFrame:
    # URLを指定
    url = f"https://bluearchive.wikiru.jp/?{name}"

    # ページの内容を取得
    response = requests.get(url)
    response.encoding = "utf-8"

    # BeautifulSoupでHTMLを解析
    soup = BeautifulSoup(response.text, "html.parser")
    # プロフィールの取得
    parm = url.split("?")[1]
    param_parsed = urllib.parse.unquote(parm)
    # ホシノ臨戦（切り替え可能な生徒）の場合はplaywrightを使用
    if param_parsed == HOSHINO:
        profile, table = get_student_profile_for_playwright(url, switch)
    else:
        profile = {
            "名前": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(2) > td:nth-child(3)"
            ).text.strip(),
            "学園": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(12) > td"
            ).text.strip(),
            "部活": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(13) > td"
            ).text.strip(),
            "年齢": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(14) > td"
            ).text.strip(),
            "誕生日": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(15) > td"
            ).text.strip(),
            "身長": soup.select_one(
                "#content_1_0+div>table > tbody > tr:nth-child(16) > td"
            ).text.strip(),
        }
        table = soup.select_one("#content_1_0+div+div>table")
    df_profile = pd.DataFrame(data=[profile], columns=profile.keys())

    # ゲーム上のステータス取得
    df_status = pd.read_html(StringIO(str(table)))[0]
    df_status = df_status.head(5)

    # データフレームを整形
    columns = []
    values = []
    for i in range(0, len(df_status), 2):
        columns.extend(list(df_status.iloc[:, i].values))
        values.extend(list(df_status.iloc[:, i + 1].values))

    df_status = pd.DataFrame(data=[values], columns=columns)
    df_status = df_status.fillna(0)
    # 並び替え
    sorted_columns = [
        "HP",
        "攻撃力",
        "治癒力",
        "命中値",
        "会心値",
        "安定値",
        "CC強化力",
        "会心ダメージ",
        "射程距離",
        "CC抵抗力",
        "防御力",
        "回避値",
        "防御貫通値",
        "コスト回復力",
    ]
    df_status = df_status[sorted_columns]
    value_HP = df_status.iloc[0, 0].split("/")
    df_status.iloc[0, 0] = f"{value_HP[0]}/{value_HP[-1]}"

    value_ATK = df_status.iloc[0, 1].split("/")
    df_status.iloc[0, 1] = f"{value_ATK[0]}/{value_ATK[-1]}"

    value_RCV = df_status.iloc[0, 2].split("/")
    df_status.iloc[0, 2] = f"{value_RCV[0]}/{value_RCV[-1]}"

    df = pd.concat([df_profile, df_status], axis=1)

    return df


df_student_list = get_student_list()
df_student_appearance = get_student_appearance()
df = pd.merge(df_student_list, df_student_appearance, on="名前", how="left")
student_list = list(df["名前"].values)
df_student_profile = pd.DataFrame()
switch_student = False
for student in tqdm(student_list):
    try:
        df_student_profile = pd.concat(
            [df_student_profile, get_student_profile(student, switch_student)], axis=0
        )
        if student == HOSHINO:
            switch_student = not switch_student
        time.sleep(1)
    except Exception as e:
        raise f"Error from {student}: {e}"
# インデックスをリセット
df_student_profile.reset_index(drop=True, inplace=True)
df.reset_index(drop=True, inplace=True)
# 重複カラム削除
df_student_profile.drop(columns=["名前", "射程距離"], inplace=True)
df = pd.concat([df, df_student_profile], axis=1)
# CSVファイルとして保存
df.to_csv("public/students.csv", index=False, encoding="utf-8")

# JSONファイルとして保存
df.to_json("public/students.json", orient="records", force_ascii=False, indent=4)