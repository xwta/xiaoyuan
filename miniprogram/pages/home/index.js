const { request } = require('../../utils/request');
const { addCartItem } = require('../../utils/cart');

Page({
  data: {
    loading: false,
    products: []
  },

  onLoad() {
    this.loadProducts();
  },

  async loadProducts() {
    this.setData({ loading: true });
    try {
      const products = await request({ url: '/products' });
      this.setData({
        products: products.slice(0, 6).map(item => ({
          ...item,
          price: Number(item.price).toFixed(2),
          description: item.tags ? item.tags.join(' · ') : '校园热卖商品',
          coverUrl: item.coverUrl || '/assets/product-placeholder.png'
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
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  }
});
