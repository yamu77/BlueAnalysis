import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FormControl,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import type { Student } from "../types/Student";
import { useTheme } from "@mui/material/styles";

interface Props {
  students: Student[];
}

type DataCount = {
  name: string;
  count: number;
};

interface ChartOptions {
  implementationDateUnit?: "年" | "年月";
}

// 重複カウントしない項目を定義
const UNIQUE_COUNT_FIELDS = [
  "学校",
  "学年",
  "武器種",
  "部活",
  "年齢",
  "誕生日",
  "身長",
] as const;
type UniqueCountField = (typeof UNIQUE_COUNT_FIELDS)[number];

// 集計から除外する項目を定義
const EXCLUDED_FIELDS = [
  "名前",
  "HP",
  "会心ダメージ",
  "防御力",
  "攻撃力",
  "治癒力",
  "CC強化力",
  "CC抵抗力",
  "コスト回復力",
  "会心値",
  "回避値",
  "命中値",
  "安定値",
  "防御貫通値",
] as const;

// 生徒の重複を除外する
const getUniqueStudents = (students: Student[]): Student[] => {
  const uniqueMap = new Map<string, Student>();

  students.forEach((student) => {
    // 名前から（.*）を除去して基本名を取得
    const baseName = student.名前.replace(/（.*）$/, "");

    // まだ登録されていない基本名の場合のみ追加
    if (
      !Array.from(uniqueMap.values()).some(
        (s) => s.名前.replace(/（.*）$/, "") === baseName
      )
    ) {
      uniqueMap.set(baseName, student);
    }
  });

  return Array.from(uniqueMap.values());
};

export function StudentStatsChart({ students }: Props) {
  const theme = useTheme();
  const [selectedColumn, setSelectedColumn] = useState<keyof Student>("レア");
  const [chartOptions, setChartOptions] = useState<ChartOptions>({
    implementationDateUnit: "年",
  });

  // データが空の場合の処理を追加
  if (!students || students.length === 0) {
    return (
      <Paper
        sx={{
          p: 2,
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          該当するデータがありません
        </Typography>
      </Paper>
    );
  }

  // 名前以外の全てのカラムを取得し、除外項目をフィルタリング
  const columns = Object.keys(students[0])
    .filter((key) => !EXCLUDED_FIELDS.includes(key as any))
    .sort() as (keyof Student)[];

  const getChartData = (column: keyof Student): DataCount[] => {
    const counts: { [key: string]: number } = {};

    // 重複を除外すべきフィールドの場合は、getUniqueStudentsを使用
    const targetStudents = UNIQUE_COUNT_FIELDS.includes(
      column as UniqueCountField
    )
      ? getUniqueStudents(students)
      : students;

    if (column === "身長") {
      // 身長の場合、5cm刻みでグループ化
      targetStudents.forEach((student) => {
        const height = parseInt(student[column]);
        if (!isNaN(height)) {
          // 5cm刻みの下限値を計算（例：163cmなら160）
          const lowerBound = Math.floor(height / 5) * 5;
          const key = `${lowerBound}-${lowerBound + 4}cm`;
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      // 身長順にソート
      return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
          const heightA = parseInt(a.name);
          const heightB = parseInt(b.name);
          return heightA - heightB;
        });
    } else if (column === "誕生日") {
      // 月ごとの初期化（1月から12月）
      for (let i = 1; i <= 12; i++) {
        counts[`${i}月`] = 0;
      }

      targetStudents.forEach((student) => {
        const birthDate = student[column];
        if (birthDate) {
          const month = parseInt(birthDate.split("/")[0]);
          counts[`${month}月`]++;
        }
      });

      // 月順にソートして返す
      return Array.from({ length: 12 }, (_, i) => ({
        name: `${i + 1}月`,
        count: counts[`${i + 1}月`],
      }));
    } else if (column === "実装日") {
      targetStudents.forEach((student) => {
        const date = student[column];
        if (date) {
          const [year, month] = date.split("/");
          const key =
            chartOptions.implementationDateUnit === "年"
              ? `${year}年`
              : `${year}年${month}月`;
          counts[key] = (counts[key] || 0) + 1;
        }
      });

      return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((entry1, entry2) => {
          // 数値に変換してから比較
          const value1 = entry1.name.replace(/[年月]/g, "");
          const value2 = entry2.name.replace(/[年月]/g, "");
          return parseInt(value1) - parseInt(value2);
        });
    }

    // 誕生日以外のカラムは従来通りの処理
    targetStudents.forEach((student) => {
      const value = String(student[column]);
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const data = getChartData(selectedColumn);

  // カラーパレットの生成（ダークモード対応）
  const colors =
    theme.palette.mode === "dark"
      ? [
          "#bb86fc", // メインパープル（ダークモード）
          "#03dac6", // セカンダリティール
          "#cf6679", // エラーピンク
          "#b388ff",
          "#8c9eff",
          "#82b1ff",
          "#80d8ff",
          "#84ffff",
          "#a7ffeb",
          "#b9f6ca",
        ]
      : [
          "#8884d8",
          "#82ca9d",
          "#ffc658",
          "#ff7300",
          "#a4de6c",
          "#d0ed57",
          "#83a6ed",
          "#8dd1e1",
          "#a4de6c",
          "#d0ed57",
        ];

  return (
    <Paper
      sx={{
        p: 2,
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        width: {
          xs: selectedColumn === "部活" ? "800px" : "auto",
          sm: "auto",
        },
        minWidth: {
          xs: "0",
          sm: selectedColumn === "部活" ? "800px" : "0",
        },
        bgcolor: "background.paper", // テーマに応じた背景色
      }}
    >
      <Typography variant="h6" gutterBottom>
        生徒データ分布
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <FormControl sx={{ minWidth: 140, marginLeft: "10px" }}>
          <Select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value as keyof Student)}
            size="small"
          >
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                {String(column)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 実装日が選択されている場合のみ表示 */}
        {selectedColumn === "実装日" && (
          <FormControl size="small">
            <Select
              value={chartOptions.implementationDateUnit}
              onChange={(e) =>
                setChartOptions((prev) => ({
                  ...prev,
                  implementationDateUnit: e.target.value as "年" | "年月",
                }))
              }
            >
              <MenuItem value="年">年単位</MenuItem>
              <MenuItem value="年月">年月単位</MenuItem>
            </Select>
          </FormControl>
        )}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }
            />
            <XAxis
              dataKey="name"
              interval={0}
              textAnchor="left"
              height={120}
              angle={90}
              tick={{ fill: theme.palette.text.primary }} // テーマに応じたテキスト色
            />
            <YAxis tick={{ fill: theme.palette.text.primary }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              }}
            />
            <Bar dataKey="count">
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
}
