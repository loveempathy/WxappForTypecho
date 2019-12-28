const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    mClass: {
      type: String
    }, 
	mStyle: {
      type: String
    }, 
    isCustom: {
      type: [Boolean, String]
    },
    isBack: {
      type: [Boolean, String]
    },
    bgImage: {
      type: String
    },
	opacity: {
	  type: String
	},
	tspy: {
	  type: Boolean,
	  value:true
	},
	isNav:{
	  type: Boolean,
	  value:false
	},
	search:{
		type: Boolean
	},
	bg:{
		type:String
	}
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.system.StatusBar,
    CustomBar: app.system.CustomBar,
    Custom: app.system.Custom,
	top_width:wx.getMenuButtonBoundingClientRect().left,
	top_height:wx.getMenuButtonBoundingClientRect().height
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})