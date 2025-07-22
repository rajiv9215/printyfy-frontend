import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharge = 50;
  const total = subtotal + shippingCharge;

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const loadRazorpay = async () => {
    try {
      // 1. Create Razorpay order from backend
      const razorpayOrderRes = await axios.post(
        "https://printyfy-backend.onrender.com/api/payment/orders",
        {
          amount: total,
        }
      );

      const { id: order_id, amount, currency } = razorpayOrderRes.data;

      // 2. Open Razorpay checkout
      const options = {
        key: "rzp_live_CocAQfwsFGmzVQ", // Replace with your real key
        amount,
        currency,
        name: "velamorefashion",
        description: "Order Payment",
        order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            // 3. Save order to DB
            await axios.post("https://printyfy-backend.onrender.com/api/orders", {
              firstName: details.firstName,
              lastName: details.lastName,
              address: details.address,
              pincode: details.pincode,
              phone: details.phone,
              items: cartItems,
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpay_signature,
            });

            clearCart(); // uncomment if you want to empty the cart
            navigate("/order-success", {
              state: {
                razorpay_payment_id,
                razorpay_order_id,
              },
            });
          } catch (err) {
            console.error("Order save failed", err);
            navigate("/order-failure");
          }
        },
        prefill: {
          name: `${details.firstName} ${details.lastName}`,
          // email: "customer@example.com", // optional
          contact: details.phone,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            console.log("User closed the payment popup");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error in payment:", err);
      navigate("/order-failure");
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !details.firstName ||
      !details.lastName ||
      !details.address ||
      !details.pincode ||
      !details.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load.");
      setLoading(false);
      return;
    }

    try {
      await loadRazorpay();
    } catch (err) {
      console.error("Payment init error:", err);
      navigate("/order-failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <input
          name="firstName"
          value={details.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="p-2 border rounded col-span-1"
          required
        />
        <input
          name="lastName"
          value={details.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="p-2 border rounded col-span-1"
          required
        />
        <textarea
          name="address"
          value={details.address}
          onChange={handleInputChange}
          placeholder="Detailed Shipping Address"
          className="p-2 border rounded col-span-2"
          rows="3"
          required
        ></textarea>
        <input
          name="pincode"
          value={details.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
          className="p-2 border rounded col-span-1"
          required
        />
        <input
          name="phone"
          value={details.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="p-2 border rounded col-span-1"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-2"
        >
          {loading ? "Processing..." : "Place Order & Pay"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">🛒 Order Summary</h2>
      <ul className="divide-y border rounded-md mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between p-3">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
        <li className="flex justify-between p-3 font-medium">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </li>
        <li className="flex justify-between p-3 font-medium">
          <span>Shipping</span>
          <span>₹{shippingCharge.toFixed(2)}</span>
        </li>
        <li className="flex justify-between p-3 font-bold border-t">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
};

export default CheckoutPage;
