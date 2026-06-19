Page({
  data: {
    cartItems: [
      { id: 1, name: '可乐 500ml', price: '3.00', quantity: 2 },
      { id: 2, name: '桶装泡面', price: '5.50', quantity: 1 }
    ],
    totalAmount: '11.50'
  },

  goConfirm() {
    wx.navigateTo({
      url: '/pages/order/confirm'
    });
  }
});
