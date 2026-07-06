import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordField({
  label,
  placeholder,
  name,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        {/* Lock Icon */}
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
            name={name}
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            py-3
            pl-12
            pr-12
            outline-none
            transition
            focus:border-emerald-700
            focus:ring-2
            focus:ring-emerald-200
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

      </div>

    </div>
  );
}

export default PasswordField;