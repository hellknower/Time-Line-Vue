<template>
    <div class='head'>
        <div class="head-center">            
            <span @click="topMain" class='router-link-active' >首页</span>
            <div class="head-center-main">
                <el-button type="primary" class="head-center-main-button" size="small" @click="toAddConversation" v-show="show">写文章</el-button>
                <el-dropdown placement="bottom">
                    <UserHeadImage :userId="userId"/>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <p class="logout" @click="logout">
                                登出
                            </p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>
    </div>
</template>

<script>
import UserHeadImage from '../UserHeadImage.vue'

    export default {
        data(){
            return {
                userId:'',
                show:true
            }
        },
        mounted(){
            this.userId = sessionStorage.getItem('userId');
            
            if(sessionStorage.getItem('userName') === 'admin'){
                this.show = false;
            }else{
                this.show = true;
            }
        },
        components:{UserHeadImage},
        methods:{
            topMain(){
                if(sessionStorage.getItem('userName') === 'admin'){
                    this.$router.push('/main/adminIndex');
                }else{
                    this.$router.push('/main');
                }
            },
            logout(){                
                console.log('a')
                this.$router.push('/');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('userName');
            },
            toAddConversation(){
                this.$router.push('/main/addArticle');
            },

        },
    }
</script>

<style lang="stylus">
    .head
        height:60px;
        display:flex;
        justify-content: center;
        .head-center
            display:flex;
            align-items: center;
            justify-content:space-between
            width:748px
            .head-center-main
                display:flex;
                align-items: center;
                .head-center-main-button
                    margin-right:8px
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
    .logout
        margin:0
</style>