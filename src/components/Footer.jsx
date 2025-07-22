const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white">Printfy</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your favorite print-on-demand store. Quality products, custom designs, and fast delivery.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/admin/add-product" className="hover:text-white">Admin</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>Email: printyfyfashion@gmail.com</li>
            <li>Phone: +91-9263601915</li>
            <li>Address: jharkhand, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Printyfy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
