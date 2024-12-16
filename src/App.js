import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-product" style={{ marginLeft: "10px" }}>Add Product</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
