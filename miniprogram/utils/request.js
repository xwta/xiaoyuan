const app = getApp();

function request(options) {
  const baseUrl = app.globalData.apiBaseUrl;

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        ...(options.header || {})
      },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          return;
        }

        wx.showToast({
          title: '接口请求失败',
          icon: 'none'
        });
        reject(res);
      },
      fail(error) {
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        });
        reject(error);
      }
    });
  });
}

module.exports = {
  request
};
