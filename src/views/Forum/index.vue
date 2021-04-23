<template>
    <div class='forumTop'>
        <div class='forum-all'>
                <el-tabs class='forum-tabs' type='card' v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane 
                        v-for='i in forumTitile' 
                        :key='i.typeValue' 
                        :label="i.typeName" 
                        :name='i.typeValue'
                    >
                        <ArticleList v-for="articleMessage in articleMessages" :key="articleMessage.articleId" :articleMessage="articleMessage"/>
                        <!-- <ArticleList/> -->
                    </el-tab-pane>
                </el-tabs>
            <div @click='toAddConversation' class='forum-add'>
                <img src="../../assets/添加.png" alt="">
            </div>
            <!--创建数据库-->
        </div>
    </div>
</template>

<script>
        //差filter,按钮点击颜色立刻消失,回复点击跳转,路由重定向和过滤
    // import { mapState } from 'vuex'
    import { findArticleType } from '../../api/api.js'
    import ArticleList from '../../components/ArticleList'
    import {findArticleWithType} from '../../api/forum'

    export default {
        data(){
            return {
                activeName:'SYPQ',
                forumTitile:[],
                articleMessages:[]
            }
        },
        mounted(){
            findArticleType({}).then((res)=>{   //请求文章类型
                if(res.success){
                    this.forumTitile = res.returnType;
                }else{
                    console.log(res.message);
                }
            });
            this.tabClick(this.activeName);
        },
        components:{ArticleList},
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
            tabClick(val){
                let value = val.name||val;
                
                findArticleWithType({typeValue:value}).then((res)=>{
                    if(res.success){
                        this.articleMessages = res.articles;
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

<style lang="stylus">
    .forumTop
        background:rgba(178,186,194,.15);
        padding-top:20px;
        height:100%;
        .forum-all
            background:white;
            width:748px;
            height:100%;
            margin:0 auto;
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
            .forum-add
                position:fixed;
                top:90%;
                right:3%;
                cursor: pointer;
                img
                    height:50px;
            .el-tabs__header
                margin-bottom:0!important;
            .el-tabs__nav-wrap::after
                background-color:rgb(255, 255, 255)!important;
            .el-button--default
                margin-left:0!important;
</style>