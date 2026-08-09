import React from 'react';
import { ShoppingBag, Search, ShieldCheck, Store, SlidersHorizontal, PackageCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

export const Navbar = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { activeTab, setActiveTab, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } = useProducts();

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('storefront')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
                NexusStore
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Full-Stack
              </span>
            </div>
          </div>

          {/* Search Input (Only in Storefront mode) */}
          {activeTab === 'storefront' && (
            <div className="flex-1 max-w-md mx-2 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by title or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* View Switcher: Storefront vs Admin */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('storefront')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'storefront'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Store</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            </div>

            {/* Cart Trigger Button */}
            {activeTab === 'storefront' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 transition group"
                title="View Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-indigo-600 to-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-indigo-500/40 animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

          </div>
        </div>

        {/* Mobile Search Bar */}
        {activeTab === 'storefront' && (
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
