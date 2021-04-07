const mongoose = require("mongoose");

let Schema = mongoose.Schema;   //创建约束

let userPersonelSchema = new Schema({
    userId:{            //用户id
        type:String,
        required:true,
        unique:true
    },
    likeCount:{         //点赞数
        type:String,
        required:true,
        unique:true
    },
    collectCount:{      //收藏数
        type:String,
        required:true
    },
    commentCount:{      //评论数
        type:Date,
        required:true
    },
    articleCount:{      //文章
        type:String,
        required:true
    },
    browsingHistory:{   //浏览历史
        type:Date,
        required:true
    },
});

let userModel = mongoose.model('UserPersonel',userPersonelSchema);//创建模型对象

module.exports = userModel;