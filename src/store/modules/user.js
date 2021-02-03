import axios from "axios";

const user = {
    state:{},
    mutations:{},
    actions:{
        login(){
            axios.post('user/login').then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    getters:{},
}

export default user;