<template>
    <div @click="toUserMainPage" class="user-head">
        <img :src="require('../assets/data.png')" alt="">
    </div>
</template>

<script>
require
export default{
    data(){
        return {
        }
    },
    mounted(){
    },
    props:[],
    methods:{
        toUserMainPage(){
            console.log('user');
        }
    }
}
</script>

<style lang="stylus">
.user-head
    width: 32px
    height: 32px
    img
        width: 32px
        height: 32px
        border-radius: 50%
        border:1px solid black
        overflow:hidden
</style>