import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const TrendingTshirts = () => {
  const [tshirts, setTshirts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          "https://printyfy-backend.onrender.com/api/products/trending-tshirts"
        );
        setTshirts(res.data);
      } catch (err) {
        console.error("Failed to fetch trending t-shirts:", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="py-10 px-6 md:px-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Trending T-Shirts
        </h2>
        <a
          href="/tshirts"
          className="text-indigo-600 hover:underline font-medium"
        >
          View All
        </a>
      </div>

      {/* Scrollable card row */}
{/* Scrollable card row */}
<div className="overflow-x-auto sm:overflow-x-visible">
  <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {tshirts.map((shirt) => (
      <div key={shirt._id} className="min-w-[220px] sm:min-w-0">
        <ProductCard
          product={shirt}
          onClick={(product) => setSelectedProduct(product)}
        />
      </div>
    ))}
  </div>
</div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default TrendingTshirts;
