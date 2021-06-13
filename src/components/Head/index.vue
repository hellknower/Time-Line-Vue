<template>
    <div class='head'>
        <span @click="topMain" class='router-link-active' >首页</span>
        <el-button type="primary" size="default" @click="logout">登出</el-button>
        <UserHeadImage :userId="userId"/>
    </div>
</template>

<script>
import UserHeadImage from '../UserHeadImage.vue'

    export default {
        data(){
            return {
                userId:'',
            }
        },
        mounted(){
            this.userId = sessionStorage.getItem('userId');
        },
        components:{UserHeadImage},
        methods:{
            topMain(){
                if(sessionStorage.getItem('userName') === 'admin'){
                    this.$router.push('/main/adminIndex');
                }else{
                    this.$router.push('/main');
                }
            },
            logout(){                
                this.$router.push('/');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('userName');
            }
        },
    }
</script>

<style lang="stylus">
    .head
        height:60px;
        display:flex;
        justify-content: center;
        align-items: center;
        .router-link-active
            font-size:18px;
            color:#71777c;
            text-decoration: none;
            margin-right:60px;
            cursor:pointer
        .router-link-active:last-child
            margin-right:0px;
        .router-link-active:hover
            color:#007fff;
</style>