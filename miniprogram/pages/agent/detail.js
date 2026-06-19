Page({
  data: {
    order: {
      id: 1,
      statusText: '待接单',
      deliveryText: '送到寝室',
      contactName: '张同学',
      phone: '13800000000',
      addressText: '第一校区 6号楼 602',
      items: [
        { id: 1, name: '可乐 500ml', quantity: 2, totalAmount: '6.00' },
        { id: 2, name: '桶装泡面', quantity: 1, totalAmount: '5.50' }
      ]
    }
  },

  onLoad(options) {
    console.log('load agent order:', options.id);
  },

  acceptOrder() {
    wx.showToast({ title: '已接单', icon: 'success' });
  },

  completeOrder() {
    wx.showToast({ title: '订单完成', icon: 'success' });
  }
});
