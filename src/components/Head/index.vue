<template>
    <div class='head'>
        <router-link class='router-link-active' to='forum'>论坛</router-link>
        <router-link  class='router-link-active' to='conversation'>聊天室</router-link>
        <router-link class='router-link-active'  to='timeline'>时间线</router-link>
        <!-- <router-link>登录</router-link> -->
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
            if(this.$route.name === 'forum'){
                // console.log('a')
            }
        },
        methods:{

        },
    }
</script>

<style>
    .head{
        height:60px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .router-link-active {
        font-size:18px;
        color:#71777c;
        text-decoration: none;
        margin-right:60px;
    }
    .router-link-active:last-child {
        margin-right:0px;
    }
    .router-link-active:hover{
        color:#007fff;
    }
</style>