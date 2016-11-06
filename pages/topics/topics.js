var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
    data:{
        title:'首页列表',
        postsList:[],
        hidden:false,
        page:1,
        tab:'all'
    },
    onLoad:function(){
        console.log('onLoad by topics');
        this.fetchData();
        console.log('topicsend');
    },
    onPullDownRefresh:function(){
      this.fetchData();
      console.log('下拉刷新',new Date());
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
    }

});