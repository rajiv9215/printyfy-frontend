import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const Tshirt = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

 const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  axios
    .get("https://printyfy-backend.onrender.com/api/products?category=tshirt")
    .then((res) => {
      console.log("Fetched Products:", res.data); // ✅ log here
      setProducts(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products.");
      setLoading(false);
    });
}, []);

  return (
    <div className="lg:px-20 md:px-12 sm:px-8 px-6 md:p-6">
      <h1 className="text-3xl font-bold mb-4 pt-8">T-shirts</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No T-shirts available right now.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Tshirt;
