const { request } = require('../../utils/request');

Page({
  data: {
    orderId: '',
    code: '',
    submitting: false
  },

  handleOrderIdInput(event) {
    this.setData({ orderId: event.detail.value });
  },

  handleInput(event) {
    this.setData({ code: event.detail.value });
  },

  async submitCode() {
    if (!this.data.orderId) {
      wx.showToast({ title: '请输入订单ID', icon: 'none' });
      return;
    }

    if (!this.data.code) {
      wx.showToast({ title: '请输入取货码', icon: 'none' });
      return;
    }

    if (this.data.submitting) return;

    this.setData({ submitting: true });
    try {
      await request({
        url: `/agent/orders/${this.data.orderId}/verify`,
        method: 'POST',
        data: { code: this.data.code }
      });

      wx.showToast({ title: '操作成功', icon: 'success' });
      this.setData({ orderId: '', code: '' });
    } catch (error) {
      console.error('submit pickup code failed:', error);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
