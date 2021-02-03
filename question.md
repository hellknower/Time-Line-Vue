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