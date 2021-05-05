<template>
    <div>
        <!-- {{articleMessage}} -->
        <!-- <div @click='toArtical(i.id)' v-for='(i,index) in forums' :key='index' class='forum-one'> -->
        <div class='forum-one'>
            <div class='forum-one-content'>
                <p>
                    <span>
                        <span>{{articleMessage.articleAuthor}}</span>|
                        <span>{{articleMessage.articleDateMsg}}</span>
                    </span>
                    <span>{{articleMessage.articleType}}</span>
                </p>
                <p>{{articleMessage.articleTitle}}</p>
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
    </div>
</template>

<script>
export default({
    data(){
        return {
    // articleLikeCount: 0,
    // articleCollectCount: 0,
    // articleCommentCount: 0,
    // articleCreateDate: 2021-04-23T06:31:09.135Z,
    // _id: 608269c9212a030b641dada3,
    // articleId: 'a866e8864708f89bac977387aeb47eb362b1f20b1619159497925',
    // articleTitle: "d'f'g",
    // articleContent: '的风格',
    // articleType: 'SYPH',
    // articleLikePerson: [],
    // articleCollectPerson: [],
    // articleCommentPerson: [],
            
        }
    },
    props:['articleMessage'],
    mounted(){
        let { articleCreateDate } = this.articleMessage;
        let date = new Date(articleCreateDate);
        console.log('1',date)

        // console.log(this.articleMessage)
        // console.log(articleCreateDate.getHours())
        // console.log('a',this.articleMessage)
    },
    methods:{
        setHours(item){
            let date = new Date();

            if((date.getHours()-item.articalDate.getHours())<1){
                item.articalDateMsg = '刚刚'
                // console.log('刚刚')
            }else
            if((date.getHours()-item.articalDate.getHours())>1 && (date.getHours()-item.articalDate.getHours())<24){
                
                item.articalDateMsg = date.getHours()-item.articalDate.getHours();
                console.log('24小时内')
            }else
            if((date.getDay()-item.articalDate.getDay())>1 && (date.getDay()-item.articalDate.getDay())<7){
                
                item.articalDateMsg = date.getDay()-item.articalDate.getDay();
                console.log('1周内')
            }else
            if((date.getDay()-item.articalDate.getDay())>7 && (date.getDay()-item.articalDate.getDay())<30){
                
                item.articalDateMsg = date.getDay()-item.articalDate.getDay();
                console.log('1月内')
            }else
            if((date.getMonth()-item.articalDate.getMonth())>1 && (date.getMonth()-item.articalDate.getMonth())<12){
                
                item.articalDateMsg = date.getMonth()-item.articalDate.getMonth();
                console.log('1年内')
            }else
            if((date.getFullYear()-item.articalDate.getFullYear())>1){
                
                item.articalDateMsg = date.getFullYear()-item.articalDate.getFullYear();
                console.log('几年内')
            }
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
        p
            color:#b2bac2;
            font-size: 15px;
            line-height: 0;
            span
                margin-left:8px;
                margin-right:8px;
            span:first-child 
                margin-left:0px;
        p:nth-child(2)
            color:rgb(46,49,53);
            font-size: 28px;          
        .isClick
            color: #409EFF!important;
            border-color: #c6e2ff!important;
            background-color: #ecf5ff!important;          
.forum-one:nth-child(2)
    border-top:0px;
</style>