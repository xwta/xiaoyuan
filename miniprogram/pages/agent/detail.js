const { request } = require('../../utils/request');

Page({
  data: {
    orderId: null,
    order: {
      id: null,
      statusText: '',
      deliveryText: '',
      contactName: '',
      phone: '',
      addressText: '',
      items: []
    },
    loading: false,
    operating: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ orderId: options.id });
      this.loadOrder(options.id);
    }
  },

  async loadOrder(orderId) {
    this.setData({ loading: true });
    try {
      const order = await request({ url: `/orders/${orderId}` });
      this.setData({
        order: {
          ...order,
          addressText: order.deliveryType === 'pickup'
            ? '代理点自提'
            : `第一校区 ${order.buildingName || ''} ${order.roomNo || ''}`,
          payAmount: Number(order.payAmount || 0).toFixed(2),
          items: (order.items || []).map(item => ({
            ...item,
            id: item.id || item.productId,
            totalAmount: Number(item.totalAmount || Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)
          }))
        }
      });
    } catch (error) {
      console.error('load agent order failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  async acceptOrder() {
    if (!this.data.orderId || this.data.operating) return;
    this.setData({ operating: true });
    try {
      await request({ url: `/agent/orders/${this.data.orderId}/accept`, method: 'POST' });
      wx.showToast({ title: '已接单', icon: 'success' });
      this.loadOrder(this.data.orderId);
    } catch (error) {
      console.error('accept order failed:', error);
    } finally {
      this.setData({ operating: false });
    }
  },

  async completeOrder() {
    if (!this.data.orderId || this.data.operating) return;
    this.setData({ operating: true });
    try {
      await request({ url: `/agent/orders/${this.data.orderId}/delivered`, method: 'POST' });
      wx.showToast({ title: '订单完成', icon: 'success' });
      this.loadOrder(this.data.orderId);
    } catch (error) {
      console.error('complete order failed:', error);
    } finally {
      this.setData({ operating: false });
    }
  }
});
