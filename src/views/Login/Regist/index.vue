<template>
    <div class="login-input-position">
        <p>注册新用户</p>
        <div class="login-input--center-position">
            <img class="longin-back-icon" src='../../../assets/Icon/back.svg' @click="back"/>
            <div class="login-input login-userName">
                <span>用户名:</span>
                <el-input 
                    v-model="username"
                    autocomplete
                    clearable 
                    placeholder="请输入用户名"
                    @blur="checkUsername"
                    @keydown.enter.native="login"/>
            </div>
            <div class="error-message">
                <span v-show="!isUsernameRight">{{usernameErrorMsg}}</span>
            </div>  
            <div class="login-input login-password">
                <span>密码:</span>
                <el-input 
                    v-model="password" 
                    clearable 
                    placeholder="请输入密码"
                    @blur="checkPassword"
                    @keydown.enter.native="regist"/>
            </div>
            <div class="error-message">
                <span v-show="!isPasswordRight">{{passwordErrorMsg}}</span>
            </div>
            <div class="login-input login-rePassword">
                <span>重复密码:</span>
                <el-input 
                    v-model="rePassword" 
                    clearable 
                    placeholder="请再次输入密码"
                    @blur="checkRePassword"
                    @keydown.enter.native="regist"/>
            </div>
            <div class="error-message">
                <span v-show="!isRePasswordRight">{{RepasswordErrorMsg}}</span>
            </div>
            <div class="login-button">
                <el-button type="primary" @click="regist">注册</el-button>
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
                rePassword:'',
                isUsernameRight:false,
                isPasswordRight:false,
                isRePasswordRight:false,
                usernameErrorMsg:'',
                passwordErrorMsg:'',
                RepasswordErrorMsg:'',
            }
        },
        mounted(){
        },
        computed:{
        },
        methods:{
            checkUsername(event){
                const username = typeof event === 'object'?event.target.value:event;
                if(username.length < 1){
                    this.isUsernameRight = false;
                    this.usernameErrorMsg = '用户名不能为空';
                    return;
                }else if(username.length > 18){
                    this.isUsernameRight = false;
                    this.usernameErrorMsg = '用户名为数不能大于18位';
                    return;
                }
                const rex = new RegExp(/^[a-z,A-Z,0-9,_,\u4e00-\u9fa5]{1,18}$/);
                this.isUsernameRight = rex.test(username);
                if(!this.isUsernameRight){
                    this.isUsernameRight = false;
                    this.usernameErrorMsg = '账号格式不正确,请输入正确的账号';
                    return;
                }
            },
            checkPassword(event){
                const password = typeof event === 'object'?event.target.value:event;
                if(password.length < 6){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码为数不能小于6位';
                    return;
                }else if(password.length > 12){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码为数不能大于12位';
                    return;
                }
                const rex = new RegExp(/^[a-z,A-Z,0-9,_]{1,12}$/);
                this.isPasswordRight = rex.test(password);
                if(!this.isPasswordRight){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码格式不正确,请输入正确的密码';
                    return;
                }
            },
            checkRePassword(event){
                const rePassword = typeof event === 'object'?event.target.value:event;
                if(rePassword.length < 1){
                    this.isRePasswordRight = false;
                    this.RepasswordErrorMsg = '重复密码不能为空';
                    return;
                }
                // const rePassword = typeof event === 'object'?event.target.value:event;
                if(this.rePassword !== this.password){
                    this.isRePasswordRight = false;
                    this.RepasswordErrorMsg = '两次密码不同,请重新输入';
                    return;
                }else{
                    this.isRePasswordRight = true;
                    return;
                }
            },
            back(){
                this.$router.push('/login');
            },
            regist(){
                this.checkUsername(this.username);
                this.checkPassword(this.password);
                this.checkRePassword(this.rePassword);
                if(this.isPasswordRight && this.isUsernameRight){ 
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>