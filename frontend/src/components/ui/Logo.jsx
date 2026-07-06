import { BadgeDollarSign } from "lucide-react";

function Logo() {
  return (
    <div className="text-center mb-5">

      <div className="flex justify-center mb-4">
        <div className="bg-emerald-700 p-4 rounded-full shadow-lg">
          <BadgeDollarSign size={38} className="text-white" />
        </div>
      </div>

      <h1 className="text-4xl font-bold text-slate-800">
        Forex<span className="text-emerald-700">Flow</span>
      </h1>

      <p className="text-slate-500 mt-2">
        Smart Currency Exchange Management System
      </p>

      <div className="flex justify-center gap-2 mt-4 mb-8 flex-wrap">
        {["USD", "EUR", "GBP", "JPY", "NPR"].map((currency) => (
          <span
            key={currency}
            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold"
          >
            {currency}
          </span>
        ))}
      </div>

    </div>
  );
}

export default Logo;