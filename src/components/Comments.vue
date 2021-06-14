<template>
    <div>
        <div class="article-comment">
            <UserHeadImage :userId="commentContent.userId"/>
            <div class="article-comment-userMessage">
                <p class="article-comment-userTitle">{{commentContent.userName}}</p>
                <p class="article-comment-commentContent">{{commentContent.articleCommentContent}}</p>
            </div>
            <el-button class="article-comment-delete-comment" v-show="showButton" type="primary" @click="deleteButton(commentContent._id,articleId)">删除</el-button>
            
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
    margin-top: 16px
    padding: 0 60px
    display:flex
    .article-comment-userMessage
        margin-left: 10px
        width:600px
        text-align:left
        p
            font-size: 1rem
            margin:0
    .article-comment-delete-comment
        font-size:8px
        width:60px
        height:35px
        padding:5px 12px
</style>