export default function ProductCard({ item, handelSellProduct, handleRestockProduct }) {
  return (
    <div className="group bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-100 text-slate-600">
          {item.category}
        </span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
          item.stock === 0 ? "bg-red-100 text-red-700" :
          item.stock <= 5 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
        }`}>
          {item.stock === 0 ? "Out of Stock" : `${item.stock} in stock`}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2 flex-grow">
        {item.name}
      </h2>
      <div className="text-3xl font-black text-slate-900 mb-6">
        {item.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
      </div>

      <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100">
        <button
          onClick={() => handelSellProduct(item.id)}
          disabled={item.stock === 0}
          className="flex-1 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          Sell 1
        </button>
        <button
          onClick={() => handleRestockProduct(item.id)}
          className="flex-1 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all"
        >
          + Restock
        </button>
      </div>
    </div>
  );
}