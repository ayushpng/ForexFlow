function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-2 text-slate-800">{value}</h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
