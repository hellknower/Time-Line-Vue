# 时间线项目编写时遇到的问题
## 使用stylus
- 1.使用
```
<style lang="stylus" rel="stylesheet/stylus">

</style>
```
- 2.安装
  - 在vue中使用时必须配合stylus-loader
  - stylus-loader版本不能过高,必须配合当前的webpack版本以及stylus版本,项目中使用的是3.0.2
- 3.暂时未遇到问题
  - 网络上推荐使用webpack.base.config.js进行,这里刚开始使用时并没有因为没有配置而产生错误

## vue框架中监听enter事件
- 在cli中监听enter之类的按键事件需要使用.native
  - 问题指向 - login界面的对input的按键监听事件

## 前端发送数据后端接受不到
- 使用body-parse
```
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

## 跨域
- 此项目中使用的是配置vue.config.js的方法
```
  devServer: {
    proxy: {
        
        '/api': {
            target: 'http://localhost:8088',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
    }
  }
```
## Mongoose使用
- mongoose.connect返回一个promise对象

## 提出问题
- vue中是使用函数中新建的参数还是使用state中创建的属性?那种相对来说更优?
  - 问题指向 - login界面中的isRight属性,是在函数中创建还是在state中创建?
- 需要抽离组件么?
  - 问题指向 - login界面中,登录,忘记密码,注册用户三个地方都使用到了用户名,密码的输入框是否有必要将其抽离为单独的组件
  - 延展想法 
    - 1.import后的组件是否已经被请求,多次加载是否会产生多余的请求,增加消耗
    - 2.载入组件的耗费和多写几遍div造成的耗费谁更大?

## 为什么不使用element中的form表单
- 可能其中一个元素被多次调用，减少对象调用的频率

## mongoDB不能有两个id值
- server文件夹下的articleModel.js
- 其中开始定义了articleID和userID，报错 
```
[MongoError: E11000 duplicate key error collection: zhihu.people index: _id_ dup key
```
- 原因：mongoDB自动生成的ID值重复

## 数据库表应该怎么设计？（不确定）
- 文章表中只存入用户ID，导致页面中需要获取用户名时需要根据用户ID重新发送请求，可能会造成大量的资源占用
- 解决方法：在后端中对数据进行处理后一次性返回到前端
- 将数据处理方面的操作尽量放在后端处理，减少前端消耗，防止用户使用时可能会造成的卡顿