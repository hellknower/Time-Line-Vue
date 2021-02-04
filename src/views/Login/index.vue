<template>
    <div id="Login">
        <div class="login-input-position">
            <div class="login-input--center-position">
                <div class="login-input login-userName">
                    <span>用户名:</span>
                    <el-input 
                        v-model="username"
                        autocomplete
                        clearable 
                        placeholder="请输入用户名"
                        @blur="checkUsername"
                        @keydown.enter.native="pressEnter"/>
                </div>
                <div class="login-input login-password">
                    <span>密码:</span>
                    <el-input 
                        v-model="password" 
                        autocomplete 
                        clearable 
                        placeholder="请输入密码" 
                        show-password
                        @blur="checkPassword"
                        @keydown.enter.native="pressEnter"/>
                </div>
                <div class="create-or-forget-buttonArray">
                    <el-button type="text" @click="forget" class="forget-password">忘记密码</el-button>
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
                username:'',
                password:'',
                isUsernameRight:false,
                isPasswordRight:false,
            }
        },
        mounted(){
        },
        computed:{
        },
        methods:{
            checkUsername(event){
                const username = event.target.value;
                if(username.length < 1){
                    this.$message({
                        type:'error',
                        message:'用户名不能为空'
                    })
                    return;
                }else if(username.length > 18){
                    this.$message({
                        type:'error',
                        message:'用户名为数不能大于18位'
                    })
                    return;
                }
                const rex = new RegExp(/^[a-z,A-Z,0-9,_,\u4e00-\u9fa5]{1,18}$/);
                this.isUsernameRight = rex.test(username);
                if(!this.isUsernameRight){
                    this.$message({
                        type:'error',
                        message:'账号格式不正确,请输入正确的账号',
                    })
                    return;
                }
                // else if(this.isPasswordRight && this.isUsernameRight){ 
                //     this.login();
                // }
            },
            checkPassword(event){
                const password = event.target.value;
                if(password.length < 6){
                    this.$message({
                        type:'error',
                        message:'密码为数不能小于6位',
                    })
                    return;
                }else if(password.length > 12){
                    this.$message({
                        type:'error',
                        message:'密码为数不能大于12位'
                    })
                    return;
                }
                const rex = new RegExp(/^[a-z,A-Z,0-9,_]{1,12}$/);
                this.isPasswordRight = rex.test(password);
                if(!this.isPasswordRight){
                    this.$message({
                        type:'error',
                        message:'密码格式不正确,请输入正确的密码'
                    })
                    return;
                }
                // else if(this.isPasswordRight && this.isUsernameRight){ 
                //     this.login();
                // }
            },
            pressEnter(){
                console.log('a')
                if(this.isPasswordRight && this.isUsernameRight){ 
                    this.login();
                }
            },
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
                // this.checkUsername(this.username);
                // this.checkPassword(this.password);
                if(this.isPasswordRight || this.isUsernameRight){ 
                    this.$router.push('main');
                }
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
            .forget-password
                //margin-right:8px
</style>