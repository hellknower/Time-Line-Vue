<template>
    <div class="add-article">
        <div class="add-article-head">
            <el-input
                class="add-article-head-title"
                v-model="title"
                placeholder="请在此输入标题..."
            />
            <div class="add-article-head-rightPart">
                <el-select v-model="selectedKind">
                    <el-option
                        v-for="item in articleKinds"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    ></el-option>
                </el-select>

                <el-button 
                    class="add-article-head-publish"
                    @click="open"
                    type="primary"
                >
                    发布
                </el-button>
            </div>
        </div>
        <div class="add-article-body">
            <el-input
                class="add-article-content-input" 
                type="textarea"
                resize="none"
                v-model="readmeData"
                show-word-limit=true
            />
            <div class="add-article-content" v-html="compileMarkDown(readmeData)"></div>
        </div>

    </div>
</template>

<script>
import { addArticle } from '../../api/forum.js';

const showdown = require('showdown');
const converter = new showdown.Converter();

export default{
    data(){
        return{
            title:'',
            readmeData:'',
            articleKinds:[],
            selectedKind:''
        }
    },
    mounted(){
        this.articleKinds = [
            {
                value:1,
                label:'前端'
            },
            {
                value:2,
                label:'后台'
            },
            {
                value:3,
                label:'数据库'
            },
            {
                value:4,
                label:'算法'
            },
        ];
    },
    methods:{
        compileMarkDown(value){
            return converter.makeHtml(value);
        },
        open(){
            //不能发布空文章
            //必须选择文章类型
            let articleTitle = this.title
            let articleContent = this.readmeData
            let articleType = this.selectedKind
            let userId = sessionStorage.getItem('userId');
            let articleCreateDate = Date.now();
            
            if(articleTitle.length === 0){
                this.$message({
                    type:'error',
                    message:'需要填写标题',
                })
            }else if(articleContent.length === 0){
                this.$message({
                    type:'error',
                    message:'需要填写内容',
                })
            }else if(articleType.length === 0){
                this.$message({
                    type:'error',
                    message:'需要选择文章类型',
                })
            }else{

                addArticle({ userId,articleTitle,articleContent,articleType,articleCreateDate }).then((res)=>{
                    console.log("a"+res)
                    
                }).catch()
            }
            console.log('submit')
        },
    }
}
</script>

<style lang="stylus">
    .add-article
        height:100%
        margin:0 auto;
        .add-article-head
            box-sizing:border-box
            padding:8px 16px
            height:63px
            display:flex
            justify-content:space-between
            align-items:center
            .add-article-head-title
                width:100%
                height:100%
                input
                    border:1px solid #fff
                    height:100%
                    font-size:22px
            .add-article-head-rightPart
                display:flex
                align-items:center
                .add-article-head-publish
                    box-sizing:content-box
                    height:26px
                    width:28px
                    padding:2px 16px
                    margin-left 8px

        .add-article-body
            height:calc(100% - 64px)
            border-top:1px solid #e1e4e8
            display:flex
            .add-article-content-input
                width:50%
                .el-textarea__inner
                    background-color:#c9cdd42b
                    border:0
                    border-radius:0
                    border-right:1px solid #DCDFE6
                    height:100%
            .add-article-content
                width:50%
                height:100%
                overflow:auto
</style>