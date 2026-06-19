const { request } = require('../../utils/request');
const { getCartItems, getCartTotal, clearCart } = require('../../utils/cart');

Page({
  data: {
    deliveryType: 'dormitory',
    address: {
      campusId: 1,
      buildingId: 1,
      campusName: '第一校区',
      buildingName: '6号楼',
      roomNo: '602',
      contactName: '张同学',
      phone: '13800000000'
    },
    agent: {
      id: 1,
      name: '6号楼校园代理点',
      pickupAddress: '6号楼一楼大厅旁'
    },
    items: [],
    productAmount: '0.00',
    deliveryFee: '0.00',
    payAmount: '0.00',
    submitting: false
  },

  onLoad() {
    this.loadOrderPreview();
  },

  loadOrderPreview() {
    const cartItems = getCartItems();
    const productAmount = getCartTotal(cartItems);
    const deliveryFee = this.data.deliveryType === 'dormitory' && productAmount < 25 ? 2 : 0;

    this.setData({
      items: cartItems.map(item => ({
        ...item,
        totalAmount: (Number(item.price) * Number(item.quantity)).toFixed(2)
      })),
      productAmount: productAmount.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      payAmount: (productAmount + deliveryFee).toFixed(2)
    });
  },

  changeDeliveryType(event) {
    this.setData({ deliveryType: event.detail.value });
    this.loadOrderPreview();
  },

  async submitOrder() {
    if (!this.data.items.length) {
      wx.showToast({ title: '订单商品为空', icon: 'none' });
      return;
    }

    if (this.data.submitting) return;

    this.setData({ submitting: true });
    try {
      const payload = {
        deliveryType: this.data.deliveryType,
        campusId: this.data.address.campusId,
        buildingId: this.data.address.buildingId,
        roomNo: this.data.address.roomNo,
        contactName: this.data.address.contactName,
        phone: this.data.address.phone,
        agentId: this.data.agent.id,
        productAmount: Number(this.data.productAmount),
        deliveryFee: Number(this.data.deliveryFee),
        payAmount: Number(this.data.payAmount),
        items: this.data.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: Number(item.price)
        }))
      };

      const result = await request({
        url: '/orders',
        method: 'POST',
        data: payload
      });

      clearCart();
      wx.showToast({ title: '订单已提交', icon: 'success' });
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/order/detail?id=${result.data.id}`
        });
      }, 500);
    } catch (error) {
      console.error('submit order failed:', error);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
