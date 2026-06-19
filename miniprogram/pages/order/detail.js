const { request } = require('../../utils/request');

Page({
  data: {
    orderId: null,
    order: {
      id: null,
      orderNo: '',
      status: '',
      statusText: '',
      deliveryText: '',
      contactName: '',
      phone: '',
      addressText: '',
      verifyCode: '',
      productAmount: '0.00',
      deliveryFee: '0.00',
      payAmount: '0.00',
      items: []
    },
    loading: false,
    operating: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ orderId: options.id });
      this.loadOrderDetail(options.id);
    }
  },

  async loadOrderDetail(orderId) {
    this.setData({ loading: true });
    try {
      const order = await request({ url: `/orders/${orderId}` });
      const productAmount = order.productAmount || (order.items || []).reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
      const deliveryFee = Number(order.deliveryFee || 0);
      const payAmount = Number(order.payAmount || productAmount + deliveryFee);

      this.setData({
        order: {
          ...order,
          addressText: order.deliveryType === 'pickup'
            ? '代理点自提'
            : `第一校区 ${order.buildingName || ''} ${order.roomNo || ''}`,
          productAmount: Number(productAmount).toFixed(2),
          deliveryFee: deliveryFee.toFixed(2),
          payAmount: payAmount.toFixed(2),
          items: (order.items || []).map(item => ({
            ...item,
            id: item.id || item.productId,
            totalAmount: Number(item.totalAmount || Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)
          }))
        }
      });
    } catch (error) {
      console.error('load order detail failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  async checkoutOrder() {
    if (!this.data.orderId || this.data.operating) return;
    this.setData({ operating: true });
    try {
      await request({ url: `/orders/${this.data.orderId}/checkout`, method: 'POST' });
      wx.showToast({ title: '处理成功', icon: 'success' });
      this.loadOrderDetail(this.data.orderId);
    } catch (error) {
      console.error('checkout order failed:', error);
    } finally {
      this.setData({ operating: false });
    }
  },

  async completeOrder() {
    if (!this.data.orderId || this.data.operating) return;
    this.setData({ operating: true });
    try {
      await request({ url: `/orders/${this.data.orderId}/complete`, method: 'POST' });
      wx.showToast({ title: '订单已完成', icon: 'success' });
      this.loadOrderDetail(this.data.orderId);
    } catch (error) {
      console.error('complete order failed:', error);
    } finally {
      this.setData({ operating: false });
    }
  }
});
