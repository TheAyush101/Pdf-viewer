import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Placeholder from "./pages/Placeholder";
import Pdf from "./pages/Pdf";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />} // Correctly pass setIsAuthenticated prop
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Placeholder />} />
          <Route path="/pdf" element={<Pdf />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
