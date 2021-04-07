<template>
    <div>sad
        <div>
            id:{{id}}<br/>
            title:{{title}}<br/>
            content:{{content}}<br/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                id:null,
                title:'',
                content:'',
            }
        },
        mounted(){
                axios.get('http://localhost:8088/').then((res)=>{
                    this.id = res.data.id;
                    this.title = res.data.forumTitle;
                    this.content = res.data.forumContent;
            });
            
            this.id = this.$route.params.id
        }
    }
</script>