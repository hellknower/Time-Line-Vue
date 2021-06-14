<template>
    <div class='admin-forum-one'>
        <div class='admin-forum-one-content'>
            <div class="admin-forum-one-content-top" @click='toArticle(articleMessage.articleId)'>
                <p class="admin-article-list-message">
                    <span>{{articleMessage.ownUserName}}</span>|
                    <span>{{countDate}}</span>|
                    <span>{{articleMessage.articleType}}</span>
                </p>
                <p class="admin-article-list-title">{{articleMessage.articleTitle}}</p>
                <p class="admin-article-list-reExaminedMessage" v-show="articleMessage.reExaminedMessage">已审核 问题为：{{articleMessage.reExaminedMessage}}{{articleMessage.reExaminedMessage}}</p>
                <p class="admin-article-list-reExaminedMessage" v-show="!articleMessage.reExaminedMessage">未审核</p>
            </div>
        </div>
    </div>
</template>

<script>

export default({
    data(){
        return {
            countDate:'' ,        
        }
    },
    props:['articleMessage'],
    mounted(){
        let { articleCreateDate } = this.articleMessage;
        let date = new Date(articleCreateDate);
        this.setHours(date);
    },
    methods:{
        toArticle(id){
            this.$router.push(`/main/adminArticle/${id}`);
        },
        setHours(date){
            let now = new Date();
            
            if(now.getFullYear() !== date.getFullYear()){
                let year = now.getFullYear() - date.getFullYear(); 
                this.countDate = `${year}年前`;
            }else if(now.getMonth() !== date.getMonth()){
                let month = now.getMonth() - date.getMonth(); 
                this.countDate = `${month}个月前`;
            }else if(now.getDate() !== date.getDate()){
                let day = now.getDate() - date.getDate();

                if(day > 7){
                    this.countDate = `${day%7}周前`;
                }else{
                    this.countDate = `${day}天前`;
                }
            }else{
                this.countDate = '今天发布';
            }
            //一周以内但是跨月份的情况未能考虑
            
        }
    }
})
</script>

<style lang="stylus">
.admin-forum-one
    padding:18px 24px;
    border-top:1px solid rgba(178,186,194,.15);
    width:700px;
    height:100px;
    display:flex;
    text-align: left;
    .admin-forum-one-content
        .admin-forum-one-content-top
            .admin-article-list-message
                color:#b2bac2;
                font-size: 15px;
                line-height: 0;
                span
                    margin-left:8px;
                    margin-right:8px;
                span:first-child 
                    margin-left:0px;

            .admin-article-list-title
                line-height: 8px;
                color:rgb(46,49,53);
                font-size: 24px;
                font-weight:600
                font-font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial
            .admin-isClick
                color: #409EFF!important;
                border-color: #c6e2ff!important;
                background-color: #ecf5ff!important;          
.admin-forum-one:nth-child(2)
    border-top:0px;
</style>