const { request } = require('./request');

const USER_STORAGE_KEY = 'campus_snack_user';

function getStoredUser() {
  return wx.getStorageSync(USER_STORAGE_KEY) || null;
}

function saveUser(user) {
  wx.setStorageSync(USER_STORAGE_KEY, user);
}

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async (loginResult) => {
        try {
          const result = await request({
            url: '/users/login',
            method: 'POST',
            data: { code: loginResult.code }
          });
          saveUser(result.data);
          resolve(result.data);
        } catch (error) {
          reject(error);
        }
      },
      fail: reject
    });
  });
}

module.exports = {
  getStoredUser,
  saveUser,
  login
};
