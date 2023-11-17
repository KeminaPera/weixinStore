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
   * 删除地址提示窗口
   */
  delAddressWindow: function(e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除该地址吗？',
      complete: (res) => {
        if (res.cancel) {
          console.log("取消删除")
        }
        if (res.confirm) {
          that.doDeleteAddress(id)
        }
      }
    })
  },
  /**
   * 删除地址
   */
  doDeleteAddress: function(addressId) {
    console.log('id=',addressId)
    app.http('v1/user/address/delete',{
      id: addressId,
    }, 'POST')
    .then(res => {
      if (res.code == 200) {
        this.onShow()
      }
    })
  },
  defAddressChenge: function(e) {
    var addressId=e.currentTarget.dataset.id;
    app.http('v1/user/address/defAddressChanged',{
      id:addressId
    },'POST')
    .then(
      res => {
        if (res.code == 200) {
          this.onShow()
        }
      }
    )
  },

  onLoad: function (options) {
    this.setData({
      id: 123,
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
    app.http('v1/user/address/list', {
      openid: app.globalData.openid
    })
      .then(res => {
        console.log(res)
        this.setData({
          addressList: res.data
        })
      })
       
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