export default function ProductForm({ 
  handleCreateProduct, 
  newName, 
  setNewName, 
  newCategory, 
  setNewCategory, 
  newPrice, 
  setNewPrice, 
  showForm, 
  setShowForm 
}) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
          {showForm ? "✕ Close Form" : "+ Add New Product"}
        </button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
          <form onSubmit={handleCreateProduct} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 max-w-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
            <h3 className="font-bold text-xl text-slate-900 mb-6">Register New Inventory Item</h3>

            <div className="flex flex-col gap-5">
              <label className="flex flex-col text-sm font-semibold text-slate-700">
                Product Name
                <input
                  type="text"
                  placeholder="e.g., Ergonomic Mouse"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </label>

              <label className="flex flex-col text-sm font-semibold text-slate-700">
                Product Category
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Groceries">Groceries</option>
                </select>
              </label>

              <label className="flex flex-col text-sm font-semibold text-slate-700">
                Product Price (₹)
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </label>

              <button
                type="submit"
                className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}