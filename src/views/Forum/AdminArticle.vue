<template>
    <div class="article-read">
        <div class="article-read-main">
            <div class="article-read-main-userMessage">
                <div>
                    <p>{{articleMessages.ownUserName}}</p>
                    <p><span>{{articleCreateDate}}</span></p>
                </div>
            </div>
            <h1 class="article-read-title">{{articleMessages.articleTitle}}</h1>
            <div class="article-read-content" v-html="compileMarkDown(articleMessages.articleContent)"></div>
            <el-button type="primary" size="default" @click="reExaminedSuccess">审核通过</el-button>
            
        </div>
    </div>
</template>

<script>
    import {findArticleWithId,reExamined} from '../../api/forum.js'
    import {findUserIdWithUserName} from '../../api/user.js'
    
    const showdown = require('showdown');
    const converter = new showdown.Converter();

    export default{
        data(){
            return{
                articleMessages:{},
                articleCreateDate:'',
                userId:'',
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
        methods:{
            compileMarkDown(value){
                return converter.makeHtml(value);
            },
            reExaminedSuccess(){
                console.log('reExamined')
                reExamined({articleId:this.$route.params.id}).then((res)=>{
                    if(res.success){
                        this.$message({
                            type:'success',
                            message:'审核成功'
                        })
                        this.$router.push('/main/adminIndex');
                    }else{                        
                        this.$message({
                            type:'error',
                            message:'审核失败'
                        })
                    }
                }).catch((err)=>{
                    console.log(err)
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
</style>