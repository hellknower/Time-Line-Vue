<template>
    <div>
        {{articleMessage}}
        <div @click='toArtical(i.id)' v-for='(i,index) in forums' :key='index' class='forum-one'>
            <div class='forum-one-content'>
                <p>
                    <span>{{i.articalAuthor}}</span>|
                    <span>{{i.articalDateMsg}}</span>|
                    <span>{{i.articalDirection}}</span>
                </p>
                <p>{{i.forumTitle}}</p>
                <el-row>
                    <el-button 
                        :class='{isClick:i.articalLike.isChoose}'
                        icon="el-icon-thumb" size="small"
                        @click.stop='buttonClick(i.articalLike)'
                    >
                        {{i.articalLike.likeCount}}
                    </el-button>
                    <el-button icon='el-icon-chat-round' size="small">
                        {{i.articalComment}}
                    </el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default({
    data(){
        return {
            
        }
    },
    props:['articleMessage']
})
</script>

<style>

</style>