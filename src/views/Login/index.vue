<template>
    <div id="Login">
        <div class="login-input-position">
            <div class="login-input--center-position">
                <div class="login-input login-userName">
                    <span>用户名:</span>
                    <el-input v-model="userName" clearable placeholder="请输入内容"/>
                </div>
                <div class="login-input login-password">
                    <span>密码:</span>
                    <el-input v-model="password" clearable placeholder="请输入内容"/>
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
    </div>
</template>

<script>
    export default {
        data(){
            return {
                userName:'',
                password:''
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
    height:100%
    .login-input-position
        width:500px
        height:350px
        margin:0 auto
        box-shadow:5px 5px 5px 5px gray
        text-align:center
        position:relative
        top:50%
        transform:translateY(-50%)
        display:flex
        flex-direction:column   
        justify-content:center
        .login-input
            display:flex
            justify-content:center
            span
                width:80px
                margin-right:8px
                line-height:40px
                text-align:right
            .el-input
                width:240px
        .login-userName
            margin-bottom:32px
        .login-password
            margin-bottom:16px
        .create-or-forget-buttonArray
            margin-bottom:16px

</style>