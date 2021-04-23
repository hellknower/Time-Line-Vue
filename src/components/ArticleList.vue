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
    // articleLikeCount: 0,
    // articleCollectCount: 0,
    // articleCommentCount: 0,
    // articleCreateDate: 2021-04-23T06:31:09.135Z,
    // _id: 608269c9212a030b641dada3,
    // articleId: 'a866e8864708f89bac977387aeb47eb362b1f20b1619159497925',
    // articleTitle: "d'f'g",
    // articleContent: '的风格',
    // articleType: 'SYPH',
    // articleLikePerson: [],
    // articleCollectPerson: [],
    // articleCommentPerson: [],
            
        }
    },
    props:['articleMessage'],
    mounted(){
        console.log('a',this.articleMessage)
    },
})
</script>

<style>

</style>