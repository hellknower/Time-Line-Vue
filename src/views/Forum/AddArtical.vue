<template>
    <div>
        <div class='addArtical'>
            <!-- {{id}} -->
            <el-input v-model='articalAuthor' placeholder="作者"></el-input>
            <el-input v-model='forumTitle' placeholder="标题"></el-input>
            <el-input v-model='forumContent' type='textarea'></el-input>
            <el-select v-model="articalDirection" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-row>
                <el-button @click='addArtical'>发布</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                articalAuthor:'testDemo',
                articalDate:'',
                articalDirection:'',
                id:'',
                forumTitle:'',
                forumContent:'',
                options:[{
                        label:'前端',
                        value:'前端',
                    },
                    {
                        label:'后端',
                        value:'后端',
                    },
                    {
                        label:'移动端',
                        value:'移动端',
                    },
                    {
                        label:'测试',
                        value:'测试',
                    }]
            }
        },
        methods:{
            addArtical(){
                let articalJson = new Object()
                articalJson.articalAuthor = this.articalAuthor;
                articalJson.articalDate = new Date();
                
                articalJson.articalDateMsg = '';
                articalJson.articalDirection = this.articalDirection;
                articalJson.forumTitle = this.forumTitle;
                articalJson.forumContent = this.forumContent;
                
                articalJson.articalLike={
                    likeCount:0,
                    isChoose:false
                };
                articalJson.articalComment = 0;
                // articalJson.articalAuthor = this.articalAuthor;
                // console.log(articalJson)
                // this.$store.commit('addartical',articalJson)
                this.$store.dispatch('addArtical',articalJson)
                this.$router.replace('/forum')
            }
        }
    }
</script>

<style lang="stylus">
    .addArtical
        margin:0 auto;
        width:1000px;
</style>