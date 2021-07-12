<template>
    <div class='forumTop'>
        <div class='forum-all'>
            <a id="one" href="#"></a>
            <el-tabs class='forum-tabs' type='card' v-model="activeName" @tab-click="tabClick">
                <!-- <keep-alive> -->
                <el-tab-pane 
                    v-for='i in forumTitile' 
                    :key='i.typeValue' 
                    :label="i.typeName"
                    :name='i.typeValue'
                />
                <el-button type="primary" size="small" class="like-sort-button" @click="sortLike">喜欢排序</el-button>
                <el-button type="primary" size="small" class="collect-sort-button" @click="sortCollect">收藏排序</el-button>
                <el-button type="text" class="check-dialogVisible-button" @click="dialogVisible = true">查看未通过审核的文章</el-button>
                <el-dropdown trigger="click" placement="bottom-start">
                    <el-input v-model="searchMessage" size="small" @input="searchArticle" placeholder="请输入要查询的数据..."/>                        
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="i in searchResult" :key="i.item.articleId" v-show="!i.item.unreExamined">
                            <div @click="toArticle(i.item.articleId)">
                                {{i.item.articleTitle}} 
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="article-list">
                    <ArticleList v-for="articleMessage in articleMessages" v-show="articleMessage.reExamined" :key="articleMessage.articleId" :articleMessage="articleMessage"/>
                </div>                    
            </el-tabs>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                    <div class="" v-for="i in userOwnArticle" :key="i.articleId" v-show="i.unreExamined" @click="editArticle(i.articleId)">                    
                        <p>{{i.articleTitle}}</p>
                        <p>问题为：{{i.reExaminedMessage}}</p> 
                    </div>
            </el-dialog>
            <div class='forum-add'>
                <a href="#one">
                    <img src="../../assets/top.png" alt="">
                </a>                
            </div>
        </div>
    </div>
</template>

<script>
        //差filter,按钮点击颜色立刻消失,回复点击跳转,路由重定向和过滤
    import { findArticleType } from '../../api/api.js'
    import ArticleList from '../../components/ArticleList.vue'
    import {findArticleWithType} from '../../api/forum'
    import {personMain} from '../../api/user'
    import Fuse from 'fuse.js'
    

    export default {
        data(){
            return {
                activeName:'SYPQ',
                forumTitile:[],
                articleMessages:[],
                userOwnArticle:[],    
                dialogVisible: false,
                searchMessage:'',
                options :{
                    includeScore: true,
                    keys:['articleTitle']
                },
                searchResult:[]
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
            
            personMain({userId:sessionStorage.getItem('userId')}).then((res)=>{
                this.userOwnArticle = res.userOwnArticle;
            }).catch((err)=>{
                console.log(err)
            });
            this.tabClick(this.activeName);
        },
        components:{ArticleList},
        methods:{
            tabClick(val){
                let value = val.name||val;
                
                findArticleWithType({typeValue:value}).then((res)=>{
                    if(res.success){
                        this.articleMessages = res.articles;
                        for(let i of this.articleMessages){
                            const rex = new RegExp(/^[A-Z]{4}$/);
                            if(rex.test(i.articleType)){
                                i.articleType = '前端'
                            }
                            // if(i){
                            //     i.ty = '前端'
                            // }
                        }
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
            editArticle(articleId){
                this.$router.push(`/main/editArticle/${articleId}`)
            },
            sortLike(){
                function sortRule(a,b) {    //喜欢降序
                    return b.articleLikeCount - a.articleLikeCount; // 如果a>=b，返回自然数，不用交换位置
                }
                this.articleMessages.sort(sortRule);
            },
            sortCollect(){
                function sortRule(a,b) {    //喜欢降序
                    return b.articleCollectCount - a.articleCollectCount; // 如果a>=b，返回自然数，不用交换位置
                }
                this.articleMessages.sort(sortRule);
            },
            handleClose() {
                this.$confirm('确认关闭？').then(()=>{
                    this.dialogVisible = false;
                }).catch(()=>{
                    this.dialogVisible = true;
                })
            },
            searchArticle(){
                const fuse = new Fuse(this.articleMessages,this.options);
                this.searchResult = fuse.search(this.searchMessage);
            },
            toArticle(id){
                this.$router.push(`/main/article/${id}`);
            }
        }
    }
</script>

<style lang="stylus">
    .forumTop
        background:rgba(178,186,194,.15);
        padding-top:20px;
        height:calc(100% - 80px);
        .forum-all::-webkit-scrollbar
            display: none
        .forum-all
            background:white;
            width:748px;
            height:100%
            margin:0 auto;
            overflow:auto
            .like-sort-button
                position:absolute
                left:10px
                top:4px
            .collect-sort-button
                position:absolute
                left:100px
                top:4px
            .check-dialogVisible-button
                margin-right:20px
            .article-list
                margin-top: 0px
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
            .el-dialog
                .el-dialog__header
                    padding-bottom:8px
                .el-dialog__body::-webkit-scrollbar
                    display:none
                .el-dialog__body
                    height:350px
                    overflow :auto
                    padding:0px 20px 8px 20px
                    margin:0
                    div
                        border-top:1px solid rgba(178,186,194,.5);                        
                        p:first-child
                            color:black
                            font-size:18px
                        p
                            width:100%
                            margin:8px 0
                            text-align :left
</style>