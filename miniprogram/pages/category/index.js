Page({
  data: {
    activeCategoryId: 1,
    categories: [
      { id: 1, name: '饮料' },
      { id: 2, name: '泡面' },
      { id: 3, name: '零食' },
      { id: 4, name: '日用' }
    ],
    products: []
  },

  onLoad() {
    this.loadProducts(1);
  },

  changeCategory(event) {
    const categoryId = event.currentTarget.dataset.id;
    this.setData({ activeCategoryId: categoryId });
    this.loadProducts(categoryId);
  },

  loadProducts(categoryId) {
    const productMap = {
      1: [
        { id: 1, name: '可乐 500ml', price: '3.00', coverUrl: '/assets/product-placeholder.png', tags: ['冰饮', '热卖'] },
        { id: 2, name: '矿泉水', price: '2.00', coverUrl: '/assets/product-placeholder.png', tags: ['寝室必备'] }
      ],
      2: [
        { id: 3, name: '桶装泡面', price: '5.50', coverUrl: '/assets/product-placeholder.png', tags: ['夜宵'] }
      ],
      3: [
        { id: 4, name: '薯片', price: '6.90', coverUrl: '/assets/product-placeholder.png', tags: ['聚会'] }
      ],
      4: [
        { id: 5, name: '抽纸', price: '4.90', coverUrl: '/assets/product-placeholder.png', tags: ['刚需'] }
      ]
    };

    this.setData({ products: productMap[categoryId] || [] });
  },

  addToCart(event) {
    console.log('add to cart:', event.currentTarget.dataset.id);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  }
});
