Page({
  data: {
    form: {
      campusName: '',
      buildingName: '',
      roomNo: '',
      contactName: '',
      phone: ''
    }
  },

  handleInput(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: event.detail.value
    });
  },

  submitAddress() {
    const { campusName, buildingName, roomNo, contactName, phone } = this.data.form;
    if (!campusName || !buildingName || !roomNo || !contactName || !phone) {
      wx.showToast({ title: '请完善地址信息', icon: 'none' });
      return;
    }

    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 500);
  }
});
