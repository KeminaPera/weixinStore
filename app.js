//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.http('v1/wx/getUser', { code:res.code}).then(res=>{
          const app = getApp()
          app.globalData.openid = res.data.openid
          app.globalData.userInfo = res.data
          if (!res.data.mobile) {
            wx.reLaunch({
              url: "/pages/bindPhone/index"
            });
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  http: function (url, data='', method="GET") { //封装http请求
    const apiUrl = 'http://172.20.10.7:8080/' //请求域名
    console.log(this.globalData)
    const currency = {
      openid: this.globalData.openid
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: Object.assign(currency,data),
        method: method,
        success: function (res) {
          if(res.data.code != 200){
            wx.showModal({
              title: '提示',
              content: res.data.message,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          resolve(res.data)
        },
        fail: function (res) {
          reject(res);
        },
        complete: function () {
          console.log('complete');
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    openid:null
  }
})