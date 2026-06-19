const {
  getCartItems,
  updateCartItemQuantity,
  getCartTotal
} = require('../../utils/cart');

Page({
  data: {
    cartItems: [],
    totalAmount: '0.00'
  },

  onShow() {
    this.refreshCart();
  },

  refreshCart() {
    const cartItems = getCartItems();
    this.setData({
      cartItems: cartItems.map(item => ({
        ...item,
        price: Number(item.price).toFixed(2)
      })),
      totalAmount: getCartTotal(cartItems).toFixed(2)
    });
  },

  increase(event) {
    const productId = event.currentTarget.dataset.id;
    const item = this.data.cartItems.find(cartItem => cartItem.id === productId);
    if (!item) return;

    updateCartItemQuantity(productId, item.quantity + 1);
    this.refreshCart();
  },

  decrease(event) {
    const productId = event.currentTarget.dataset.id;
    const item = this.data.cartItems.find(cartItem => cartItem.id === productId);
    if (!item) return;

    updateCartItemQuantity(productId, item.quantity - 1);
    this.refreshCart();
  },

  goConfirm() {
    if (!this.data.cartItems.length) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }

    wx.navigateTo({
      url: '/pages/order/confirm'
    });
  }
});
