import ProductCard from "./ProductCard";

export default function ProductGrid({ filteredProducts, handelSellProduct, handleRestockProduct }) {
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
        <p className="text-slate-500 text-lg font-medium">No products match your parameters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((item) => (
        <ProductCard 
          key={item.id} 
          item={item} 
          handelSellProduct={handelSellProduct} 
          handleRestockProduct={handleRestockProduct} 
        />
      ))}
    </div>
  );
}