<template>
    <div class="add-article">

        <el-input
            class="add-article-title"
            v-model="title"
            placrholder="请在此输入标题"
        />
        <el-select v-model="articleKind">
            <el-option
                v-for="item in articleKinds"
                :key="item.value"
                :value="item.value"
                :label="item.label"
            ></el-option>
        </el-select>

        <el-button 
            @click="open"
        >
            发布
        </el-button>
        <el-input
            class="add-article-input" 
            type="textarea"
            resize="none"
            v-model="readmeData"
        />
        <div class="add-article-content" v-html="compileMarkDown(readmeData)"></div>
    </div>
</template>

<script>
const showdown = require('showdown');
const converter = new showdown.Converter();

export default{
    data(){
        return{
            title:'',
            readmeData:'',
            articleKinds:[],
            articleKind:''
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
            console.log('submit')
        },
    }
}
</script>

<style lang="stylus">
    .add-article
        margin:0 auto;
        .add-article-title

        .add-article-input
            width:50%
            float:left
        .add-article-content
            width:50%
            float:left
</style>