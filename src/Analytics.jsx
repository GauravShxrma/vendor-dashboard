export default function Analytics({ totalRevenue, totalStock, lowStock }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Revenue Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
          <span className="text-8xl">💰</span>
        </div>
        <p className="text-sm font-bold tracking-wide uppercase text-slate-500 mb-2">Total Revenue</p>
        <h3 className="text-4xl font-black text-slate-900">{totalRevenue}</h3>
      </div>
      
      {/* Stock Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
          <span className="text-8xl">📦</span>
        </div>
        <p className="text-sm font-bold tracking-wide uppercase text-slate-500 mb-2">Warehouse Stock</p>
        <h3 className="text-4xl font-black text-slate-900">{totalStock} <span className="text-lg font-medium text-slate-400">items</span></h3>
      </div>
      
      {/* Low Stock Card */}
      <div className={`border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${lowStock > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <span className="text-8xl">⚠️</span>
        </div>
        <p className={`text-sm font-bold tracking-wide uppercase mb-2 ${lowStock > 0 ? 'text-amber-700' : 'text-slate-500'}`}>
          Low Stock Alerts
        </p>
        <h3 className={`text-4xl font-black ${lowStock > 0 ? 'text-amber-700' : 'text-slate-900'}`}>
          {lowStock} <span className={`text-lg font-medium ${lowStock > 0 ? 'text-amber-600/70' : 'text-slate-400'}`}>products</span>
        </h3>
      </div>
    </div>
  );
}