var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
    data:{
        title:'首页列表',
        postsList:[],
        hidden:false,
        page:1,
        tab:'all',
        pageStyle:{topBar:'top-bar-item',topBarSelet:'top-bar-item top-bar-selected'},
        topBarType:{all:'',good:'',share:'',ask:'',job:''},

    },
    onLoad:function(){
        this.setTopBarStyle();
        console.log('onLoad by topics');
        this.fetchData();
        console.log('topicsend');
       
        
    },
    onPullDownRefresh:function(){
      this.fetchData();
      console.log('下拉刷新',new Date());
    },
    onTapTag:function (e){
      var self = this;
      var tab = e.currentTarget.id;
      self.setData({
        tab:tab
      });
      this.setTopBarStyle(tab);
      if (tab !== 'all') {
        this.fetchData({tab: tab});
      } else {
        this.fetchData();
      }
    },
    fetchData:function(data){
        var self=this;
        self.setData({
          hidden:false
        });
        if(!data) data={};
        if(!data.page) data.page =1;
        if(data.page===1){
          self.setData({
            postsList:[]
          });
        }
        wx.request({
          url: api.getTopics(data),
          success: function(res){
            self.setData({
              postsList:self.data.postsList.concat(res.data.data.map(function(item){
                item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                return item;
              }))
            });
            setTimeout(function(){
              self.setData({
                hidden:true
              });
            },300);

            console.log(res);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
  redictDetail:function(e){
    var id = e.currentTarget.id;
    var url = "../detail/detail?id="+ id;
    wx.navigateTo({
      url: url
    })
  },
  lower: function (e) {
    var self = this;
    console.log('lower the view');
    self.setData({
      page: self.data.page + 1
    });
    if (self.data.tab !== 'all') {
      this.fetchData({tab: self.data.tab, page: self.data.page});
    } else {
      this.fetchData({page: self.data.page});
    }
  },
  setTopBarStyle:function(barName){
    var self = this;
    var topBarStyle = self.data.pageStyle.topBar;
    var topBarStyleSelected = self.data.pageStyle.topBarSelet;
    var topBarType={all:topBarStyle,good:topBarStyle,share:topBarStyle,ask:topBarStyle,job:topBarStyle};
      if(!barName){
        barName='all';
      }
      for(var k in topBarType){
          if(k==barName){
            topBarType[k]=topBarStyleSelected;
          }
      }
    self.setData({
      topBarType:topBarType
    });
        console.log(this.data.topBarType);
  }

});