import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Views
import Login from "./views/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
