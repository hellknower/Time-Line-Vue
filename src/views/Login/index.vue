<template>
    <div id="Login">
        <div class="login-input-position">
            <div class="login-userName">
                <span>用户名:</span>
                <el-input v-model="userName" placeholder="请输入内容"/>
            </div>
            <div class="login-passWord">
                <span>密码:</span>
                <el-input v-model="passWord" placeholder="请输入内容"/>
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>