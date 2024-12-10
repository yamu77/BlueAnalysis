import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface Student {
  レア: string;
  名前: string;
  武器種: string;
  遮蔽物: string;
  役割: string;
  ポジション: string;
  クラス: string;
  学校: string;
  攻撃: string;
  防御: string;
  市街: string;
  屋外: string;
  屋内: string;
  射程距離: number;
  装備1: string;
  装備2: string;
  装備3: string;
  実装日: string;
  学年: string;
  部活: string;
  年齢: string;
  誕生日: string;
  身長: string;
  HP: string;
  攻撃力: string;
  治癒力: string;
  命中値: string;
  会心値: string;
  安定値: string;
  CC強化力: string;
  会心ダメージ: string;
  CC抵抗力: string;
  防御力: string;
  回避値: string;
  防御貫通値: string | number;
  コスト回復力: string;
}

export function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    レア: true,
    名前: true,
    武器種: true,
    遮蔽物: false,
    役割: true,
    ポジション: false,
    クラス: true,
    学校: true,
    攻撃: false,
    防御: false,
    市街: false,
    屋外: false,
    屋内: false,
    射程距離: false,
    装備1: false,
    装備2: false,
    装備3: false,
    実装日: true,
    学年: true,
    部活: false,
    年齢: false,
    誕生日: false,
    身長: false,
    HP: false,
    攻撃力: false,
    治癒力: false,
    命中値: false,
    会心値: false,
    安定値: false,
    CC強化力: false,
    会心ダメージ: false,
    CC抵抗力: false,
    防御力: false,
    回避値: false,
    防御貫通値: false,
    コスト回復力: false,
  });

  const columnHelper = createColumnHelper<Student>();

  // カラムごとのユニークな値を取得する関数
  const getUniqueValues = (data: Student[], key: keyof Student) => {
    const values = new Set(data.map((item) => String(item[key])));
    return Array.from(values).sort();
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("レア", {
        header: "レア度",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("名前", {
        header: "名前",
        size: 200,
      }),
      columnHelper.accessor("武器種", {
        header: "武器種",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("遮蔽物", {
        header: "遮蔽物",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("役割", {
        header: "役割",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("ポジション", {
        header: "ポジション",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("クラス", {
        header: "クラス",
        size: 120,
        filterFn: "equals",
      }),
      columnHelper.accessor("学校", {
        header: "学校",
        size: 150,
        filterFn: "equals",
      }),
      columnHelper.accessor("攻撃", {
        header: "攻撃",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("防御", {
        header: "防御",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("市街", {
        header: "市街",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("屋外", {
        header: "屋外",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("屋内", {
        header: "屋内",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("射程距離", {
        header: "射程距離",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("装備1", {
        header: "装備1",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("装備2", {
        header: "装備2",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("装備3", {
        header: "装備3",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("実装日", {
        header: "実装日",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("学年", {
        header: "学年",
        size: 200,
        filterFn: "equals",
      }),
      columnHelper.accessor("部活", {
        header: "部活",
        size: 150,
        filterFn: "equals",
      }),
      columnHelper.accessor("年齢", {
        header: "年齢",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("誕生日", {
        header: "誕生日",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("身長", {
        header: "身長",
        size: 80,
        filterFn: "equals",
      }),
      columnHelper.accessor("HP", {
        header: "HP",
        size: 150,
        filterFn: "equals",
      }),
      columnHelper.accessor("攻撃力", {
        header: "攻撃力",
        size: 150,
        filterFn: "equals",
      }),
      columnHelper.accessor("治癒力", {
        header: "治癒力",
        size: 150,
        filterFn: "equals",
      }),
      columnHelper.accessor("命中値", {
        header: "命中値",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("会心値", {
        header: "会心値",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("安定値", {
        header: "安定値",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("CC強化力", {
        header: "CC強化力",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("会心ダメージ", {
        header: "会心ダメージ",
        size: 120,
        filterFn: "equals",
      }),
      columnHelper.accessor("CC抵抗力", {
        header: "CC抵抗力",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("防御力", {
        header: "防御力",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("回避値", {
        header: "回避値",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("防御貫通値", {
        header: "防御貫通値",
        size: 100,
        filterFn: "equals",
      }),
      columnHelper.accessor("コスト回復力", {
        header: "コスト回復力",
        size: 120,
        filterFn: "equals",
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: students,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // データ加工用の関数
  const processStudentData = (data: Student[]): Student[] => {
    data.forEach((student) => {
      const matches = student["学年"].match(/\d+/);
      if (matches) {
        student["学年"] = `${matches[0]}年`;
      } else {
        const old = student["年齢"].replace("歳", "");
        if (Number(old) >= 18) {
          student["学年"] = "3年(推定)";
        } else if (Number(old) >= 17) {
          student["学年"] = "2年(推定)";
        } else if (Number(old) <= 16) {
          student["学年"] = "1年(推定)";
        }
      }
    });
    return data;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getVisibleColumns = () => {
    if (isMobile) {
      // モバイルで表示するカラム
      setColumnVisibility({
        レア: true,
        名前: true,
        武器種: true,
        役割: true,
        クラス: false,
        学校: false,
        実装日: false,
        学年: false,
        // その他のカラムはfalse
      });
    } else if (isTablet) {
      // タブレットで表示するカラム
      setColumnVisibility({
        レア: true,
        名前: true,
        武器種: true,
        役割: true,
        クラス: true,
        学校: true,
        実装日: false,
        学年: true,
        // その他のカラムはfalse
      });
    }
  };

  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = processStudentData(data);
        setStudents(processedData);
        setLoading(false);
      })
      .catch((_err) => {
        setError("データの読み込みに失敗しました");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getVisibleColumns();
  }, [isMobile, isTablet]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="student-table">
      <div
        className="table-container"
        style={{
          overflowX: "auto",
          maxHeight: "calc(100vh - 300px)",
          overflowY: "auto",
          maxWidth: "100vw",
          margin: "0 auto",
        }}
      >
        <table
          style={{
            minWidth: isMobile ? "100%" : "800px",
            maxWidth: "100%",
            position: "relative",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#f5f5f5",
                      zIndex: 2,
                    }}
                  >
                    <div
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: "pointer",
                        userSelect: "none", // テキスト選択を防止
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span style={{ fontSize: "0.8rem" }}>
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? ""}
                      </span>
                    </div>
                    {header.column.getCanFilter() && (
                      <div>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{ marginTop: "0.5rem" }}
                        >
                          <Select
                            value={
                              (header.column.getFilterValue() as string) ?? ""
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            displayEmpty
                            sx={{ fontSize: "0.8rem" }}
                          >
                            <MenuItem value="">すべて</MenuItem>
                            {getUniqueValues(
                              students,
                              header.column.id as keyof Student
                            ).map((value) => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} data-rarity={row.original.レア}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paper
        className="column-visibility-control"
        elevation={0}
        sx={{
          padding: isMobile ? "1rem" : "2rem",
          margin: "1rem 0",
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 2,
            fontSize: isMobile ? "1rem" : "1.25rem",
          }}
        >
          表示カラムの設定
        </Typography>
        <FormGroup
          row={!isMobile}
          sx={{
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {table.getAllLeafColumns().map((column) => {
            return (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />
                }
                label={column.columnDef.header as string}
              />
            );
          })}
        </FormGroup>
      </Paper>
    </div>
  );
}
