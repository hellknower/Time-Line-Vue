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
                        :key="item.typeValue"
                        :value="item.typeValue"
                        :label="item.typeName"
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
            <div class="add-article-body-div" @mouseenter="inputScroll">
                <el-input
                    class="add-article-content-input" 
                    id="add-article-content-input"
                    type="textarea"
                    resize="none"
                    v-model="readmeData"
                />
            </div>
            <div 
                class="add-article-content" 
                id="add-article-content"
                v-html="compileMarkDown(readmeData)" 
                @mouseenter="contentScroll"></div>
        </div>

    </div>
</template>

<script>
import { addArticle } from '../../api/forum.js';
import { findArticleType } from '../../api/api.js'

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
        if(sessionStorage.getItem('userId') === null){
            this.$message({
                type:'error',
                message:'请先登录，谢谢'
            })
            this.$router.push('/');
        }
        findArticleType().then((res)=>{
            if(res.success){
                this.articleKinds = res.returnType;
            }else{
                console.log(res.message);
            }
        });
    },
    methods:{
        compileMarkDown(value){
            return converter.makeHtml(value);
        },
        contentScroll(event){
            let contentScroll = event.path[0];
            let inputScroll = event.path[1].firstChild.firstChild.firstChild;
            let contentHeight = contentScroll.scrollHeight;
            let inputHeight = inputScroll.scrollHeight;
            contentScroll.onscroll = ()=>{
                inputScroll.onscroll = null
                inputScroll.scrollTop = (contentScroll.scrollTop * inputHeight)/contentHeight;
            }
        },
        inputScroll(event){
            let contentScroll = event.path[1].lastChild;
            let inputScroll = event.path[0].firstChild.firstChild;
            let contentHeight = contentScroll.scrollHeight;
            let inputHeight = inputScroll.scrollHeight;
            inputScroll.onscroll = ()=>{                
                contentScroll.onscroll = null
                contentScroll.scrollTop = (inputScroll.scrollTop * contentHeight)/inputHeight;
            }
        },
        open(){
            //不能发布空文章
            //必须选择文章类型
            let articleTitle = this.title;
            let articleContent = this.readmeData;
            let articleType = this.selectedKind;
            let userId = sessionStorage.getItem('userId');
            let articleCreateDate = Date.now();
            console.log(articleType)
            
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
                    if(res.success){
                        this.$message({
                            type:'success',
                            message:res.message
                        });
                        this.$router.replace('/main');

                    }else{
                        this.$message({
                            type:'error',
                            message:res.message
                        });
                    }
                    
                }).catch()
            }
        },
    }
}
</script>

<style lang="stylus">
    .add-article
        height:calc(100% - 124px)
        margin:0 auto;
        border-top: 1px solid rgba(201,205,212,0.5)
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
            width:100%
            height:calc(100% - 1px)
            border-top:1px solid #e1e4e8
            display:flex
            .add-article-body-div
                width:50%
                .add-article-content-input
                    height:100%
                    width:100%
                    .el-textarea__inner
                        height:100%
                        background-color:#c9cdd42b
                        border:0
                        border-radius:0
                        border-right:1px solid #DCDFE6
            .add-article-content
                width:50%
                height:100%
                text-align:left
                overflow:auto
</style>