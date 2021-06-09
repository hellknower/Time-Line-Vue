import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forums:[
        {
            articleAuthor:'a',      //作者
            articleLike:{
              likeCount:12,         //点赞数
              isChoose:true         //是否点击
            },
            articleComment:0,       //被评论数
            articleCommentContent:{ //评论内容

            },
            articleDate:new Date(), //发布时间
            articleDateMsg:'',      //从发布到现在的时间
            articleDirection:'前端',//文章方向
            id:1,                   //作者id
            forumImg:require("../assets/bg.jpg"),//文章图片
            forumTitle:'aaaa',      //文章标题
            forumContent:'',        //文章内容
                                  
        },
        {
          articleAuthor:'b',
          articleLike:{
            likeCount:435,
            isChoose:false
          },
          articleComment:0,
          articleDate:new Date(),
          articleDateMsg:'',
          articleDirection:'前端',
          id:2,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'bbbbbb',
          forumContent:'content',
        },
        {
          articleAuthor:'c',
          articleLike:{
            likeCount:65,
            isChoose:true
          },
          articleComment:0,
          articleDate:new Date(),
          articleDateMsg:'',
          articleDirection:'前端',
          id:3,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'cccccccccc',
          forumContent:'content',
        },
        {
          articleAuthor:'d',
          articleLike:{
            likeCount:7878,
            isChoose:true
          },
          articleComment:0,
          articleDate:new Date(),
          articleDateMsg:'',
          articleDirection:'前端',
          id:4,
          forumImg:require("../assets/bg.jpg"),
          forumTitle:'ddddddddddd',
          forumContent:'content',
        },
    ]
  },
  mutations: {
    addarticle(state,newArticle){
      state.forums.push(newArticle);
    }
  },
  actions: {
    addArticle(item,article){
      item.commit('addarticle',article);
    }
  },
  modules: {
    user
  }
})
