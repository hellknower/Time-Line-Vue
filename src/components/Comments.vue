<template>
    <div>
        <div class="article-comment">
            <div class="article-comment-userImage">
                <img src="../assets/data.png" alt="">
            </div>
            <div class="article-comment-userMessage">
                <p class="article-comment-userTitle">{{commentContent.userName}}</p>
                <p class="article-comment-commentContent">{{commentContent.articleCommentContent}}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return{
        }
    },
    props:['commentContent'],
    methods:{
    },
    mounted() {
        console.log(this.commentContent)
    },
}
</script>

<style lang="stylus">
.article-comment
    padding: 0 60px
    display:flex
    .article-comment-userImage
        margin: 0 10px 10px 10px
        img
            width: 32px
            height: 32px
            border-radius: 50%
            border:1px solid black
            overflow:hidden
    .article-comment-userMessage
        p
            font-size: 1rem
            margin:0
</style>