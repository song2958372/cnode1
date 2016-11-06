'use strict'
var HOST_URL ='https://cnodejs.org/api/v1';

var GET_TOPICS = '/topics';
var GET_TOPICS_BY_ID = '/topic/';

function obj2uri(obj){
    return Object.keys(obj).map(function(k){
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}
module.exports={
    //获取列表数据
    getTopics:function(obj){
        return HOST_URL+GET_TOPICS+'?'+obj2uri(obj);
    },
    //获取内容数据
    getTopicByID:function(id,obj){
        return HOST_URL+GET_TOPICS_BY_ID+id+'?'+obj2uri(obj);
    }
};
