import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Loader2, PackageCheck, Copy, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { apiService } from '../../services/api';

export const CheckoutModal = ({ onClose }) => {
  const { cartItems, subtotal, discountAmount, taxAmount, grandTotal, clearCart, setIsCartOpen } = useCart();

  const [formData, setFormData] = useState({
    name: 'Sridhar Palivela',
    email: 'sridhar.intern@example.com',
    address: '456 Innovation Park',
    city: 'Hyderabad',
    state: 'Telangana',
    zip: '500081'
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderPayload = {
        customer_name: formData.name,
        customer_email: formData.email,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        subtotal: subtotal,
        discount: discountAmount,
        tax: taxAmount,
        total_amount: grandTotal,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price
        }))
      };

      const result = await apiService.createOrder(orderPayload);
      
      setOrderCompleted({
        order_code: result.order_code || 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        customer_name: formData.name,
        customer_email: formData.email,
        total: grandTotal,
        itemCount: cartItems.length
      });

      clearCart();
    } catch (err) {
      alert('Order error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    setOrderCompleted(null);
    onClose();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl glass-card rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {orderCompleted ? 'Order Confirmed!' : 'Express Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          /* Order Confirmation View */
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Thank you for your order!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                A confirmation receipt has been sent to <strong className="text-slate-800 dark:text-slate-200">{orderCompleted.customer_email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{orderCompleted.order_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Items Ordered:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{orderCompleted.itemCount} item(s)</span>
              </div>
              <div className="flex justify-between text-sm pt-1 border-t border-slate-200 dark:border-slate-700 font-bold">
                <span className="text-slate-800 dark:text-slate-200">Total Paid:</span>
                <span className="text-emerald-600 dark:text-emerald-400">₹{Math.round(orderCompleted.total).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Back to Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Street Shipping Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Zip Code</label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {/* Order Payment Summary Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items ({cartItems.length}):</span>
                <span className="font-mono">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Taxes & Shipping:</span>
                <span className="font-mono">₹{Math.round(taxAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-indigo-900 dark:text-indigo-200 pt-1 border-t border-indigo-200/50 dark:border-indigo-800">
                <span>Total Amount Due:</span>
                <span className="text-base text-indigo-600 dark:text-indigo-400 font-extrabold font-mono">
                  ₹{Math.round(grandTotal).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
                </>
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" /> Place Order (₹{Math.round(grandTotal).toLocaleString('en-IN')})
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
