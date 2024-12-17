# BlueAnalysis

ブルーアーカイブの生徒情報を統計的に見るためのツールです。

## 環境

- Node.js v20.14.0
- Python 3.12.0

ライブラリについては[package.json](./package.json)と[requirements.txt](./requirements.txt)を参照してください。

## 開発

フロント側で都度スクレイピングをすると表示に時間がかかってしまうので、事前にスクレイピングでデータをjsonで保存しておきそれをフロント側で使用する。

### フロントエンド

以下のコマンドでローカルサーバーが立ち上がるのでここで表示確認をしながら開発する

```bash
npm run dev
```

### バックエンド

jsonデータ作成の処理用。  
以下のコマンドでjsonデータの作成を行う。  
データの確認用にcsvファイルでも作成しておく。

```bash
python src/scraping.py
```

## ファイル

- [src/scraping.py](./src/scraping.py)
  - スクレイピング処理
- [src/components/StudentStatsChart.tsx](./src/components/StudentStatsChart.tsx)
  - 生徒データの統計グラフのコンポーネント
- [src/components/StudentTable.tsx](./src/components/StudentTable.tsx)
  - 生徒データのテーブル & BlueAnalysisの本体部分
- [src/components/Usage.tsx](./src/components/Usage.tsx)
  - 使い方ページ
- [src/types/Student.ts](./src/types/Student.ts)
  - 生徒データの型
- [src/App.tsx](./src/App.tsx)
  - ページ切り替えなど
