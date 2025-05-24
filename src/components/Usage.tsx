import {
  Paper,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import "./Usage.css";

export function Usage() {
  return (
    <Paper className="usage-container">
      <Typography variant="h4" component="h1" gutterBottom>
        BlueAnalysisの使い方
      </Typography>

      <section>
        <Typography variant="h5" gutterBottom>
          概要
        </Typography>
        <Typography>
          これは、ブルーアーカイブの生徒データを閲覧・分析するためのデータベースです。
        </Typography>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          主な機能
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="データフィルタリング"
              secondary="各項目で条件を設定して生徒を絞り込むことができます。"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="ソート機能"
              secondary="各列のヘッダーをクリックすることで、その項目でソートができます。"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="統計グラフ"
              secondary="生徒データの分布をグラフで確認できます。"
            />
          </ListItem>
        </List>
      </section>
      <section>
        <Typography variant="h5" gutterBottom>
          テーブルについて
        </Typography>
        <Typography>生徒の各情報を表示します。各項目で</Typography>
        <List>
          <ListItem>
            <ListItemText primary="フィルタリング" />
          </ListItem>
          <ListItem>
            <ListItemText primary="ソート" />
          </ListItem>
        </List>
        <Typography>が可能です。</Typography>
        <Accordion>
          <AccordionSummary>
            <Typography>表示項目の一覧はこちら</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText primary="レア度" />
              </ListItem>
              <ListItem>
                <ListItemText primary="名前" />
              </ListItem>
              <ListItem>
                <ListItemText primary="武器種" />
              </ListItem>
              <ListItem>
                <ListItemText primary="遮蔽物" />
              </ListItem>
              <ListItem>
                <ListItemText primary="役割" />
              </ListItem>
              <ListItem>
                <ListItemText primary="ポジション" />
              </ListItem>
              <ListItem>
                <ListItemText primary="クラス" />
              </ListItem>
              <ListItem>
                <ListItemText primary="学校" />
              </ListItem>
              <ListItem>
                <ListItemText primary="攻撃属性" />
              </ListItem>
              <ListItem>
                <ListItemText primary="防御属性" />
              </ListItem>
              <ListItem>
                <ListItemText primary="市街" />
              </ListItem>
              <ListItem>
                <ListItemText primary="屋外" />
              </ListItem>
              <ListItem>
                <ListItemText primary="屋内" />
              </ListItem>
              <ListItem>
                <ListItemText primary="射程距離" />
              </ListItem>
              <ListItem>
                <ListItemText primary="装備1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="装備2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="装備3" />
              </ListItem>
              <ListItem>
                <ListItemText primary="実装日" />
              </ListItem>
              <ListItem>
                <ListItemText primary="学年" />
              </ListItem>
              <ListItem>
                <ListItemText primary="部活" />
              </ListItem>
              <ListItem>
                <ListItemText primary="年齢" />
              </ListItem>
              <ListItem>
                <ListItemText primary="誕生日" />
              </ListItem>
              <ListItem>
                <ListItemText primary="身長" />
              </ListItem>
              <ListItem>
                <ListItemText primary="HP" />
              </ListItem>
              <ListItem>
                <ListItemText primary="攻撃力" />
              </ListItem>
              <ListItem>
                <ListItemText primary="治癒力" />
              </ListItem>
              <ListItem>
                <ListItemText primary="命中値" />
              </ListItem>
              <ListItem>
                <ListItemText primary="会心値" />
              </ListItem>
              <ListItem>
                <ListItemText primary="安定値" />
              </ListItem>
              <ListItem>
                <ListItemText primary="CC強化力" />
              </ListItem>
              <ListItem>
                <ListItemText primary="会心ダメージ" />
              </ListItem>
              <ListItem>
                <ListItemText primary="CC抵抗力" />
              </ListItem>
              <ListItem>
                <ListItemText primary="防御力" />
              </ListItem>
              <ListItem>
                <ListItemText primary="回避値" />
              </ListItem>
              <ListItem>
                <ListItemText primary="防御貫通値" />
              </ListItem>
              <ListItem>
                <ListItemText primary="コスト回復力" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          グラフについて
        </Typography>
        <Typography>各項目ごとのデータ分布をグラフで表示します。</Typography>
        <List>
          <ListItem>
            <ListItemText primary="グラフはテーブルと連動していて、テーブルでフィルタリングを行うとグラフにも反映されます。" />
          </ListItem>
          <ListItem>
            <ListItemText primary="名前やHPなど生徒ごとに唯一の値になっている項目はグラフに表示されません。" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="また、学校, 学年, 武器種, 部活, 年齢, 誕生日,
          身長については通常衣装と別衣装は同じ生徒としてカウントしています。"
            />
          </ListItem>
        </List>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          データについて
        </Typography>
        <Typography>
          データは手動で更新しているので実装から反映までラグがあります。
          <br />
          最新の更新日: 2025/05/25 ナグサ、ニヤまで
        </Typography>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          Githubリポジトリ
        </Typography>
        <List>
          <ListItem>
            <Link
              href="https://github.com/yamu77/BlueAnalysis"
              target="_blank"
              rel="noopener noreferrer"
            >
              リポジトリ
            </Link>
            はこちらです。
          </ListItem>
        </List>
      </section>
      <section>
        <Typography variant="h5" gutterBottom>
          出典・お借りしたもの
        </Typography>
        <List>
          <ListItem>
            <Link
              href="https://bluearchive.wikiru.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ブルーアーカイブ（ブルアカ）攻略有志Wiki
            </Link>
            ：生徒データを参照させてもらいました。
          </ListItem>
          <ListItem>
            <Link
              href="https://tmp.nulla.top/ba-logo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BlueArchive-Style Logo Generator
            </Link>
            ：ロゴに使用させていただきました。
          </ListItem>
        </List>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          免責事項
        </Typography>
        <Typography>
          本ツールは非公式です。Nexon、Nexon
          GamesおよびYostarとは一切関係ありません。
          <br />
          ゲーム内のデータと実際の値が異なる可能性があります。
        </Typography>
      </section>
    </Paper>
  );
}
