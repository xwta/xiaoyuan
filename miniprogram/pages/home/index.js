Page({
  data: {
    products: [
      {
        id: 1,
        name: '可乐 500ml',
        description: '冰镇更爽，寝室快乐水',
        price: '3.00',
        coverUrl: '/assets/product-placeholder.png'
      },
      {
        id: 2,
        name: '桶装泡面',
        description: '夜宵刚需，别问，问就是饿了',
        price: '5.50',
        coverUrl: '/assets/product-placeholder.png'
      }
    ]
  },

  addToCart(event) {
    const productId = event.currentTarget.dataset.id;
    wx.showToast({
      title: `已加入购物车`,
      icon: 'success'
    });
    console.log('add product to cart:', productId);
  }
});
