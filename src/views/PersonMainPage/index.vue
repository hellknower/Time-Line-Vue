<template>
    <div class="person-main">
        <div class="person-main-center">
            <div class="person-main-center-userimage">
                <img :src="require('../../assets/data.png')" alt="">
                <p class="person-main-center-username">{{userName}}</p>
            </div>
            <el-timeline class="person-main-center-timeLine">
                <el-timeline-item v-for="item in articleMessage"
                    :key="item.articleId"
                    :timestamp="item.date"
                    placement="top"
                    type="primary"
                    size="normal">
                    <el-card>
                        {{item.articleTitle}}
                        <el-button v-show="showButton" type="primary" size="default" @click="deleteButton(item.articleId)">删除</el-button>
                        
                    </el-card>                        
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import {personMain} from '../../api/user.js'
import {deleteArticle} from '../../api/forum.js'

export default{
    data() {
        return{     
            userId:'',       
            userName:'',
            articleMessage:[],
            showButton:false
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
        this.userId = this.$route.params.id;
        // this.userName = sessionStorage.getItem('userName');
        this.getPersonMainMessage();
        if(this.userId === sessionStorage.getItem('userId')){
            this.showButton = true;
        }
    },
    methods:{
        getPersonMainMessage(){
            personMain({userId:this.userId}).then((res)=>{
                this.articleMessage = res.userOwnArticle;
                for(let i of this.articleMessage){
                    let date = new Date(i.articleCreateDate);
                    i.date = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
                }
            }).catch((err)=>{
                console.log(err)
            });
        },
        deleteButton(item){
            let userId = sessionStorage.getItem('userId');
            deleteArticle({userId:userId,articleId:item}).then((res)=>{
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.getPersonMainMessage();
            }).catch((err)=>{                
                console.log(err)
            })
        }
    }
}
</script>

<style lang="stylus">
.person-main
    background: rgba(178,186,194,0.15);
    padding-top:20px
    height: 100%
    .person-main-center
        width: 640px
        margin: 0 auto
        display:flex
        background-color: white
        .person-main-center-userimage
            margin: 50px 20px 0 60px
            img
                width: 100px
                height: 100px
                border:3px solid rgb(178,186,194)
        .person-main-center-timeLine
            margin-top: 50px
</style>