function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between hover:shadow-lg transition">

      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

    </div>
  );
}

export default StatCard;