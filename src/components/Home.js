// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const fetchProducts = async () => {
//     const querySnapshot = await getDocs(collection(db, "products"));
//     const productsList = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setProducts(productsList);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Product Catalog</h2>
//       <input
//         type="text"
//         placeholder="Search Products"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <div className="product-tile">
//         {products
//           .filter((p) =>
//             p.productName.toLowerCase().includes(search.toLowerCase())
//           )
//           .map((product) => (
//             <div
//               className="product-card"
//               key={product.id}
//               onClick={() => navigate(`/edit-product/${product.id}`)}
//             >
//               <img src={product.photo} alt={product.productName} />
//               <h3>{product.productName}</h3>
//               <p>{product.description}</p>
//               <p>Price: ₹{product.price}</p>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../App.css";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false); // End loading
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true); // Start loading during search
      let q;

      if (searchTerm.trim()) {
        // Searching across multiple fields: productName, description, and price
        q = query(
          collection(db, "products"),
          where("productName", ">=", searchTerm),
          where("productName", "<=", searchTerm + "\uf8ff")
        );
        // Optional: Extend the query to search the description and price too (if needed)
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } else {
        // If no search term, fetch all products
        q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      }

      setLoading(false); // End loading after search is done
    };

    fetchFilteredProducts();
  }, [searchTerm]); // This hook runs every time the searchTerm changes

  return (
    <div className="home-container">
      <h2>Product Catalog</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Trigger search on input change
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="product-catalog">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.photo} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
              <span>₹{product.price}</span>
              <Link to={`/edit-product/${product.id}`}>
                <button>Edit Product</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Button */}
      <Link to="/add-product">
        <div className="add-product-btn">Add Product</div>
      </Link>
    </div>
  );
}

export default Home;

