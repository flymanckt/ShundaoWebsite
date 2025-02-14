import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div className="App">
        <NavBar onLanguageChange={handleLanguageChange} />
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          {/* 可继续添加其他页面路由 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
