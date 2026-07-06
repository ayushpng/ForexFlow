function PrimaryButton({ text, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
       bg-emerald-700
hover:bg-emerald-800
        text-white
        font-semibold
        py-4
        rounded-xl
        transition
        duration-300
        shadow-md
        hover:shadow-lg
        text-lg
      "
    >
      {text}
    </button>
  );
}

export default PrimaryButton;