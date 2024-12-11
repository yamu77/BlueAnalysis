import {
  Paper,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Usage.css";

export function Usage() {
  return (
    <Paper className="usage-container">
      <Typography variant="h4" component="h1" gutterBottom>
        ブルーアーカイブ生徒データベースの使い方
      </Typography>

      <section>
        <Typography variant="h5" gutterBottom>
          概要
        </Typography>
        <Typography>
          このツールは、ブルーアーカイブの生徒データを閲覧・分析するためのデータベースです。
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
              secondary="生徒データの分布をグラフで確認できます。グラフはテーブルと連動しており、テーブルのフィルタリングを行うとグラフの表示も更新されます。"
            />
          </ListItem>
        </List>
      </section>
      <section>
        <Typography variant="h5" gutterBottom>
          テーブルについて
        </Typography>
        <Typography>
        </Typography>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          グラフについて
        </Typography>
        <Typography>
        </Typography>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          データについて
        </Typography>
        <Typography>
          データは手動で更新しているので実装から反映までラグがあります。
          <br />
          最新の更新日: 2024/03/XX
        </Typography>
      </section>

      <section>
        <Typography variant="h5" gutterBottom>
          Githubリポジトリ
        </Typography>
        <List>
          <ListItem>
            <Link
              href="https://github.com/yourusername/your-repo-name"
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
        <Typography>
          <Link
            href="https://bluearchive.wikiru.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ブルーアーカイブ（ブルアカ）攻略有志Wiki
          </Link>
          ：正とデータを参照させてもらいました。
          <Link
            href="https://tmp.nulla.top/ba-logo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            BlueArchive-Style Logo Generator
          </Link>
          ：ロゴに使用させていただきました。
        </Typography>
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
