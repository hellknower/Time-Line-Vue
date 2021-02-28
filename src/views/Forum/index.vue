<template>
    <div class='forumTop'>
        <div class='forum-all'>
                <el-tabs class='forum-tabs' type='card' v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for='i in forumTitile' :key='i.key' :label="i.name" :name='i.key'></el-tab-pane>
                </el-tabs>
            <div @click='toArtical(i.id)' v-for='(i,index) in forums' :key='index' class='forum-one'>
                <div class='forum-one-content'>
                    <p>
                        <span>{{i.articalAuthor}}</span>|
                        <span>{{i.articalDateMsg}}</span>|
                        <span>{{i.articalDirection}}</span>
                    </p>
                    <p>{{i.forumTitle}}</p>
                    <el-row>
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
                    </el-row>
                </div>
                <!-- <img :src='i.forumImg' alt=""> -->
            </div>
            <div @click='toAddConversation' class='forum-add'>
                <img src="../../assets/添加.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
        //差filter,按钮点击颜色立刻消失,回复点击跳转,路由重定向和过滤
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                activeName:'1',
                forumTitile:[
                    {
                        name:'前端',
                        key:'1'
                    },{
                        name:'后端',
                        key:'2'
                    },{
                        name:'移动端',
                        key:'3'
                    },{
                        name:'测试',
                        key:'4'
                    }
                ],
            }
        },
        mounted(){
            // console.log(this.$store.state)
           this.forums.map((item)=>{
                // console.log('item',item)
                this.setHours(item);
            })
        },
        computed:{
            ...mapState(['forums'])
        },
        methods:{
            buttonClick(item){
                if(item.isChoose){
                    console.log('已选中')
                    item.likeCount -= 1;
                    item.isChoose = !item.isChoose;
                }else{
                    console.log('未选中')
                    item.likeCount += 1;
                    item.isChoose = !item.isChoose;
                }
            },
            handleClick(){
                console.log('clicks')
            },
            toArtical(id){
                console.log(id)
                this.$router.push('/artical'+id)
            },
            toAddConversation(){
                this.$router.push('/addArtical')
            },
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
    }
</script>

<style>
    .forumTop{
        background:rgba(178,186,194,.15);
        padding-top:20px;
        height:100%;
    }
    .forum-all{
        background:white;
        width:748px;
        height:100%;
        margin:0 auto;
    }
    .el-tabs__header {
        margin-bottom:0!important;
    }
    .el-tabs__nav-wrap::after{
        background-color:rgb(255, 255, 255)!important;
    }
    .forum-all .forum-one{
        padding:18px 24px;
        border-top:1px solid rgba(178,186,194,.15);
        width:700px;
        height:120px;
        display:flex;
        text-align: left;
    }
    .forum-all .forum-one:nth-child(2){
        border-top:0px;
    }
    .forum-one-content p{
        color:#b2bac2;
        font-size: 15px;
        line-height: 0;
    }
    .forum-one-content p span{
        margin-left:8px;
        margin-right:8px;
    }
    .forum-one-content p span:first-child{   
        margin-left:0px;
    }
    .forum-one-content p:nth-child(2){
        color:rgb(46,49,53);
        font-size: 28px;
    }
    .el-button--default{
        margin-left:0!important;
    }
    .isClick{
        color: #409EFF!important;
        border-color: #c6e2ff!important;
        background-color: #ecf5ff!important;  
    }
    
    .forum-add{
        position:fixed;
        top:90%;
        right:3%;
        cursor: pointer;
    }
    .forum-add img{
        height:50px;
    }
    .forum-one img{
        border:1px solid red;
        float:right;
        right:0;
        /* position:absolute; */
        /* opacity: 0; */
        /* filter:blur(2px)  */
    }
</style>