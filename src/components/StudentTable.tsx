import { useEffect, useState, useMemo, useCallback } from "react";
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
import { useSearchParams } from "react-router-dom";
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
  IconButton,
  Popover,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { StudentStatsChart } from "./StudentStatsChart";
import "./StudentTable.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Student } from "../types/Student";

interface DateRange {
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
}

const multiSelectFilterFn = (
  row: { getValue: (columnId: string) => unknown },
  columnId: string,
  filterValue: string[]
) => {
  if (!filterValue || filterValue.length === 0) return true;
  const value = row.getValue(columnId);
  return filterValue.includes(String(value));
};

const visibilityInit = {
  レア: false,
  名前: true,
  武器種: true,
  遮蔽物: false,
  役割: false,
  ポジション: false,
  クラス: true,
  学校: true,
  攻撃属性: true,
  防御属性: false,
  市街: false,
  屋外: false,
  屋内: false,
  射程距離: false,
  装備1: false,
  装備2: false,
  装備3: false,
  実装日: true,
  学年: false,
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
};

export function StudentTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(visibilityInit);

  // URLパラメータから表示カラムの設定を取得
  const getInitialColumnVisibility = useCallback((): VisibilityState => {
    const viewColumnsParam = searchParams.get("view_columns");
    if (viewColumnsParam) {
      const visibleColumns = viewColumnsParam.split(",");
      const newVisibility: VisibilityState = { ...visibilityInit };

      // 指定されたカラムのみ表示
      Object.keys(visibilityInit).forEach((key) => {
        newVisibility[key as keyof VisibilityState] =
          visibleColumns.includes(key);
      });

      return newVisibility;
    }
    return visibilityInit;
  }, [searchParams]);

  // URLパラメータを更新する関数
  const updateUrlParams = useCallback(
    (visibility: VisibilityState, filters?: ColumnFiltersState) => {
      const visibleColumns = Object.entries(visibility)
        .filter(([, isVisible]) => isVisible)
        .map(([column]) => column);

      const newSearchParams = new URLSearchParams(searchParams);

      // 表示カラムの設定
      if (visibleColumns.length > 0) {
        newSearchParams.set("view_columns", visibleColumns.join(","));
      } else {
        newSearchParams.delete("view_columns");
      }

      // フィルターの設定
      if (filters && filters.length > 0) {
        const filterObj: { [key: string]: unknown } = {};
        filters.forEach((filter) => {
          if (
            filter.value !== undefined &&
            filter.value !== null &&
            filter.value !== ""
          ) {
            filterObj[filter.id] = filter.value;
          }
        });
        if (Object.keys(filterObj).length > 0) {
          newSearchParams.set("filters", JSON.stringify(filterObj));
        } else {
          newSearchParams.delete("filters");
        }
      } else {
        newSearchParams.delete("filters");
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  // URLパラメータからフィルターの設定を取得
  const getInitialFilters = useCallback((): ColumnFiltersState => {
    const filtersParam = searchParams.get("filters");
    if (filtersParam) {
      try {
        const filterObj = JSON.parse(filtersParam);
        return Object.entries(filterObj).map(([id, value]) => ({
          id,
          value,
        }));
      } catch (error) {
        console.error("フィルターパラメータの解析エラー:", error);
        return [];
      }
    }
    return [];
  }, [searchParams]);

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
        filterFn: multiSelectFilterFn,
        enableSorting: true,
      }),
      columnHelper.accessor("名前", {
        header: "名前",
        enableSorting: true,
      }),
      columnHelper.accessor("武器種", {
        header: "武器種",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("遮蔽物", {
        header: "遮蔽物",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("役割", {
        header: "役割",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("ポジション", {
        header: "ポジション",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("クラス", {
        header: "クラス",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("学校", {
        header: "学校",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("攻撃属性", {
        header: "攻撃属性",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("防御属性", {
        header: "防御属性",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("市街", {
        header: "市街",

        filterFn: multiSelectFilterFn,
        cell: (info) => (
          <img
            src={`/icons/face_${info.getValue().charAt(0)}.png`}
            alt={info.getValue()}
            title={info.getValue()}
            style={{ width: "24px", height: "24px" }}
          />
        ),
      }),
      columnHelper.accessor("屋外", {
        header: "屋外",

        filterFn: multiSelectFilterFn,
        cell: (info) => (
          <img
            src={`/icons/face_${info.getValue().charAt(0)}.png`}
            alt={info.getValue()}
            title={info.getValue()}
            style={{ width: "24px", height: "24px" }}
          />
        ),
      }),
      columnHelper.accessor("屋内", {
        header: "屋内",

        filterFn: multiSelectFilterFn,
        cell: (info) => (
          <img
            src={`/icons/face_${info.getValue().charAt(0)}.png`}
            alt={info.getValue()}
            title={info.getValue()}
            style={{ width: "24px", height: "24px" }}
          />
        ),
      }),
      columnHelper.accessor("射程距離", {
        header: "射程距離",
        filterFn: (row, _columnId, filterValue: string) => {
          if (!filterValue) return true;
          const range = row.getValue("射程距離") as string;
          if (!range) return false;
          return filterValue == range;
        },
      }),
      columnHelper.accessor("装備1", {
        header: "装備1",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("装備2", {
        header: "装備2",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("装備3", {
        header: "装備3",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("実装日", {
        header: "実装日",

        filterFn: (row, _columnId, filterValue: DateRange) => {
          if (
            !filterValue?.startYear &&
            !filterValue?.startMonth &&
            !filterValue?.endYear &&
            !filterValue?.endMonth
          )
            return true;

          const date = row.getValue("実装日") as string;
          if (!date) return false;

          const [year, month] = date.split("/");
          const rowDate = `${year}${month}`;

          const start =
            filterValue.startYear && filterValue.startMonth
              ? `${filterValue.startYear}${filterValue.startMonth}`
              : "000000";
          const end =
            filterValue.endYear && filterValue.endMonth
              ? `${filterValue.endYear}${filterValue.endMonth}`
              : "999999";

          return rowDate >= start && rowDate <= end;
        },
      }),
      columnHelper.accessor("学年", {
        header: "学年",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("部活", {
        header: "部活",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("年齢", {
        header: "年齢",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("誕生日", {
        header: "誕生日",

        filterFn: (row, _columnId, filterValue: string) => {
          if (!filterValue) return true;
          const date = row.getValue("誕生日") as string;
          if (!date) return false;

          const [month] = date.split("/");
          return month === filterValue;
        },
      }),
      columnHelper.accessor("身長", {
        header: "身長",

        filterFn: (row, _columnId, filterValue) => {
          if (!filterValue) return true;
          if (filterValue === "unknown") {
            const height = parseInt(row.getValue("身長"));
            return isNaN(height);
          }
          const height = parseInt(row.getValue("身長"));
          const filterHeight = parseInt(filterValue as string);
          if (isNaN(height)) return false;

          // 5cm刻みの範囲内かチェック
          const lowerBound = filterHeight;
          const upperBound = filterHeight + 4;
          return height >= lowerBound && height <= upperBound;
        },
      }),
      columnHelper.accessor("HP", {
        header: "HP",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("攻撃力", {
        header: "攻撃力",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("治癒力", {
        header: "治癒力",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("命中値", {
        header: "命中値",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("会心値", {
        header: "会心値",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("安定値", {
        header: "安定値",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("CC強化力", {
        header: "CC強化力",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("会心ダメージ", {
        header: "会心ダメージ",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("CC抵抗力", {
        header: "CC抵抗力",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("防御力", {
        header: "防御力",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("回避値", {
        header: "回避値",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("防御貫通値", {
        header: "防御貫通値",

        filterFn: multiSelectFilterFn,
      }),
      columnHelper.accessor("コスト回復力", {
        header: "コスト回復力",

        filterFn: multiSelectFilterFn,
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
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      updateUrlParams(columnVisibility, newFilters);
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility =
        typeof updater === "function" ? updater(columnVisibility) : updater;
      setColumnVisibility(newVisibility);
      updateUrlParams(newVisibility, columnFilters);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // データ加工用の関数
  const processStudentData = (data: Student[]): Student[] => {
    return data;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getVisibleColumns = useCallback(() => {
    if (isMobile) {
      setColumnVisibility(visibilityInit);
    } else if (isTablet) {
      setColumnVisibility(visibilityInit);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    getVisibleColumns();
  }, [getVisibleColumns]);

  // URLパラメータから表示カラムの設定を初期化
  useEffect(() => {
    const initialVisibility = getInitialColumnVisibility();
    setColumnVisibility(initialVisibility);
  }, [getInitialColumnVisibility]);

  // URLパラメータからフィルターの設定を初期化
  useEffect(() => {
    const initialFilters = getInitialFilters();
    setColumnFilters(initialFilters);
  }, [getInitialFilters]);

  useEffect(() => {
    fetch("/students.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = processStudentData(data);
        setStudents(processedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("データ読み込みエラー:", err);
        setError("データの読み込みに失敗しました");
        setLoading(false);
      });
  }, []);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearAllFilters = () => {
    table.resetColumnFilters();
    updateUrlParams(columnVisibility, []);
  };

  const [openFilters, setOpenFilters] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleFilterClick = (columnId: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>読み込み中...</div>;

  // StudentTableコンポーネント内で、tableのフィルタリング後のデータを取得
  const filteredData = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  return (
    <div className="student-table">
      <div className="student-table__left-column">
        <div className="menu-button-container">
          <Tooltip title="フィルターリセット">
            <IconButton
              onClick={clearAllFilters}
              size="small"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "white",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.12)"
                      : "#f5f5f5",
                },
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              <ClearAllIcon />
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                }}
              >
                フィルターリセット
              </Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title="表示の設定">
            <IconButton
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "white",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.12)"
                      : "#f5f5f5",
                },
                boxShadow: open ? "none" : "0 0 5px rgba(0,0,0,0.2)",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              <MenuIcon />
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                }}
              >
                表示の設定
              </Typography>
            </IconButton>
          </Tooltip>
        </div>

        <div className="table-container">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      <div
                        className="sort-header"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: "pointer" }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="sort-indicator">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? ""}
                        </span>
                      </div>
                      {header.column.getCanFilter() && (
                        <div className="filter-container">
                          {header.column.id === "実装日" ? (
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{ marginTop: "0.5rem" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                }}
                              >
                                <div className="filter-row">
                                  <FormControl sx={{ flex: 1 }}>
                                    <Select
                                      value={
                                        (
                                          header.column.getFilterValue() as DateRange
                                        )?.startYear ?? ""
                                      }
                                      onChange={(e) =>
                                        header.column.setFilterValue(
                                          (old: DateRange) => ({
                                            ...old,
                                            startYear: e.target.value,
                                          })
                                        )
                                      }
                                      displayEmpty
                                      sx={{ fontSize: "0.8rem" }}
                                    >
                                      <MenuItem value="">開始年</MenuItem>
                                      {Array.from(
                                        new Set(
                                          students.map(
                                            (student) =>
                                              student.実装日.split("/")[0]
                                          )
                                        )
                                      )
                                        .sort()
                                        .map((year) => (
                                          <MenuItem key={year} value={year}>
                                            {year}年
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl sx={{ flex: 1 }}>
                                    <Select
                                      value={
                                        (
                                          header.column.getFilterValue() as DateRange
                                        )?.startMonth ?? ""
                                      }
                                      onChange={(e) =>
                                        header.column.setFilterValue(
                                          (old: DateRange) => ({
                                            ...old,
                                            startMonth: e.target.value,
                                          })
                                        )
                                      }
                                      displayEmpty
                                      sx={{ fontSize: "0.8rem" }}
                                    >
                                      <MenuItem value="">開始月</MenuItem>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = String(i + 1).padStart(
                                          2,
                                          "0"
                                        );
                                        return (
                                          <MenuItem key={month} value={month}>
                                            {month}月
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="filter-row">
                                  <FormControl sx={{ flex: 1 }}>
                                    <Select
                                      value={
                                        (
                                          header.column.getFilterValue() as DateRange
                                        )?.endYear ?? ""
                                      }
                                      onChange={(e) =>
                                        header.column.setFilterValue(
                                          (old: DateRange) => ({
                                            ...old,
                                            endYear: e.target.value,
                                          })
                                        )
                                      }
                                      displayEmpty
                                      sx={{ fontSize: "0.8rem" }}
                                    >
                                      <MenuItem value="">終了年</MenuItem>
                                      {Array.from(
                                        new Set(
                                          students.map(
                                            (student) =>
                                              student.実装日.split("/")[0]
                                          )
                                        )
                                      )
                                        .sort()
                                        .map((year) => (
                                          <MenuItem key={year} value={year}>
                                            {year}年
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl sx={{ flex: 1 }}>
                                    <Select
                                      value={
                                        (
                                          header.column.getFilterValue() as DateRange
                                        )?.endMonth ?? ""
                                      }
                                      onChange={(e) =>
                                        header.column.setFilterValue(
                                          (old: DateRange) => ({
                                            ...old,
                                            endMonth: e.target.value,
                                          })
                                        )
                                      }
                                      displayEmpty
                                      sx={{ fontSize: "0.8rem" }}
                                    >
                                      <MenuItem value="">終了月</MenuItem>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = String(i + 1).padStart(
                                          2,
                                          "0"
                                        );
                                        return (
                                          <MenuItem key={month} value={month}>
                                            {month}月
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </FormControl>
                          ) : header.column.id === "誕生日" ? (
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{ marginTop: "0.5rem" }}
                            >
                              <Select
                                value={
                                  (header.column.getFilterValue() as string) ??
                                  ""
                                }
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                                displayEmpty
                                sx={{ fontSize: "0.8rem" }}
                              >
                                <MenuItem value="">すべての月</MenuItem>
                                {Array.from({ length: 12 }, (_, i) => {
                                  const month = String(i + 1).padStart(2, "0");
                                  return (
                                    <MenuItem key={month} value={month}>
                                      {month}月
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          ) : header.column.id === "身長" ? (
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{ marginTop: "0.5rem" }}
                            >
                              <Select
                                value={header.column.getFilterValue() ?? ""}
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                                displayEmpty
                                sx={{ fontSize: "0.8rem" }}
                              >
                                <MenuItem value="">すべて</MenuItem>
                                {(() => {
                                  const heights = students
                                    .map((s) => parseInt(s.身長))
                                    .filter((h) => !isNaN(h));

                                  const minHeight =
                                    Math.floor(Math.min(...heights) / 5) * 5;
                                  const maxHeight =
                                    Math.ceil(Math.max(...heights) / 5) * 5;

                                  const options = [];
                                  // 不明カテゴリ���追加
                                  options.push(
                                    <MenuItem key="unknown" value="unknown">
                                      不明
                                    </MenuItem>
                                  );
                                  // 身長範囲のオプションを追加
                                  for (
                                    let h = minHeight;
                                    h <= maxHeight;
                                    h += 5
                                  ) {
                                    options.push(
                                      <MenuItem key={h} value={h}>
                                        {`${h}-${h + 4}cm`}
                                      </MenuItem>
                                    );
                                  }
                                  return options;
                                })()}
                              </Select>
                            </FormControl>
                          ) : (
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{ marginTop: "0.5rem" }}
                            >
                              <div
                                id={`filter-${header.column.id}`}
                                onClick={() =>
                                  handleFilterClick(header.column.id)
                                }
                                className="filter-button"
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: "0.8rem" }}
                                >
                                  {(
                                    (header.column.getFilterValue() as string[]) ||
                                    []
                                  ).length > 0
                                    ? `${
                                        (
                                          (header.column.getFilterValue() as string[]) ||
                                          []
                                        ).length
                                      }件選択中`
                                    : "フィルター"}
                                </Typography>
                                <KeyboardArrowDownIcon
                                  sx={{
                                    transform: openFilters[header.column.id]
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                    transition: "transform 0.2s",
                                  }}
                                />
                              </div>
                              <Popover
                                open={openFilters[header.column.id] || false}
                                onClose={() =>
                                  handleFilterClick(header.column.id)
                                }
                                anchorEl={document.getElementById(
                                  `filter-${header.column.id}`
                                )}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                sx={{
                                  "& .MuiPopover-paper": {
                                    marginTop: "4px",
                                  },
                                }}
                              >
                                <List
                                  dense
                                  sx={{
                                    width: "200px",
                                    maxHeight: "300px",
                                    overflow: "auto",
                                  }}
                                >
                                  {getUniqueValues(
                                    students,
                                    header.column.id as keyof Student
                                  ).map((value) => (
                                    <ListItem
                                      key={value}
                                      dense
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const currentFilters =
                                          (header.column.getFilterValue() as string[]) ||
                                          [];
                                        const newFilters =
                                          currentFilters.includes(value)
                                            ? currentFilters.filter(
                                                (v) => v !== value
                                              )
                                            : [...currentFilters, value];
                                        header.column.setFilterValue(
                                          newFilters
                                        );
                                      }}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      <ListItemIcon>
                                        <Checkbox
                                          edge="start"
                                          checked={(
                                            (header.column.getFilterValue() as string[]) ||
                                            []
                                          ).includes(value)}
                                          tabIndex={-1}
                                          disableRipple
                                        />
                                      </ListItemIcon>
                                      <ListItemText primary={value} />
                                    </ListItem>
                                  ))}
                                </List>
                              </Popover>
                            </FormControl>
                          )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="student-table__right-column">
        <StudentStatsChart students={filteredData} />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper
          className="column-visibility-control"
          elevation={0}
          sx={{
            padding: isMobile ? "1rem" : "2rem",
            maxWidth: "90vw",
            maxHeight: "80vh",
            overflow: "auto",
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
      </Popover>
    </div>
  );
}
