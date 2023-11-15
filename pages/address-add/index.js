// pages/addressAdd/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    name:'',
    mobile:'',
    province: '',
    city: '',
    area: '',
    addr:'',
    defaultAddr: false,
    addressIs:true,
    _id:null
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      area: e.detail.value[2],
    })
  },
  bindKeyName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindKeyMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  bindKeyDetailed: function (e) {
    this.setData({
      addr: e.detail.value
    })
  },
  bindKeyDefaultAddr: function(e) {
    this.setData({
      defaultAddr: e.detail.value
    })
  },
  submitFun: function () {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none'
      })
      return;
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return;
    }
    var regexp = /^[1]([3-9])[0-9]{9}$/;
    if(!regexp.test(this.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return;
    }
    if(!this.data.addr) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return;
    }
    console.log('this.data.addressIs=', this.data.addressIs)
    if (this.data.addressIs){ //添加
      app.http('v1/user/addAddress', {
        name: this.data.name,
        mobile: this.data.mobile,
        province: this.data.province,
        city: this.data.city,
        area: this.data.area,
        addr: this.data.addr,
        defaultAddr: this.data.defaultAddr
      }, 'POST')
        .then(res => {
          if (res.code == 200) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
    }else{
      app.http('v1/user/editAddress', {
        id: this.data._id,
        name: this.data.name,
        mobile: this.data.mobile,
        province: this.data.province,
        city: this.data.city,
        area: this.data.area,
        addr: this.data.addr,
        defaultAddr: this.data.defaultAddr
      }, 'POST')
        .then(res => {
          if (res.code == 200) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
          region: options.city.split(','),
          name: options.name,
          mobile: options.mobile,
          addr: options.addr,
          _id: options.id,
          addressIs:false
      })
    }
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