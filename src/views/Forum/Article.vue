<template>
    <div class="article-read">
        <div class="article-read-main">
            <div class="article-read-main-userMessage">
                <UserHeadImage class="user-image" :userId="userId"/>
                <div class="user-message">
                    <p>用户名：{{articleMessages.ownUserName}}</p>
                    <p>
                        <span>{{articleCreateDate}}发布
                        <el-button v-show="showEdit" @click="edit" type="text">编辑</el-button>
                        </span>
                    </p>
                </div>
            </div>
            <h1 class="article-read-title">{{articleMessages.articleTitle}}</h1>
            <div class="article-read-content" v-html="compileMarkDown(articleMessages.articleContent)"></div>
            <div class="write-comment">
                <h2 class="write-comment-title">评论</h2>
                <el-input v-model="commentContent" class="write-comment-input" placeholder="输入评论..." clearable></el-input>
                <el-button v-show="sendButton" type="primary" class="write-comment-sendButton" @click="sendCommentButton">评论</el-button>
            </div>
            <Comments v-for="i in articleMessages.articleCommentPerson" :key="i.articleId" :ownUserName="articleMessages.ownUserName" :articleId="articleMessages.articleId" :commentContent="i" :deleteButton="deleteButton"/>
        </div>
    </div>
</template>

<script>
    import {findArticleWithId,sendComment,deleteComment} from '../../api/forum.js'
    import {findUserIdWithUserName} from '../../api/user.js'
    import Comments from '../../components/Comments.vue'
    import UserHeadImage from '../../components/UserHeadImage.vue'
    
    const showdown = require('showdown');
    const converter = new showdown.Converter();

    export default{
        data(){
            return{
                articleMessages:{},
                commentContent:'',
                sendButton:true,
                articleCreateDate:'',
                userId:'',
                showEdit:false
            }
        },
        mounted(){
            if(sessionStorage.getItem('userId') === null){
                this.$message({
                    type:'error',
                    message:'请先登录，谢谢'
                })
                this.$router.push('/');
            }
            findArticleWithId({articleId:this.$route.params.id}).then((res)=>{
                if(res.success){
                    this.articleMessages = res.articles[0];
                    let date = new Date(this.articleMessages.articleCreateDate);
                    this.articleCreateDate = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
                    if(this.articleMessages.ownUserName === sessionStorage.getItem('userName')){
                        this.showEdit = true;
                    }
                    findUserIdWithUserName({userName:this.articleMessages.ownUserName}).then((res)=>{
                        this.userId = res.userId;
                    }).catch((err)=>{
                        console.log('错误为'+err)
                    });
                }else{
                    this.$message({
                        type:'error',
                        message:res.message
                    })
                }
            }).catch((err)=>{
                console.log('错误为'+err)
            })
        },
        components:{Comments,UserHeadImage},
        methods:{
            compileMarkDown(value){
                return converter.makeHtml(value);
            },
            edit(){
                this.$router.push(`/main/editArticle/${this.articleMessages.articleId}`);
            },
            deleteButton(commentId,articleId){
                deleteComment({commentId,articleId}).then((res)=>{
                    this.$message({
                        type:'success',
                        message:res.message
                    });
                    this.$router.go(0);
                }).catch((err)=>{
                    this.$message({
                        type:'error',
                        message:err
                    });
                })
            },
            showSendButton(){
                this.sendButton = true;
            },
            hideSendButton(){
                this.sendButton = false;
            },
            sendCommentButton(){
                if(this.commentContent === ""){
                    this.$message({
                        type:"error",
                        message:"评论不能为空"
                    })
                }else{
                    const userId = sessionStorage.getItem('userId');
                    const userName = sessionStorage.getItem('userName');
                    const commentContent = this.commentContent;

                    sendComment({articleId:this.articleMessages.articleId,userId,userName,articleCommentContent:commentContent}).then((res)=>{
                        this.articleMessages = res.articles;
                        this.commentContent = "";
                    }).catch((err)=>{
                        console.log(`错误为${err}`)
                    })
                }
            }
        }
    }
</script>

<style lang="stylus">
.article-read
    background: rgba(178,186,194,0.15);
    padding top 20px
    .article-read-main::-webkit-scrollbar
        display: none
    .article-read-main 
        overflow :auto
        height:100%
        margin: 0 auto
        width: 700px
        background: white  
        padding: 0 20px
        .article-read-main-userMessage
            display:flex
            align-items :center
            text-align:left
            .user-image
                margin-right:8px
            .user-message
                margin:0
                p:first-child
                    margin:0
                    margin-top:20px
                    margin-bottom:8px
                p:last-child
                    margin:0
        .article-read-title
            text-align:left
        .article-read-content
            width: 700px
            text-align:left
            ul
                padding-left: 25px
            pre
                background-color: #f8f8f8
                padding: 15px 20px
        .write-comment
            height: 80px
            margin-top: 60px
            margin-bottom: 50px
            padding: 20px 30px 10px 30px
            border-top: 1px solid #e5e6eb
            text-align: left
            .write-comment-title
                margin:0
                margin-bottom:8px
            .write-comment-input
                margin-bottom: 8px
            .write-comment-sendButton
                padding: 8px 16px
</style>