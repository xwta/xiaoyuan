Page({
  data: {
    addresses: [
      {
        id: 1,
        campusName: '第一校区',
        buildingName: '6号楼',
        roomNo: '602',
        contactName: '张同学',
        phone: '13800000000',
        isDefault: true
      }
    ]
  },

  goEdit() {
    wx.navigateTo({
      url: '/pages/address/edit'
    });
  }
});
