import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { FilterSidebar } from './components/catalog/FilterSidebar';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductModal } from './components/catalog/ProductModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Sparkles, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

const MainContent = () => {
  const { activeTab, setActiveTab } = useProducts();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'storefront' ? (
          <div className="space-y-8">
            
            {/* Hero Section Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white p-8 sm:p-10 shadow-2xl border border-indigo-500/20">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <Sparkles className="w-3.5 h-3.5" /> Full-Stack Internship Portfolio Project
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Next-Gen Electronics & Lifestyle Catalog
                </h1>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  Discover top-rated headphones, mechanical keyboards, smart watches, and accessories. Features instant filtering, dynamic cart state management, checkout simulation, and an Admin Panel powered by a PHP/MySQL API architecture.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>Explore Admin Panel</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono border-l border-slate-700 pl-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>PHP REST & MySQL API Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catalog Layout: Filter Sidebar + Product Grid */}
            <div className="flex flex-col lg:flex-row gap-8">
              <FilterSidebar />
              <ProductGrid />
            </div>

          </div>
        ) : (
          /* Admin Dashboard Tab */
          <AdminDashboard />
        )}
      </main>

      {/* Quick View Modal & Cart Drawer */}
      <ProductModal />
      <CartDrawer />

      <Footer />
    </div>
  );
};

export function App() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ProductProvider showToast={showToast}>
      <CartProvider showToast={showToast}>
        <MainContent />
        <Toast toasts={toasts} removeToast={removeToast} />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
