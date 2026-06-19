Page({
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
