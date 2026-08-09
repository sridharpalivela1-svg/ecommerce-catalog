import React, { useState } from 'react';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';

export const ProductModal = () => {
  const { selectedProduct, setSelectedProduct } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Image Section */}
          <div className="relative aspect-square md:aspect-auto bg-slate-100 dark:bg-slate-800 p-6 flex items-center justify-center">
            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.title}
              className="max-h-[380px] w-auto object-contain rounded-2xl shadow-lg"
            />
            {selectedProduct.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Right Product Details */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {selectedProduct.category_name || 'Catalog Item'}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-slate-400">({selectedProduct.review_count || 48} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {selectedProduct.title}
              </h2>

              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.original_price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{selectedProduct.original_price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Product Feature Bullets */}
              {selectedProduct.features && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector & Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(selectedProduct.stock, q + 1))}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stock Status text */}
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>In Stock: <strong className="text-slate-900 dark:text-white">{selectedProduct.stock} units</strong></span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Truck className="w-3.5 h-3.5" /> Free Express Shipping
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={selectedProduct.stock <= 0}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
