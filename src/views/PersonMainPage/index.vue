<template>
    <div class="person-main">
        <div class="person-main-center">
            <div class="person-main-center-userimage">
                <img :src="require('../../assets/data.png')" alt="">
                <p class="person-main-center-username">{{userName}}</p>
            </div>
            <div>
                <el-timeline>
                    <el-timeline-item v-for="item in articleMessage"
                        :key="item.articleId"
                        :timestamp="item.date"
                        placement="top"
                        type="primary"
                        size="normal">
                        <el-card>
                            {{item.articleTitle}}
                        </el-card>                        
                    </el-timeline-item>
                </el-timeline>                
            </div>
        </div>
    </div>
</template>

<script>
import {personMain} from '../../api/user.js'

export default{
    data() {
        return{            
            userName:'',
            articleMessage:[]
        }
    },
    mounted(){
        this.userName = sessionStorage.getItem('userName');

        personMain({userId:this.$route.params.id}).then((res)=>{
            this.articleMessage = res.userOwnArticle;
            for(let i of this.articleMessage){
                let date = new Date(i.articleCreateDate);
                i.date = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
            }
            console.log(this.articleMessage)
        }).catch((err)=>{
            console.log(err)
        });
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
</style>