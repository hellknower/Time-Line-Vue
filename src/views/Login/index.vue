<template>
    <div id="Login">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:'',
                password:'',
                isUsernameRight:false,
                isPasswordRight:false,
                usernameErrorMsg:'',
                passwordErrorMsg:'',
            }
        },
        mounted(){
        },
        computed:{
        },
        methods:{
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#Login
    height:100%
    .login-input-position
        width:500px
        height:350px
        border-radius:5px
        margin:0 auto
        box-shadow:5px 5px 5px 5px gray
        text-align:center
        position:relative
        top:50%
        transform:translateY(-50%)
        display:flex
        flex-direction:column   
        justify-content:center
        .longin-back-icon
            width:20px
            position:absolute
            top:20px
            right:20px
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
        .error-message
            color:#f24531
            line-height:20px
            font-size:14px
            height:24px
        .create-or-forget-buttonArray
            margin-bottom:16px
            .el-button 
                padding-top:8px
                padding-bottom:8px
</style>