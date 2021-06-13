const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let articleSchema = new Schema({
    articleId:{             //文章Id
        type:String,
        required:true,
        unique:true
    },
    ownUserName : {
        type:String,
        required:true,
    },
    articleTitle:{          //文章标题
        type:String,
        required:true,
    },
    articleType:{           //文章类型
        type:String,
        required:true,
    },
    articleContent:{        //文章内容
        type:String,
        required:true,
    },
    articleLikeCount:{      //喜欢文章总数
        type:Number,
        required:true,
        default:0
    },
    articleLikePerson:{     //喜欢文章的人（存入用户ID）
        type:Array,
    },
    articleCollectCount:{   //文章收藏数
        type:Number,
        required:true,
        default:0
    },
    articleCollectPerson:{   //收藏文章的人（存入用户ID）
        type:Array,
    },
    articleCommentCount:{   //文章评论数
        type:Number,
        required:true,
        default:0
    },
    articleCommentPerson:{   //评论文章的人（存入用户id+评论内容+评论时间）
        type:[{
            userId:{
                type:String,
                required:true,
                unique:true
            },
            userName:{
                type:String,
                required:true,
                unique:true
            },
            articleCommentContent:{
                type:String,
                required:true,
            },
            articleCommentDate:{
                type:Date,
                required:true,
                default:Date.now()
            }
        }],
    },
    articleCreateDate:{     //文章创建时间
        type:Date,
        required:true,
        default:Date.now()
    },
    reExamined:{            //通过审核的显示
        type:Boolean,
        required:true,
        default:false
    },
    unreExamined:{            //没通过审核的显示
        type:Boolean,
        required:true,
        default:false
    },
    reExaminedMessage:{     //审核信息
        type:String,
    },
});

let articleModel = mongoose.model('article',articleSchema);//创建模型对象

module.exports = articleModel;