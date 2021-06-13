<template>
    <div class="article-read">
        <div class="article-read-main">
            <div class="article-read-main-userMessage">
                <UserHeadImage :userId="userId"/>
                <div>
                    <p>{{articleMessages.ownUserName}}</p>
                    <p><span>{{articleCreateDate}}</span></p>
                </div>
                <el-button v-show="showEdit" @click="edit">编辑</el-button>
            </div>
            <h1 class="article-read-title">{{articleMessages.articleTitle}}</h1>
            <div class="article-read-content" v-html="compileMarkDown(articleMessages.articleContent)"></div>
            <div class="write-comment">
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
                const userId = sessionStorage.getItem('userId');
                const userName = sessionStorage.getItem('userName');
                const commentContent = this.commentContent;

                sendComment({articleId:this.articleMessages.articleId,userId,userName,articleCommentContent:commentContent}).then((res)=>{
                    this.articleMessages = res.articles;
                }).catch((err)=>{
                    console.log(`错误为${err}`)
                })
            }
        }
    }
</script>

<style lang="stylus">
.article-read
    background: rgba(178,186,194,0.15);
    padding-top:20px
    .article-read-main 
        height:100%
        margin: 0 auto
        width: 640px
        background: white  
        padding: 0 20px
        .article-read-main-userMessage
            display:flex
            text-align:left
        .article-read-title
            text-align:left
        .article-read-content
            width: 640px
            height:100%
            text-align:left
            ul
                padding-left: 25px
            pre
                background-color: #f8f8f8
                padding: 15px 20px
        .write-comment
            height: 80px
            margin-top: 60px
            padding: 30px 30px 10px 30px
            border-top: 1px solid #e5e6eb
            text-align: right
            .write-comment-input
                margin-bottom: 8px
            .write-comment-sendButton
                padding: 8px 16px
</style>