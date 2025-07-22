import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const Mugs = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://printyfy-backend.onrender.com/api/products?category=mug")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="lg:px-20 md:px-12 sm:px-8 px-6 md:p-6">
      <h1 className="text-3xl font-bold mb-4">Mugs</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Mugs;
