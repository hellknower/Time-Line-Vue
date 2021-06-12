<template>
    <div class='head'>
        <span @click="topMain" class='router-link-active'>首页</span>
        <router-link  class='router-link-active' to='conversation'>聊天室</router-link>
        <router-link class='router-link-active'  to='timeline'>时间线</router-link>
        <el-button type="primary" size="default" @click="logout">登出</el-button>
        
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
        },
        methods:{
            topMain(){
                this.$router.push('/main');
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