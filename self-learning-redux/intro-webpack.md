# webpack是什么
webpack本质是一个模块打包工具，能够处理各种项目依赖，处理不同类型文件less scss jsx png jpg等文件

# 工作流程
根据entry找到入口文件，output对应输出路径。其中可以使用不同的plugin，并且对于不用的文件类型使用不同的loader，列出几个点

## plugin
- 将js引入到html  HtmlWebpackPlugin
- 抽离css文件     ExtractTextPlugin
- 热替换等        NamedModulesPlugin...
- 清除编译结果    CleanWebpackPlugin

## loader
各种文件类型的loader