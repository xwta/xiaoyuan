const { getStoredUser, login } = require('../../utils/user');

Page({
  data: {
    user: null,
    logging: false
  },

  onShow() {
    this.setData({ user: getStoredUser() });
  },

  async handleLogin() {
    if (this.data.logging) return;
    this.setData({ logging: true });
    try {
      const user = await login();
      this.setData({ user });
      wx.showToast({ title: '登录成功', icon: 'success' });
    } catch (error) {
      console.error('login failed:', error);
      wx.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      this.setData({ logging: false });
    }
  },

  goOrders() {
    wx.navigateTo({ url: '/pages/order/list' });
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/address/list' });
  },

  goAgentOrders() {
    wx.navigateTo({ url: '/pages/agent/orders' });
  }
});
