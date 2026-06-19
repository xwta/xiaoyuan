Page({
  data: {
    orders: [
      {
        id: 1,
        orderNo: 'SN202606190001',
        statusText: '待接单',
        deliveryText: '送到寝室',
        buildingName: '6号楼',
        roomNo: '602',
        payAmount: '18.50'
      },
      {
        id: 2,
        orderNo: 'SN202606190002',
        statusText: '待核销',
        deliveryText: '代理点自提',
        buildingName: '6号楼',
        roomNo: '',
        payAmount: '9.90'
      }
    ]
  },

  acceptOrder(event) {
    console.log('accept order:', event.currentTarget.dataset.id);
    wx.showToast({ title: '已接单', icon: 'success' });
  },

  completeOrder(event) {
    console.log('complete order:', event.currentTarget.dataset.id);
    wx.showToast({ title: '订单完成', icon: 'success' });
  }
});
