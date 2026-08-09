import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children, showToast }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('storefront'); // 'storefront' | 'admin'
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For Quick View Modal

  // Load products with current active filters
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: sortOption,
        min_price: priceRange[0],
        max_price: priceRange[1]
      });
      setProducts(data);
    } catch (e) {
      console.error('Error loading products:', e);
      if (showToast) showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, sortOption, priceRange, showToast]);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await apiService.getCategories();
      setCategories(cats);
    } catch (e) {
      console.error('Error loading categories:', e);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Admin CRUD Actions
  const addProduct = async (productData) => {
    try {
      const res = await apiService.createProduct(productData);
      if (showToast) showToast('New product created successfully!', 'success');
      await fetchProducts();
      await fetchCategories();
      return res;
    } catch (e) {
      if (showToast) showToast('Failed to create product: ' + e.message, 'error');
      throw e;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const res = await apiService.updateProduct(id, productData);
      if (showToast) showToast('Product updated successfully!', 'success');
      await fetchProducts();
      return res;
    } catch (e) {
      if (showToast) showToast('Failed to update product: ' + e.message, 'error');
      throw e;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiService.deleteProduct(id);
      if (showToast) showToast('Product deleted from inventory', 'info');
      await fetchProducts();
    } catch (e) {
      if (showToast) showToast('Failed to delete product: ' + e.message, 'error');
      throw e;
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortOption('newest');
    setPriceRange([0, 200000]);
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      activeTab,
      setActiveTab,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      sortOption,
      setSortOption,
      priceRange,
      setPriceRange,
      selectedProduct,
      setSelectedProduct,
      addProduct,
      editProduct,
      deleteProduct,
      resetFilters,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
