// import React, { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";
// import "../App.css";

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     productId: "",
//     productName: "",
//     description: "",
//     price: "",
//     photo: "",
//     other: "",
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setFormData({ ...formData, photo: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "products"), formData);
//       alert("Product added successfully!");
//       setFormData({
//         productId: "",
//         productName: "",
//         description: "",
//         price: "",
//         photo: "",
//         other: "",
//       });
//     } catch (error) {
//       console.error("Error adding product: ", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="productId" placeholder="Product ID (Unique)" value={formData.productId} onChange={handleChange} required />
//         <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//         <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
//         <input type="file" accept="image/*" onChange={handleFileChange} required />
//         <textarea name="other" placeholder="Other Information" value={formData.other} onChange={handleChange} />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;



import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
import "../App.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    description: "",
    price: "",
    photo: "",
    other: "",
  });

  const [progress, setProgress] = useState(0); // Progress state for the progress bar

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
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
      // Simulating the actual submission process
      await addDoc(collection(db, "products"), formData);
      alert("Product added successfully!");
      setFormData({
        productId: "",
        productName: "",
        description: "",
        price: "",
        photo: "",
        other: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="productId"
          placeholder="Product ID (Unique)"
          value={formData.productId}
          onChange={handleChange}
          required
        />
        <input
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <textarea
          name="other"
          placeholder="Other Information"
          value={formData.other}
          onChange={handleChange}
        />
        <button type="submit" disabled={progress !== 0 && progress !== 100}>
          Submit
        </button>
      </form>

      {/* Display progress bar */}
      {progress > 0 && <ProgressBar progress={progress} />}
    </div>
  );
}

export default AddProduct;
