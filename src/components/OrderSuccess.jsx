import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { razorpay_payment_id, razorpay_order_id } = location.state || {};

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg">Thank you for your purchase.</p>
      <p className="mt-4">🧾 Payment ID: <strong>{razorpay_payment_id}</strong></p>
      <p>🛍️ Order ID: <strong>{razorpay_order_id}</strong></p>
    </div>
  );
};

export default OrderSuccess;
