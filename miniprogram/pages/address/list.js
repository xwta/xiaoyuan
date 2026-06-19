const { request } = require('../../utils/request');

Page({
  data: {
    userId: 1,
    addresses: [],
    loading: false
  },

  onShow() {
    this.loadAddresses();
  },

  async loadAddresses() {
    this.setData({ loading: true });
    try {
      const addresses = await request({ url: `/users/${this.data.userId}/addresses` });
      this.setData({ addresses });
    } catch (error) {
      console.error('load addresses failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goEdit() {
    wx.navigateTo({
      url: '/pages/address/edit'
    });
  }
});
