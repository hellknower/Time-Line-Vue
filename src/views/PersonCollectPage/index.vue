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
                    placement="top"
                    type="primary"
                    size="normal">
                    <el-card>
                        <p  @click="toArticle(item.articleId)" class="person-main-center-p">{{item.articleTitle}}</p>
                    </el-card>                        
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import {getLikeAndCollect} from '../../api/user.js'
import {findArticleWithId} from '../../api/forum.js'

export default{
    data() {
        return{     
            userId:'',       
            userName:'',
            articleMessage:[],
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
    },
    methods:{
        getPersonMainMessage(){
            getLikeAndCollect({userId:this.userId}).then((res)=>{
                for(let i of res.userCollect){
                    findArticleWithId({articleId:i}).then((res)=>{
                        this.articleMessage.push(res.articles[0]);
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
            });
        },
        toArticle(id){
            console.log('a')
            this.$router.push(`/main/article/${id}`);
        },
    }
}
</script>

<style lang="stylus">
.person-main
    height:calc(100% - 80px)
    background: rgba(178,186,194,0.15);
    padding-top:20px
    overflow :auto
    .person-main-center
        width: 748px
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
            .person-main-center-p
                width:400px
</style>