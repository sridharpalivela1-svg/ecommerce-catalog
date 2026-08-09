import React from 'react';
import { Star, ShoppingCart, Eye, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { setSelectedProduct } = useProducts();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image & Badges */}
      <div>
        <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                {product.badge}
              </span>
            )}
            {discountPercent && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-500 text-white shadow-md shadow-rose-500/30">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Low / Out of Stock Indicator */}
          {isOutOfStock ? (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white shadow-lg flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
              </span>
            </div>
          ) : isLowStock ? (
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-xs">
                Only {product.stock} left!
              </span>
            </div>
          ) : null}

          {/* Quick View Floating Button */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200 shadow-md backdrop-blur-xs"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
              {product.category_name || 'General'}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.review_count || 12})</span>
            </div>
          </div>

          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Add to Cart */}
      <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100/60 dark:border-slate-800/60">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.original_price && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ₹{product.original_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          disabled={isOutOfStock}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
            isOutOfStock
              ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-500/25'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

    </div>
  );
};
