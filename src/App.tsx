import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentTable } from "./components/StudentTable";
import { Header } from "./components/Header";
import { Usage } from "./components/Usage";
import "./App.css";
import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import { useMemo } from "react";

function App() {
  // システムの設定に基づいてダークモード判定
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // テーマの作成
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route path="/usage" element={<Usage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
