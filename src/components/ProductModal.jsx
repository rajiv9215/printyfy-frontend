// components/ProductModal.jsx
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);

  if (!product) return null;

  const images = product.imageUrl?.length ? product.imageUrl : [product.imageUrl];

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full p-4 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 z-10 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        {/* Image Slider */}
        <div className="relative w-full h-[65vh] mb-4">

          <img
            src={images[index]}
            alt={`product-${index}`}
            className="w-full h-full object-contain rounded"
          />

          {/* Left arrow */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Right arrow */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Product Info */}
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold mb-4">₹{product.price}</p>

        {/* Add to Cart */}
        <button
          onClick={() => {
            addToCart(product);
            onClose();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
