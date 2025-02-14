import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import News from "./pages/News";
import Sustainability from "./pages/Sustainability";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
