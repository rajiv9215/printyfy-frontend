import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.jpeg"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <img className=" h-12 md:h-16 overflow-hidden" src={logo} alt="Velamore" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <Link to="/about" className="hover:text-black">About</Link>
          <Link to="/cart" className="relative text-xl">
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart + Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart Icon (always visible on mobile) */}
          <Link to="/cart" className="relative text-xl">
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-gray-700 font-medium">
          <Link to="/" className="block hover:text-black">Home</Link>
          <Link to="/shop" className="block hover:text-black">Shop</Link>
          <Link to="/about" className="block hover:text-black">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
