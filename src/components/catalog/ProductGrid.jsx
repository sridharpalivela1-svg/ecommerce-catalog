import React from 'react';
import { ProductCard } from './ProductCard';
import { useProducts } from '../../context/ProductContext';
import { PackageSearch, RefreshCw } from 'lucide-react';

export const ProductGrid = () => {
  const { products, loading, resetFilters } = useProducts();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 space-y-4 animate-pulse">
            <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 glass-card rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 border border-dashed border-slate-300 dark:border-slate-800 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center">
          <PackageSearch className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No products match your criteria</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Try adjusting your search terms, clearing category filters, or resetting price ranges.
          </p>
        </div>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-500/20"
        >
          <RefreshCw className="w-4 h-4" /> Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
