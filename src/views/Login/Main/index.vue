<template>
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
                    @keydown.enter.native="pressLogin"/>
            </div>
            <div class="error-message">
                <span v-show="!isUsernameRight">{{usernameErrorMsg}}</span>
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
                    @keydown.enter.native="pressLogin"/>
            </div>
            <div class="error-message">
                <span v-show="!isPasswordRight">{{passwordErrorMsg}}</span>
            </div>                
            <div class="create-or-forget-buttonArray">
                <el-button type="text" @click="forget" class="forget-password">忘记密码</el-button>
                <el-button type="text" @click="regist">注册账号</el-button>
            </div>
            <div class="login-button">
                <el-button type="primary" @click="pressLogin">登陆</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '../../../api/user.js';

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
            forget(){
                this.$router.push('login/forget');
            },
            regist(){
                this.$router.push('login/regist');
            },
            pressLogin(){
                this.checkUsername(this.username);
                this.checkPassword(this.password);
                if(this.isPasswordRight && this.isUsernameRight){
                    const username = this.username;
                    const password = this.password;
                    login({ username,password }).then((resolve) => {
                        const {success,message,userId} = resolve;
                        if(success){
                            this.$message({
                                type:'success',
                                message:message
                            });

                            sessionStorage.setItem('userId',userId);
                            
                            this.$router.push('main');
                        }else{
                            this.$message({
                                type:'error',
                                message:message
                            })
                        }
                    }).catch(err => {
                        console.log('错误为:'+err);
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>