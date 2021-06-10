<template>
    <div>
        <div class="article-comment">
            <UserHeadImage :userId="commentContent.userId"/>
            <div class="article-comment-userMessage">
                <p class="article-comment-userTitle">{{commentContent.userName}}</p>
                <p class="article-comment-commentContent">{{commentContent.articleCommentContent}}</p>
            </div>
            <el-button v-show="showButton" type="primary" size="default" @click="deleteButton(commentContent._id,articleId)">删除</el-button>
            
        </div>
    </div>
</template>

<script>
import UserHeadImage from '../components/UserHeadImage.vue'

export default{
    data(){
        return{
            userName:'',
            showButton:false,
        }
    },
    props:['articleId','commentContent','deleteButton','ownUserName'],
    components:{UserHeadImage},
    methods:{
    },
    mounted() {
        this.userName = sessionStorage.getItem('userName');

        if(this.userName === this.commentContent.userName){
            this.showButton = true;
        }
        if(this.ownUserName === sessionStorage.getItem('userName')){
            this.showButton = true;
        }
    },
}
</script>

<style lang="stylus">
.article-comment
    padding: 0 60px
    display:flex
    .article-comment-userImage
        margin: 0 10px 10px 10px
    .article-comment-userMessage
        text-align:left
        p
            font-size: 1rem
            margin:0
</style>