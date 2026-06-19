Page({
  data: {
    order: {
      id: 1,
      orderNo: 'SN202606190001',
      statusText: '待接单',
      deliveryText: '送到寝室',
      contactName: '张同学',
      phone: '13800000000',
      addressText: '第一校区 6号楼 602',
      verifyCode: '',
      productAmount: '11.50',
      deliveryFee: '0.00',
      payAmount: '11.50',
      items: [
        { id: 1, name: '可乐 500ml', quantity: 2, totalAmount: '6.00' },
        { id: 2, name: '桶装泡面', quantity: 1, totalAmount: '5.50' }
      ]
    }
  },

  onLoad(options) {
    console.log('load order detail:', options.id);
  }
});
