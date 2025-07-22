import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AdminAddProduct from "./pages/AdminAddProduct";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Tshirt from "./components/Tshirt";
import OrderFailure from "./components/OrderFailure";
import OrderSuccess from "./components/OrderSuccess";
import Mugs from "./components/Mugs";
import Keychain from "./components/Keychain";
import Hoodies from "./components/Hoodies";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-[85vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AdminAddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/tshirts" element={<Tshirt />} />
          <Route path="/mugs" element={<Mugs/>} />
          <Route path="/keychains" element={<Keychain />} />
          <Route path="/hoodies" element={<Hoodies/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-failure" element={<OrderFailure />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/register" element={
             <ProtectedRoute>
            <RegisterPage />
            </ProtectedRoute>
            } />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
