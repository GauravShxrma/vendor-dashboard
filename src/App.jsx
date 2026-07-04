import { useState, useEffect } from "react";
import { data } from "./data.jsx";

// Import Components
import Analytics from "./Analytics.jsx";
import ProductForm from "./productForm.jsx";
import FilterConsole from "./filterConsole.jsx";
import ProductGrid from "./productGrid.jsx";
import SalesHistory from "./salesHistory.jsx";

export default function VendorDashboard() {
  // --- STATE ---
  const [products, setProducts] = useState(() => {
    const savedData = localStorage.getItem("vendor_products");
    return savedData ? JSON.parse(savedData) : data;
  });
  const [revenue, setRevenue] = useState(() => {
    const savedRevenue = localStorage.getItem("vendor_revenue");
    return savedRevenue ? JSON.parse(savedRevenue) : 0;
  });
  const [salesHistory, setSalesHistory] = useState(() => {
    const savedHistory = localStorage.getItem("vendor_sales");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProducts, setFilterProducts] = useState("All");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Electronics");
  const [newPrice, setNewPrice] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // --- DERIVED STATE ---
  const filteredProducts = [...products.filter(item => {
    if ((filterProducts === "All" || item.category === filterProducts) && item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())) {
      return true;
    }
    return false;
  })].sort((a, b) => {
    if (sortBy === "priceLow") return a.price - b.price;
    if (sortBy === "priceHigh") return b.price - a.price;
    if (sortBy === "lowStock") return a.stock - b.stock;
    return 0;
  });

  let totalStock = 0;
  products.forEach((item) => totalStock += item.stock);

  let lowStockCounter = 0;
  products.forEach((item) => {
    if (item.stock <= 5) lowStockCounter += 1;
  });

  // --- HANDLERS ---
  const handelSellProduct = (productId) => {
    const targetProduct = products.find((p) => p.id === productId);

    if (targetProduct && targetProduct.stock > 0) {
      setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, stock: p.stock - 1 } : p));
      setRevenue((prev) => prev + targetProduct.price);
      setSalesHistory((prev) => [
        { id: Date.now(), 
          name: targetProduct.name, 
          price: targetProduct.price, 
          time: new Date().toLocaleDateString() }, 
        ...prev
      ]);
      setToastMessage({ message: `Successfully sold 1 unit of ${targetProduct.name}!`, type: "Success" });
    }
  };

  const handleClearHistory = () => {
    setSalesHistory([]);
    localStorage.removeItem("vendor_sales");
  };

  const handleRestockProduct = (productId) => {
    setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, stock: p.stock + 5 } : p));
    const targetProduct = products.find((p) => p.id === productId);
    if (targetProduct) {
      setToastMessage({ message: `Restocked +5 units of ${targetProduct.name}!`, type: "info" });
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (newName.trim() === "" || newPrice <= 0) {
      alert("Please enter a valid product name and price greater than 0");
      return;
    }
    const newProductItem = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      price: parseFloat(newPrice),
      stock: 10
    };
    setProducts((prev) => [...prev, newProductItem]);
    setNewName("");
    setNewPrice(0);
    setShowForm(false);
  };

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem("vendor_products", JSON.stringify(products));
    localStorage.setItem("vendor_revenue", JSON.stringify(revenue));
    localStorage.setItem("vendor_sales", JSON.stringify(salesHistory));
  }, [products, revenue, salesHistory]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans p-6 md:p-10 lg:p-12">
      <header className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          VendorStore OS
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Real-time inventory management and point-of-sale dashboard for retail vendors.
        </p>
      </header>

      <main className="max-w-7xl mx-auto space-y-10">
        <ProductForm 
          handleCreateProduct={handleCreateProduct}
          newName={newName} setNewName={setNewName}
          newCategory={newCategory} setNewCategory={setNewCategory}
          newPrice={newPrice} setNewPrice={setNewPrice}
          showForm={showForm} setShowForm={setShowForm}
        />

        <Analytics 
          totalRevenue={revenue.toLocaleString('en-In', { style: 'currency', currency: 'INR' })}
          totalStock={totalStock}
          lowStock={lowStockCounter}
        />

        <FilterConsole 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          sortBy={sortBy} setSortBy={setSortBy}
          filterProducts={filterProducts} setFilterProducts={setFilterProducts}
        />

        <ProductGrid 
          filteredProducts={filteredProducts}
          handelSellProduct={handelSellProduct}
          handleRestockProduct={handleRestockProduct}
        />

        <SalesHistory 
          salesHistory={salesHistory}
          handleClearHistory={handleClearHistory}
        />
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold text-white transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          toastMessage.type.toLowerCase() === "success" 
            ? "bg-emerald-600 shadow-emerald-600/30 border border-emerald-500" 
            : "bg-indigo-600 shadow-indigo-600/30 border border-indigo-500"
        }`}>
          <div className="flex items-center gap-3">
            {toastMessage.type.toLowerCase() === "success" ? "🎉" : "📦"}
            {toastMessage.message}
          </div>
        </div>
      )}
    </div>
  );
}