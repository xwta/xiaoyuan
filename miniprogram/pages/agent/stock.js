const { request } = require('../../utils/request');

Page({
  data: {
    list: [],
    loading: false
  },

  onShow() {
    this.loadList();
  },

  async loadList() {
    this.setData({ loading: true });
    try {
      const list = await request({ url: '/agent/stocks' });
      this.setData({ list });
    } catch (error) {
      console.error('load agent goods list failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  }
});
