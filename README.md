
## LoveEmpathy

### 个人介绍

一个在前端匍匐前进的人，主要致力于小程序全系列前端开发，什么都学，什么都不通。非常喜欢交朋友，有兴趣一起吹牛*！！！

---

### 关于本项目
> 该项目是由github上MingliangLu的[开源项目](https://github.com/MingliangLu/WeTypecho)修改而来，小程序前端完全重构，目前小程序只有微信小程序。该项目可以帮助您快速的将Typecho博客的内容映射到微信小程序上，搭建非常简单容易上手。

截图：

![1.jpg][1]

### 鸣谢及说明

###### 项目插件：WeTypecho

> 该项目是在[WeTypecho](https://github.com/MingliangLu/WeTypecho)项目基础上修改重构而来的，前端虽然重构UI但是整体布局还是参照部分原有布局。原作者blog：https://2012.pro

###### 富文本插件：towxml

> 该项目前端文章详情页使用的markdown解析插件为[towxml](https://github.com/sbfkcel/towxml)开源项目，有需要的朋友可以去了解下

###### 样式库：Color UI

> 该项目样式库使用的是[Color UI](https://github.com/weilanwl/ColorUI)，一个非常棒的样式及组件库，已用Color UI开发多个项目，建议大家去使用一下

感谢以上开发者无私的奉献

### 问题帮助

> 因为搭建非常简单，按照安装说明即可。如还未成功安装，请联系QQ:1403697854

---


### 更新
> 前端
#### v0.0.1

- [x] 首页UI
- [x] 排行UI
- [x] 文章详情UI

#### 计划更新

- [ ] 小程序页脚显示
- [ ] 用户授权登陆
- [ ] 文章详情点赞
- [ ] 文章详情评论
- [ ] 顶部banner跳转文章
- [ ] 文章分享转发

> 后端

#### v0.0.1
增加getAbout接口，用于获取关于文章详情

---


### 安装准备
> 小程序统一要求必须满足一下两个条件：

1. 已备案的域名
2. 域名已开启https

### 安装Typecho
> 如果你已经知道什么是Typecho，并且已经部署在你的网站上了，还需要做两件事：

1. 设置固定链接  
2. 开启Https

如果你没有了解或搭建过Typecho，建议查看[自娱自乐]的博客：[使用宝塔面板快速搭建Typecho个人博客](https://2012.pro/index.php/20180811/cid=77.html)

### 安装并设置WeTypecho插件

1. 下载或clone项目:[WxappForTypecho](https://github.com/loveempathy/WxappForTypecho)
2. 将WeTypecho上传至服务器站点目录/usr/plugins目录下，然后进入Typecho后台插件管理(控制台->插件)，启用WeTypecho插件，然后点设置
![1.png][2]
3. 登陆[小程序管理后台](https://mp.weixin.qq.com/)点击菜单 开发->服务器域名  配置服务器域名
4. 下载微信开发者工具，并且导入clone的项目目录下的wxapp目录
5. 在微信开开发者工具中打开app.js文件，找到config字段，修改其中的url字段值改为你的博客地址，apisec字段值改为任意字符(需与插件设置一致，否则无法读取数据)。
6. 确认无误后，点击开发者工具上的上传按钮，上传代码，然后在[小程序管理后台](https://mp.weixin.qq.com/) 管理->版本管理->开发版本  提交审核即可


  [1]: https://cdn.loveempathy.com/blog1.jpg1
  [2]: https://loveempathy.com/usr/uploads/2019/12/937410795.png
