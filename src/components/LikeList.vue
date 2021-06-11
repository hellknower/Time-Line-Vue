<template>
    <div class="like-list">
        <el-button class="like-button" v-show="showLikeButton" size="default" @click="likeButton">点赞 </el-button>
        <el-button class="dislike-button" v-show="!showLikeButton" size="default" @click="dislikeButton">取消点赞</el-button>
        <el-button class="collect-button" v-show="showCollectButton" size="default" @click="collectButton">收藏</el-button>  
        <el-button class="discollect-button" v-show="!showCollectButton" size="default" @click="discollectButton">取消收藏</el-button>
    </div>    
</template>

<script>
import {likeArticle,dislikeArticle,collectArticle,discollectArticle} from '../api/forum.js';
import {getLikeAndCollect} from '../api/user.js'

export default {
    data(){
        return{
            showLikeButton:true,
            showCollectButton:true,
            userCollect:[],
            userLikes:[],
            userId:''
        }
    },
    mounted(){
        this.userId = sessionStorage.getItem('userId');
        let userId = this.userId;

        getLikeAndCollect({userId}).then((res)=>{
            this.userLikes = res.userLikes;
            this.userCollect = res.userCollect;
            for(let item of this.userLikes){
                if(item === this.articleId){
                    this.showLikeButton = false;
                }
            }
            for(let item of this.userCollect){
                if(item === this.articleId){
                    this.showCollectButton = false;
                }
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    props:['articleId'],
    methods:{
        likeButton(){
            let articleId = this.articleId;
            let userId = this.userId;

            likeArticle({articleId,userId}).then((res)=>{
                if(res.success){
                    this.showLikeButton = !this.showLikeButton;
                }else{
                    console.log(res.message);
                }
            }).catch((err)=>{
                console.log(err)
            });
        },
        collectButton(){
            let articleId = this.articleId;
            let userId = this.userId;

            collectArticle({articleId,userId}).then((res)=>{
                if(res.success){
                    this.showCollectButton = !this.showCollectButton
                }else{
                    console.log(res.message);
                }
            }).catch((err)=>{
                console.log(err)
            });
        },
        dislikeButton(){
            let articleId = this.articleId;
            let userId = this.userId;

            dislikeArticle({articleId,userId}).then((res)=>{
                if(res.success){
                    this.showLikeButton = !this.showLikeButton;
                }else{
                    console.log(res.message);
                }
            }).catch((err)=>{
                console.log(err)
            });
        },
        discollectButton(){
            let articleId = this.articleId;
            let userId = this.userId;

            discollectArticle({articleId,userId}).then((res)=>{
                if(res.success){
                    this.showCollectButton = !this.showCollectButton
                }else{
                    console.log(res.message);
                }
            }).catch((err)=>{
                console.log(err)
            });

        }
    },
}
</script>

<style lang="stylus">
.like-list
    .like-button
        margin-right:8px
    .dislike-button
        margin-right:8px
</style>