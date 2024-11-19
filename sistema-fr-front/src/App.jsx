import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Views
import Login from "./views/Login";
import Home from "./views/Home";
import Students from "./views/Students";
import Grades from "./views/Grades";
import Tables from "./views/Tables";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/tables" element={<Tables />} />
          
          {/* Default route */}
          <Route path="/" element={<Login />} />

          {/* 404 */}
          <Route path="*" element={<h1>404, intenta buscar en otro lado... :{"C"}</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
