function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <select
      name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          px-4
          outline-none
          transition
          focus:border-emerald-700
          focus:ring-2
          focus:ring-emerald-200
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;