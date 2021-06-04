<template>
    <div class='forum-one' @click='toArtical(articleMessage.articleId)'>
        <div class='forum-one-content'>
            <p class="article-list-message">
                <span>{{articleMessage.ownUserName}}</span>|
                <span>{{countDate}}</span>|
                <span>{{articleMessage.articleType}}</span>
            </p>
            <p class="article-list-title">{{articleMessage.articleTitle}}</p>
            <p class="article-list-content"></p>
            <!-- <el-row>
                <el-button 
                    :class='{isClick:i.articalLike.isChoose}'
                    icon="el-icon-thumb" size="small"
                    @click.stop='buttonClick(i.articalLike)'
                >
                    {{i.articalLike.likeCount}}
                </el-button>
                <el-button icon='el-icon-chat-round' size="small">
                    {{i.articalComment}}
                </el-button>
            </el-row> -->
        </div>
    </div>
</template>

<script>
export default({
    data(){
        return {
            countDate:''            
        }
    },
    props:['articleMessage'],
    mounted(){
        let { articleCreateDate } = this.articleMessage;
        // let { articleContent } = this.articleMessage;
        // let reg = /^[\u4e00-\u9fa5a-zA-Z*-_]{1,20}$/;
        // console.log('a',articleContent.match(reg))
        // console.log(articleContent)
        let date = new Date(articleCreateDate);
        this.setHours(date);
    },
    methods:{
        toArtical(id){
            this.$router.push(`/main/artical/${id}`);
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
.forum-one
    padding:18px 24px;
    border-top:1px solid rgba(178,186,194,.15);
    width:700px;
    height:120px;
    display:flex;
    text-align: left;
    .forum-one-content
        .article-list-message
            color:#b2bac2;
            font-size: 15px;
            line-height: 0;
            span
                margin-left:8px;
                margin-right:8px;
            span:first-child 
                margin-left:0px;
        .article-list-title
            line-height: 8px;
            color:rgb(46,49,53);
            font-size: 24px;
            font-weight:600
            font-font-family: -apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial
        .isClick
            color: #409EFF!important;
            border-color: #c6e2ff!important;
            background-color: #ecf5ff!important;          
.forum-one:nth-child(2)
    border-top:0px;
</style>