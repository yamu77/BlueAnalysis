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

interface Props {
  students: Student[];
}

type DataCount = {
  name: string;
  count: number;
};

export function StudentStatsChart({ students }: Props) {
  const [selectedColumn, setSelectedColumn] = useState<keyof Student>("レア");

  // 名前以外の全てのカラムを取得
  const columns = Object.keys(students[0]).filter(
    (key) => key !== "名前"
  ) as (keyof Student)[];

  const getChartData = (column: keyof Student): DataCount[] => {
    const counts: { [key: string]: number } = {};
    students.forEach((student) => {
      const value = String(student[column]);
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const data = getChartData(selectedColumn);

  // カラーパレットの生成
  const colors = [
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
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        生徒データ分布
      </Typography>
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <Select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value as keyof Student)}
          size="small"
        >
          {columns.map((column) => (
            <MenuItem key={column} value={column}>
              {column}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={0}
              angle={45}
              textAnchor="start"
              height={100}
            />
            <YAxis />
            <Tooltip />
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
