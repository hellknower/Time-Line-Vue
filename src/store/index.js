import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forums:[
        {
            articalAuthor:'a',      //作者
            articalLike:{
              likeCount:12,         //点赞数
              isChoose:true         //是否点击
            },
            articalComment:0,       //被评论数
            articalCommentContent:{ //评论内容

            },
            articalDate:new Date(), //发布时间
            articalDateMsg:'',      //从发布到现在的时间
            articalDirection:'前端',//文章方向
            id:1,                   //作者id
            forumImg:require("../assets/bg.jpg"),//文章图片
            forumTitle:'aaaa',      //文章标题
            forumContent:'',        //文章内容
                                  
        },
        {
          articalAuthor:'b',
          articalLike:{
            likeCount:435,
            isChoose:false
          },
          articalComment:0,
          articalDate:new Date(),
          articalDateMsg:'',
          articalDirection:'前端',
          id:2,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'bbbbbb',
          forumContent:'content',
        },
        {
          articalAuthor:'c',
          articalLike:{
            likeCount:65,
            isChoose:true
          },
          articalComment:0,
          articalDate:new Date(),
          articalDateMsg:'',
          articalDirection:'前端',
          id:3,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'cccccccccc',
          forumContent:'content',
        },
        {
          articalAuthor:'d',
          articalLike:{
            likeCount:7878,
            isChoose:true
          },
          articalComment:0,
          articalDate:new Date(),
          articalDateMsg:'',
          articalDirection:'前端',
          id:4,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'ddddddddddd',
          forumContent:'content',
        },
    ]
  },
  mutations: {
    addartical(state,newArtical){
      state.forums.push(newArtical);
    }
  },
  actions: {
    addArtical(item,artical){
      item.commit('addartical',artical);
    }
  },
  modules: {
    user
  }
})
