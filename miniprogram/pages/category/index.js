const { request } = require('../../utils/request');
const { addCartItem } = require('../../utils/cart');

Page({
  data: {
    activeCategoryId: 1,
    categories: [],
    products: [],
    loading: false
  },

  async onLoad() {
    await this.loadCategories();
    this.loadProducts(this.data.activeCategoryId);
  },

  async loadCategories() {
    try {
      const categories = await request({ url: '/categories' });
      const activeCategoryId = categories[0] ? categories[0].id : 1;
      this.setData({ categories, activeCategoryId });
    } catch (error) {
      console.error('load categories failed:', error);
    }
  },

  changeCategory(event) {
    const categoryId = event.currentTarget.dataset.id;
    this.setData({ activeCategoryId: categoryId });
    this.loadProducts(categoryId);
  },

  async loadProducts(categoryId) {
    this.setData({ loading: true });
    try {
      const products = await request({
        url: `/products?categoryId=${categoryId}`
      });

      this.setData({
        products: products.map(item => ({
          ...item,
          price: Number(item.price).toFixed(2),
          coverUrl: item.coverUrl || '/assets/product-placeholder.png',
          tags: item.tags || []
        }))
      });
    } catch (error) {
      console.error('load products failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  addToCart(event) {
    const productId = event.currentTarget.dataset.id;
    const product = this.data.products.find(item => item.id === productId);
    if (!product) return;

    addCartItem(product, 1);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  }
});
