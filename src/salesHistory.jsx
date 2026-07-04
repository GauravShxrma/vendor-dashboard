export default function SalesHistory({ salesHistory, handleClearHistory }) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Recent Transactions</h2>
        {salesHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:ring-4 focus:ring-red-100"
          >
            Clear History
          </button>
        )}
      </div>
      
      <div className="p-6 md:p-8">
        {salesHistory.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No sales transactions recorded yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-2">
            {salesHistory.map((sale) => (
              <li key={sale.id} className="py-4 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{sale.name}</p>
                    <p className="text-sm font-medium text-slate-400">{sale.time}</p>
                  </div>
                </div>
                <span className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                  +₹{sale.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}