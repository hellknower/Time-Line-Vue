<template>
    <div class='forumTop'>
        <div class='forum-all'>
            <el-tabs class='forum-tabs' type='card' v-model="activeName" @tab-click="tabClick">
                <!-- <keep-alive> -->
                <el-tab-pane 
                    v-for='i in forumTitile' 
                    :key='i.typeValue' 
                    :label="i.typeName"
                    :name='i.typeValue'
                />
                <AdminArticleList v-for="articleMessage in articleMessages" v-show="!articleMessage.reExamined" :key="articleMessage.articleId" :articleMessage="articleMessage"/>
            </el-tabs>
        </div>
    </div>
</template>

<script>
        //差filter,按钮点击颜色立刻消失,回复点击跳转,路由重定向和过滤
    import AdminArticleList from '../../components/AdminArticleList'
    import { findArticleType } from '../../api/api.js'
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
            if(sessionStorage.getItem('userId') === null){
                this.$message({
                    type:'error',
                    message:'请先登录，谢谢'
                })
                this.$router.push('/');
            }
            findArticleType({}).then((res)=>{   //请求文章类型
                if(res.success){
                    this.forumTitile = res.returnType;
                }else{
                    console.log(res.message);
                }
            });
            this.tabClick(this.activeName);
        },
        components:{AdminArticleList},
        methods:{
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

        }
    }
</script>

<style lang="stylus">
    .forumTop
        background:rgba(178,186,194,.15);
        padding-top:20px;
        .forum-all
            background:white;
            width:748px;
            height:100%;
            margin:0 auto;
            .el-tabs__header
                margin-bottom:0!important;
            .el-tabs__nav-wrap::after
                background-color:rgb(255, 255, 255)!important;
            .el-button--default
                margin-left:0!important;
</style>