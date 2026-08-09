import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_REAL_BACKEND = import.meta.env.VITE_USE_REAL_BACKEND === 'true';

// Helper to initialize local storage
const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('LocalStorage error:', e);
    return fallback;
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
};

// Initialize default stored items
setStoredData('ec_products', INITIAL_PRODUCTS);
setStoredData('ec_categories', INITIAL_CATEGORIES);
if (!localStorage.getItem('ec_orders')) {
  setStoredData('ec_orders', INITIAL_ORDERS);
}

export const apiService = {
  // Check backend connectivity status
  async checkBackendStatus() {
    if (!USE_REAL_BACKEND) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/products/read.php`, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch all products (with category, search, sorting filters)
  async getProducts(params = {}) {
    if (USE_REAL_BACKEND) {
      try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE_URL}/products/read.php?${query}`);
        if (res.ok) {
          const json = await res.json();
          return json.data || [];
        }
      } catch (e) {
        console.warn('Real backend fetch failed, switching to local mode:', e);
      }
    }

    // LocalStorage Fallback Logic
    let products = getStoredData('ec_products', INITIAL_PRODUCTS);

    const { category, search, sort, min_price, max_price } = params;

    if (category && category !== 'all') {
      products = products.filter(
        p => p.category_slug === category || p.category_name?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        p => p.title.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             (p.category_name && p.category_name.toLowerCase().includes(q)) ||
             (p.badge && p.badge.toLowerCase().includes(q)) ||
             (p.features && Array.isArray(p.features) && p.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    if (min_price !== undefined && min_price !== '') {
      products = products.filter(p => p.price >= parseFloat(min_price));
    }
    if (max_price !== undefined && max_price !== '') {
      products = products.filter(p => p.price <= parseFloat(max_price));
    }

    // Sorting
    if (sort === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else {
      // newest
      products.sort((a, b) => b.id - a.id);
    }

    return products;
  },

  // Get single product details
  async getProductById(id) {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/read_single.php?id=${id}`);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (e) {
        console.warn('Real backend single fetch failed:', e);
      }
    }
    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    return products.find(p => p.id === Number(id)) || null;
  },

  // Fetch categories
  async getCategories() {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/categories/read.php`);
        if (res.ok) {
          const json = await res.json();
          return json.data || [];
        }
      } catch (e) {
        console.warn('Real backend categories fetch failed:', e);
      }
    }
    return getStoredData('ec_categories', INITIAL_CATEGORIES);
  },

  // Create Product (Admin CRUD)
  async createProduct(productData) {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/create.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Real backend product creation failed:', e);
      }
    }

    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    const categories = getStoredData('ec_categories', INITIAL_CATEGORIES);
    const categoryObj = categories.find(c => c.id === Number(productData.category_id)) || categories[0];

    const newProduct = {
      id: Date.now(),
      title: productData.title,
      description: productData.description || '',
      price: parseFloat(productData.price),
      original_price: productData.original_price ? parseFloat(productData.original_price) : null,
      category_id: Number(productData.category_id),
      category_name: categoryObj.name,
      category_slug: categoryObj.slug,
      stock: Number(productData.stock || 10),
      rating: parseFloat(productData.rating || 4.5),
      review_count: 1,
      image_url: productData.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      badge: productData.badge || null,
      created_at: new Date().toISOString()
    };

    const updated = [newProduct, ...products];
    setStoredData('ec_products', updated);
    return { status: 'success', id: newProduct.id, data: newProduct };
  },

  // Update Product (Admin CRUD)
  async updateProduct(id, productData) {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/update.php`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...productData })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Real backend product update failed:', e);
      }
    }

    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    const categories = getStoredData('ec_categories', INITIAL_CATEGORIES);
    const categoryObj = categories.find(c => c.id === Number(productData.category_id));

    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      products[index] = {
        ...products[index],
        title: productData.title,
        description: productData.description,
        price: parseFloat(productData.price),
        original_price: productData.original_price ? parseFloat(productData.original_price) : null,
        category_id: Number(productData.category_id),
        category_name: categoryObj ? categoryObj.name : products[index].category_name,
        category_slug: categoryObj ? categoryObj.slug : products[index].category_slug,
        stock: Number(productData.stock),
        badge: productData.badge,
        image_url: productData.image_url
      };
      setStoredData('ec_products', products);
      return { status: 'success', data: products[index] };
    }
    throw new Error('Product not found for update');
  },

  // Delete Product (Admin CRUD)
  async deleteProduct(id) {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/delete.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Real backend product delete failed:', e);
      }
    }

    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    const filtered = products.filter(p => p.id !== Number(id));
    setStoredData('ec_products', filtered);
    return { status: 'success', message: 'Product deleted successfully' };
  },

  // Create Order (Checkout)
  async createOrder(orderData) {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/create.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (e) {
        console.warn('Real backend order placement failed:', e);
      }
    }

    const orders = getStoredData('ec_orders', INITIAL_ORDERS);
    const orderCode = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newOrder = {
      id: Date.now(),
      order_code: orderCode,
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      shipping_address: orderData.shipping_address,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      tax: orderData.tax,
      total_amount: orderData.total_amount,
      status: 'Processing',
      created_at: new Date().toISOString()
    };

    // Decrement stock for ordered items in localStorage
    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    orderData.items.forEach(item => {
      const prod = products.find(p => p.id === item.product_id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
    setStoredData('ec_products', products);

    setStoredData('ec_orders', [newOrder, ...orders]);
    return { status: 'success', order_code: orderCode, order_id: newOrder.id, data: newOrder };
  },

  // Admin Dashboard Statistics
  async getDashboardStats() {
    if (USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_BASE_URL}/stats/dashboard.php`);
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (e) {
        console.warn('Real backend stats fetch failed:', e);
      }
    }

    const products = getStoredData('ec_products', INITIAL_PRODUCTS);
    const orders = getStoredData('ec_orders', INITIAL_ORDERS);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const lowStockCount = products.filter(p => p.stock <= 5).length;

    return {
      total_products: products.length,
      low_stock_count: lowStockCount,
      total_orders: orders.length,
      total_revenue: totalRevenue,
      recent_orders: orders.slice(0, 5)
    };
  }
};
