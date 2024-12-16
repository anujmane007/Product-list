// import React, { useState, useEffect } from "react";
// import { db } from "../firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useParams, useNavigate } from "react-router-dom";
// import "../App.css";

// function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(null);

//   const fetchProduct = async () => {
//     const docRef = doc(db, "products", id);
//     const productDoc = await getDoc(docRef);
//     setFormData({ id: productDoc.id, ...productDoc.data() });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFormData({ ...formData, photo: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await updateDoc(doc(db, "products", formData.id), formData);
//       alert("Product updated successfully!");
//       navigate("/");
//     } catch (error) {
//       console.error("Error updating product: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   if (!formData) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Edit Product</h2>
//       <form onSubmit={handleUpdate}>
//         <input name="productName" value={formData.productName} onChange={handleChange} required />
//         <textarea name="description" value={formData.description} onChange={handleChange} required />
//         <input name="price" type="number" value={formData.price} onChange={handleChange} required />
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <textarea name="other" value={formData.other} onChange={handleChange} />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default EditProduct;


import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
import "../App.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [progress, setProgress] = useState(0); // Progress state for the progress bar

  const fetchProduct = async () => {
    const docRef = doc(db, "products", id);
    const productDoc = await getDoc(docRef);
    setFormData({ id: productDoc.id, ...productDoc.data() });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setProgress(0); // Reset progress to 0 before starting the submission

    const simulateProgress = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(simulateProgress);
          return 100;
        }
        return prevProgress + 10; // Simulate progress
      });
    }, 500);

    try {
      // Simulating the actual update process
      await updateDoc(doc(db, "products", formData.id), formData);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <textarea
          name="other"
          value={formData.other}
          onChange={handleChange}
        />
        <button type="submit" disabled={progress !== 0 && progress !== 100}>
          Update
        </button>
      </form>

      {/* Display progress bar */}
      {progress > 0 && <ProgressBar progress={progress} />}
    </div>
  );
}

export default EditProduct;
