const { request } = require('../../utils/request');

Page({
  data: {
    order: {
      id: null,
      orderNo: '',
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
    loading: false
  },

  onLoad(options) {
    if (options.id) {
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
  }
});
