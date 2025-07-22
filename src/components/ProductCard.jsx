// components/ProductCard.jsx
const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="cursor-pointer border rounded-lg shadow-sm p-4 flex flex-col bg-white hover:shadow-md transition duration-200"
    >
      <div className="w-full aspect-[4/5] overflow-hidden rounded-md mb-3">
        <img
          src={product.imageUrl[0]}
          alt={product.title}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-base font-semibold text-gray-800 mb-1">
        {product.title}
      </h2>
      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
      <p className="text-blue-700 font-semibold text-base mb-3">
        ₹{product.price}
      </p>
    </div>
  );
};

export default ProductCard;
