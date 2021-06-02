<template>
    <div class="article-read">
        <div class="article-read-main">
            <div>
                <div></div>
                <div>
                    <p></p>
                </div>
            </div>
            <div class="article-read-content" v-html="compileMarkDown(articleMessages.articleContent)"></div>
        </div>
        
    </div>
</template>

<script>
    import {findArticleWithId} from '../../api/forum.js'
    
    const showdown = require('showdown');
    const converter = new showdown.Converter();

    export default{
        data(){
            return{
                articleMessages:{},
            }
        },
        mounted(){
            findArticleWithId({articleId:this.$route.params.id}).then((res)=>{
                if(res.success){
                    this.articleMessages = res.articles[0];
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
        }
    }
</script>

<style lang="stylus">
.article-read
    background: rgba(178,186,194,0.15);
    padding-top:8px
    .article-read-main 
        height:100%
        margin: 0 auto
        width: 640px
        background: white  
        padding: 0 20px
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