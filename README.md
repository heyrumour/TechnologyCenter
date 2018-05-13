## 技术中心

## 简介
- 本项目采用fis3搭建多页面web架构
- [fis3](http://fis.baidu.com/fis3/docs/beginning/intro.html)

## 启动项目
- 安装fis3
```
npm i fis3 -g
```
- 用anywhere启用一个本地静态资源服务
```
npm i anywhere -g
npm run server 或直接在根目录执行anywhere
// 浏览路径：http://127.0.0.1:8000/devPub/views/index.html
```
- 启动fis3的开发命令打包
```
npm run dev
```
- 启动fis3的生产命令打包
```
npm run prod
```

## 目录结构
- static: 静态资源，样式、图片、js、库文件
- views: 页面html文件
- devPub: 开发模式打包路径
- staticPub: 生产模式打包路径

## 使用到的技术

[jquery](https://github.com/jquery/jquery) 操作dom和兼容

[fis3，前端构建工具](http://fis.baidu.com/)开发
