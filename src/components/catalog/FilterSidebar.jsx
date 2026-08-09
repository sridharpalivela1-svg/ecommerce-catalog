import React from 'react';
import { Filter, RotateCcw, ArrowUpDown, Tag, IndianRupee } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const FilterSidebar = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    resetFilters
  } = useProducts();

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="glass-card p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Filter Title & Reset */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-base">
            <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Filter Products</span>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Categories Filter */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-500" /> Categories
          </label>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>All Categories</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                  selectedCategory === cat.slug
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                {cat.product_count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === cat.slug ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {cat.product_count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-500" /> Max Price
            </label>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              ₹{priceRange[1].toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="200000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-indigo-600 cursor-pointer h-2 rounded-lg bg-slate-200 dark:bg-slate-800"
          />
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>₹0</span>
            <span>₹1L</span>
            <span>₹2L</span>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" /> Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

      </div>
    </aside>
  );
};
