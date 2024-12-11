import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentTable } from "./components/StudentTable";
import { Header } from "./components/Header";
import { Usage } from "./components/Usage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route path="/usage" element={<Usage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
