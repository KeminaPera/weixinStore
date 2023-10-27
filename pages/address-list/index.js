// pages/addressList/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:'',
    state:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  defaultFun:function(data){
    app.http('v1/user/defaultCity', {
      id: data.currentTarget.dataset.item._id
    }, 'POST')
      .then(res => {
        app.globalData.userInfo.address = res.data
        this.setData({
          id: res.data._id
        })
        if (this.data.state == 1){
          wx.navigateBack({
            delta: 1
          })
        }
      })
  },
  onLoad: function (options) {
    this.setData({
      //id: app.globalData.userInfo.address._id,
      id: 123,
      //state: options ? options.type:null
      state:null
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    list: [{"id":"1","mobile":"13759736354","name":"zhangsan","city":["北京市","北京市","昌平区"],"detailed":"详细地址信息"}]
    /**
    app.http('v1/user/cityList', {
      openid: app.globalData.openid
    })
      .then(res => {
        this.setData({
          //list: res.data
          list: [{"mobile":"13759736354","name":"zhangsan","city":["北京市","北京市","昌平区"],"detailed":"详细地址信息"}]
        })
      })
       */
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})