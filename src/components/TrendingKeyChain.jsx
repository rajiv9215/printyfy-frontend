import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

// Dummy keychain data (replace with real products or API)

const TrendingKeychains = () => {
  const [keyChain, setKeyChain] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          "https://printyfy-backend.onrender.com/api/products/trending-keychain"
        );
        setKeyChain(res.data);
      } catch (err) {
        console.error("Failed to fetch trending keyChain:", err);
      }
    };

    fetchTrending();
  }, []);
  return (
    <section className="py-10 px-6 md:px-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Trending KeyChain
        </h2>
        <a
          href="/keychain"
          className="text-indigo-600 hover:underline font-medium"
        >
          View All
        </a>
      </div>
      {/* Scrollable card row */}
      <div className="overflow-x-auto sm:overflow-x-visible">
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {keyChain.map((keychain) => (
            <div key={keychain._id} className="min-w-[220px] sm:min-w-0">
              <ProductCard
                product={keychain}
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

export default TrendingKeychains;
