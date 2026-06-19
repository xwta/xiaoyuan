Page({
  data: {
    deliveryType: 'dormitory',
    address: {
      campusName: '第一校区',
      buildingName: '6号宿舍楼',
      roomNo: '602',
      phone: '13800000000'
    },
    agent: {
      id: 1,
      name: '6号楼校园代理点',
      pickupAddress: '6号楼一楼大厅旁'
    },
    items: [
      { id: 1, name: '可乐 500ml', quantity: 2, totalAmount: '6.00' },
      { id: 2, name: '桶装泡面', quantity: 1, totalAmount: '5.50' }
    ],
    payAmount: '11.50'
  },

  changeDeliveryType(event) {
    this.setData({
      deliveryType: event.detail.value
    });
  },

  submitOrder() {
    wx.showToast({
      title: '订单已提交',
      icon: 'success'
    });
  }
});
