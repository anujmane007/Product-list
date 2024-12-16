// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import "../App.css";
// import "./Home.css";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true); // State to track loading

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Start loading
//       const q = query(collection(db, "products"));
//       const querySnapshot = await getDocs(q);
//       const productList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//       setLoading(false); // End loading
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchFilteredProducts = async () => {
//       setLoading(true); // Start loading during search
//       let q;

//       if (searchTerm.trim()) {
//         // Searching across multiple fields: productName, description, and price
//         q = query(
//           collection(db, "products"),
//           where("productName", ">=", searchTerm),
//           where("productName", "<=", searchTerm + "\uf8ff")
//         );
//         // Optional: Extend the query to search the description and price too (if needed)
//         const querySnapshot = await getDocs(q);
//         const productList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productList);
//       } else {
//         // If no search term, fetch all products
//         q = query(collection(db, "products"));
//         const querySnapshot = await getDocs(q);
//         const productList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productList);
//       }

//       setLoading(false); // End loading after search is done
//     };

//     fetchFilteredProducts();
//   }, [searchTerm]); // This hook runs every time the searchTerm changes

//   return (
//     <div className="home-container">
//       <h2>Product Catalog</h2>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Trigger search on input change
//         />
//       </div>

//       {/* Loading Spinner */}
//       {loading ? (
//         <div className="loader">Loading...</div>
//       ) : (
//         <div className="product-catalog">
//           {products.map((product) => (
//             <div key={product.id} className="product-card">
//               <img src={product.photo} alt={product.productName} />
//               <h3>{product.productName}</h3>
//               <p>{product.description}</p>
//               <span>₹{product.price}</span>
//               <Link to={`/edit-product/${product.id}`}>
//                 <button>Edit Product</button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }

// export default Home;



import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../App.css";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Fetch filtered products based on searchTerm
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      let q;

      if (searchTerm.trim()) {
        q = query(
          collection(db, "products"),
          where("productName", ">=", searchTerm),
          where("productName", "<=", searchTerm + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } else {
        q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      }

      setLoading(false);
    };

    fetchFilteredProducts();
  }, [searchTerm]);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      // Delete from Firestore
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);

      // Update local state by removing the deleted product
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">Explore Products</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loader"></div>
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
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
