<template>
    <div class="login-input-position">
        <p>忘记密码</p>
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
                    @keydown.enter.native="forget"/>
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
                    show-password
                    @blur="checkPassword"
                    @keydown.enter.native="forget"/>
            </div>
            <div class="error-message">
                <span v-show="!isPasswordRight">{{passwordErrorMsg}}</span>
            </div>
            <div class="login-input login-rePassword">
                <span>重复密码:</span>
                <el-input 
                    v-model="rePassword" 
                    clearable 
                    show-password
                    placeholder="请再次输入密码"
                    @blur="checkRePassword"
                    @keydown.enter.native="forget"/>
            </div>
            <div class="error-message">
                <span v-show="!isRePasswordRight">{{RepasswordErrorMsg}}</span>
            </div>
            <div class="login-button">
                <el-button type="primary" @click="forget">更改密码</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { forgotten } from '../../../api/user.js';

    export default {
        data(){
            return {
                username:'',
                oldPassword:'',
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
            checkOldPassword(event){
                const oldPassword = typeof event === 'object'?event.target.value:event;
                if(oldPassword.length < 6){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码为数不能小于6位';
                    return;
                }else if(oldPassword.length > 12){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码为数不能大于12位';
                    return;
                }
                const rex = new RegExp(/^[a-z,A-Z,0-9,_]{1,12}$/);
                this.isPasswordRight = rex.test(oldPassword);
                if(!this.isPasswordRight){
                    this.isPasswordRight = false;
                    this.passwordErrorMsg = '密码格式不正确,请输入正确的密码';
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
            forget(){
                this.checkUsername(this.username);
                this.checkOldPassword(this.oldPassword);
                this.checkPassword(this.password);
                this.checkRePassword(this.rePassword);
                if(this.isPasswordRight && this.isUsernameRight){ 
                    const username = this.username;
                    const oldPassword = this.oldPassword;
                    const password = this.password;

                    forgotten({ username,oldPassword,password }).then((resolve) => {
                        const {success,message} = resolve;
                        
                        if(success){
                            this.$message({
                                type:'success',
                                message:message
                            });

                            this.$router.push('/login');
                        }else{
                            this.$message({
                                type:'error',
                                message:message
                            });
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