Page({
  data: {
    code: ''
  },

  handleInput(event) {
    this.setData({ code: event.detail.value });
  },

  submitCode() {
    if (!this.data.code) {
      wx.showToast({ title: '请输入取货码', icon: 'none' });
      return;
    }

    wx.showToast({ title: '操作成功', icon: 'success' });
    this.setData({ code: '' });
  }
});
