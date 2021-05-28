<template>
    <div>
        <!-- {{articleMessage}} -->
        <!-- <div @click='toArtical(i.id)' v-for='(i,index) in forums' :key='index' class='forum-one'> -->
        <div class='forum-one'>
            <div class='forum-one-content'>
                <p>
                    <span>{{articleMessage.ownUserName}}</span>|
                    <span>{{countDate}}</span>|
                    <span>{{articleMessage.articleType}}</span>
                </p>
                <p>{{articleMessage.articleTitle}}</p>
                <p ></p>
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
            countDate:''            
        }
    },
    props:['articleMessage'],
    mounted(){
        console.log(this.articleMessage)
        let { articleCreateDate } = this.articleMessage;
        let date = new Date(articleCreateDate);
        this.setHours(date);
    },
    methods:{
        setHours(date){
            let now = new Date();
            
            if(now.getFullYear() !== date.getFullYear()){
                let year = now.getFullYear() - date.getFullYear(); 
                // console.log(`${year}年前`)
                this.countDate = `${year}年前`;
            }else if(now.getMonth() !== date.getMonth()){
                let month = now.getMonth() - date.getMonth(); 
                // console.log(`${month}个月前`)
                this.countDate = `${month}个月前`;
            }else if(now.getDate() !== date.getDate()){
                let day = now.getDate() - date.getDate();

                if(day > 7){
                    // console.log(`${day%7}周前`);
                    this.countDate = `${day%7}周前`;
                }else{
                    // console.log(`${day}天前`);
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