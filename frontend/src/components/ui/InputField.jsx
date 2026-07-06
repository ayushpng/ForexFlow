import { Mail } from "lucide-react";

function InputField({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div className="mb-5">

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
        name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            py-3
            pl-12
            pr-4
            outline-none
            transition
            focus:border-emerald-700
            focus:ring-2
            focus:ring-emerald-200
          "
        />

      </div>

    </div>
  );
}

export default InputField;