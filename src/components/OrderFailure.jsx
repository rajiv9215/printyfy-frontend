const OrderFailure = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Payment Failed</h1>
      <p className="text-lg">Something went wrong during payment.</p>
      <p className="mt-4">Please try again or contact support.</p>
    </div>
  );
};

export default OrderFailure;
