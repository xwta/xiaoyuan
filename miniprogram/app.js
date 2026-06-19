const { getEnvConfig } = require('./config/env');

App({
  globalData: {
    apiBaseUrl: getEnvConfig().apiBaseUrl,
    userInfo: null,
    campus: null
  },

  onLaunch() {
    console.log('校园零食小程序启动');
    console.log('当前接口地址:', this.globalData.apiBaseUrl);
  }
});
