import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
  title: "",
  description: "",
  price: "",
  category: "",
  tags: "",
});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ New loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append("title", form.title);
  data.append("description", form.description);
  data.append("price", form.price);
  data.append("category", form.category);

  // ✅ Append tags correctly
  form.tags
    .split(",")
    .map((tag) => tag.trim())
    .forEach((tag) => {
      data.append("tags", tag);
    });

  // ✅ Append images
  images.forEach((image) => {
    data.append("images", image);
  });

  try {
    setLoading(true);
    const res = await axios.post(
      "https://printyfy-backend.onrender.com/api/products/add",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    setForm({ title: "", description: "", price: "", category: "", tags: "" });
    setImages([]);
    alert("✅ Product added!");
    console.log(res.data);
  } catch (err) {
    console.error("Upload error:", err);
    alert("❌ Failed to upload product");
  } finally {
    setLoading(false);
  }
};

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className=" mt-10 p-4 max-w-xl mx-auto relative">
      {/* 🔓 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="tshirt">tshirt</option>
          <option value="mug">mug</option>
          <option value="keychain">keychain</option>
          <option value="hoodies">hoodie</option>
        </select>

        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
