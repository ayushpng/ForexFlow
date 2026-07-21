function Receipt() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div
        id="receipt"
        className="bg-white shadow rounded-xl p-8 w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-center">
          ForexFlow
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Currency Exchange Receipt
        </p>

        <div className="border-t border-b py-4 mb-6">
          <p>
            <strong>Receipt No:</strong> FX2026000001
          </p>
        </div>

        <h2 className="font-semibold text-lg mb-3">
          Shop Information
        </h2>

        <div className="space-y-2 mb-6">
          <p><strong>Shop:</strong> Lakeside Money Changer</p>
          <p><strong>Address:</strong> Pokhara, Lakeside</p>
          <p><strong>Phone:</strong> 061-123456</p>
        </div>

        <h2 className="font-semibold text-lg mb-3">
          Customer Information
        </h2>

        <div className="space-y-2 mb-6">
          <p><strong>Name:</strong> Ramun Shrestha</p>
          <p><strong>Country:</strong> USA</p>
          <p><strong>Passport:</strong> USA-8564115</p>
          <p><strong>Phone:</strong> 9852641578</p>
        </div>

        <h2 className="font-semibold text-lg mb-3">
          Exchange Details
        </h2>

        <div className="space-y-2 mb-8">
          <p><strong>Transaction:</strong> Sell</p>
          <p><strong>Currency:</strong> USD</p>
          <p><strong>Amount:</strong> 100</p>
          <p><strong>Rate:</strong> 133.55</p>
          <p><strong>Total NPR:</strong> 13,355.00</p>
        </div>

        <div className="text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;