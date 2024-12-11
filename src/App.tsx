import { BrowserRouter as Router } from "react-router-dom";
import { StudentTable } from "./components/StudentTable";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <StudentTable />
        </main>
      </div>
    </Router>
  );
}

export default App;
