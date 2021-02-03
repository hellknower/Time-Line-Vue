<template>
    <div id="Login">
        <div class="login-input-position">
            <div class="login-input login-userName">
                <span>用户名:</span>
                <el-input v-model="userName" placeholder="请输入内容"/>
            </div>
            <div class="login-input login-passWord">
                <span>密码:</span>
                <el-input v-model="passWord" placeholder="请输入内容"/>
            </div>
            <div class="create-or-forget-buttonArray">
                <el-button type="text" @click="forget">忘记密码</el-button>
                <el-button type="text">注册账号</el-button>
            </div>
            <div class="login-button">
                <el-button type="primary" @click="login">登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                userName:'',
                passWord:''
            }
        },
        mounted(){
        },
        computed:{
        },
        methods:{
            forget(){
                this.$confirm('main','忘记密码',{
                    showInput:true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(msg=>{
                    console.log(msg);
                }).catch(err=>{
                    console.log(err);
                })
            },
            login(){
                this.$router.push('main')
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#Login
    .login-input-position
        margin:0 auto
        width:500px
    .login-input
        display:flex
        span
            width:200px
            text-align:right
</style>