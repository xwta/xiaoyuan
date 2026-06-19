const { request } = require('../../utils/request');

Page({
  data: {
    userId: 1,
    submitting: false,
    form: {
      campusId: 1,
      campusName: '',
      buildingId: 1,
      buildingName: '',
      roomNo: '',
      contactName: '',
      phone: '',
      isDefault: true
    }
  },

  handleInput(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [`form.${field}`]: event.detail.value
    });
  },

  async submitAddress() {
    const { campusName, buildingName, roomNo, contactName, phone } = this.data.form;
    if (!campusName || !buildingName || !roomNo || !contactName || !phone) {
      wx.showToast({ title: '请完善地址信息', icon: 'none' });
      return;
    }

    if (this.data.submitting) return;
    this.setData({ submitting: true });

    try {
      await request({
        url: `/users/${this.data.userId}/addresses`,
        method: 'POST',
        data: this.data.form
      });
      wx.showToast({ title: '保存成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 500);
    } catch (error) {
      console.error('save address failed:', error);
    } finally {
      this.setData({ submitting: false });
    }
  }
});
