# 框架说明

#### 技术栈
- react-native
- EcmaScript 2015 (ES6)
- eslint, babel-eslint 代码质量及代码风格

#### ReactNative第三方模块

| 模块   |      说明
|----------|:-------------:|
| React-Native 15.0 |  跨平台移动App开发框架
| React-Redux |    路由支持
| [react-native-code-push](https://github.com/Microsoft/react-native-code-push) | 热更新支持 ios , android
| [react-native-animatable](https://github.com/oblador/react-native-animatable) | 动画支持库(IOS,Android)
| [react-native-viewpager](https://github.com/race604/react-native-viewpager) | 兼容IOS和Android的 ViewPage控件,
| [react-native-router-redux](https://github.com/qwikly/react-native-router-redux) | 路由组件,整合了React-Redux, 整合了 `Nav` 和 `TabBar`组件
| [react-native-collapsible](https://github.com/oblador/react-native-collapsible) | 折叠组件,兼容 android和ios
| [react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view) | 支持`横向滑动`和`点击`的选项卡组件, 兼容 Android 和 ios, Android使用的是ViewPageAndroid, ios使用的是ScrollView
| [react-native-gesture-password](https://github.com/Spikef/react-native-gesture-password) | 纯JS实现的 手势密码组件 兼容 ios 和 android
| [react-native-simple-store](https://github.com/jasonmerino/react-native-simple-store) | 对React Native's AsyncStorage 的简单封装




# 更多第三方模块

https://js.coach/react-native


# 目录节构
```

├── .babelrc            <--- babel白名单配置,允许的 ES6,ES7的属性
├── .editorconfig       <--- 通用编辑器配置文件
├── .eslintignore       <--- ESLint 忽略名单
├── .eslintrc           <--- ESLint 规则配置
├── .gitignore          <--- Git 忽略名单
├── README.MD
│
├── app                 <--- app 主要工作区
│   ├── baseComponents      <--- 通用组件  Button组件,NaviBar组件,Article组件...
│   ├── components          <--- 组件  每个完整的单面   我和微金所组件,产品新闻组件,培训组件,展业组件...
│   ├── containers          <--- 路由配置,聚合组件
│   ├── config          <--- 全局配置存放位置 , 包含全局配置,WebApi接口配置
│   ├── libs                <--- 这里放一些公用的lib
│   ├── reducers            <--- redux reducers
│   └── styles             <--- 配置,全局颜色配置,包括字体,字号,颜色,工具条等颜色样式
├── assets              <--- 静态资源 RN里可以通过 require('../../assets/yourResName.name')
│   ├── loginBg.jpg
│   ├── tab1.png
│   ├── tab2.png
│   ├── tab3.png
│   └── tab4.png
│
├── mockServer         <--- 模拟http请求数据数
│   ├── index.js        <--- http服务器 入口文件
│   └── public          <--- json数据 都放到这个文件夹中
│
├── index.android.js    <--- android主入口
├── index.ios.js        <--- ios主入口
│
├── buildAndroid.sh   <-- 构建 android apk  需要执行权限
├── bundle.sh       <-- 生成 jsbundle,并发布到 codepush server 需要执行权限
│
├── ios                 <--- ios工程目录
├── android             <--- android工程目录
│
├── ReactNativeSinppet.jar  <--- ReactNative 代码模板
└── package.json

```


# 环境配置

#### WebStrom 开发环境配置
1. 确定启用node环境 Language & FrameWorks -> Node And Npm -> Node Core Library enable 为 `enable`
2. Javascript Version 为 `JSX Harmony`
3. Javascript -> Libray -> ECMAScript 6 勾选
4. 启用ESLint代码质量及代码风格检查 Javascript -> Code Qutity tool -> Eslint
5. 安装ReactNative代码模板 files->import-> `ReactNativeSinppet.jar`

#### Android环境配置
请参考 http://react-native.cn/docs/android-setup.html#content

- 必需安装 `Android SDK`, `VirtualBox`, `Genymotion模拟器`, `jdk`
- 可选安装 `Android Studio`



# 如何测试
#### 在模拟器上测试 Android

测试时 **必须首先启动** `Genymotion`虚拟机,运行命令, `注意: 第一次运行时,会自动下载一些jar依赖包,需要等待几分钟`

```sh
react-native run-android
```

#### 在真机上测试 Android

#### 在模拟器上测试 IOS

1. 用`xcode`打开`ios/WealthApp.xcodeproj`
2. 选择一个ios模拟器,可选`iphone6`,`iphone6 plus`,`iphone5`等
3. 按下`Commond+R`启动测试

提醒: 在模拟器中,按下`Command+D`可以调出设置菜单


#### 在真机上测试 IOS
1. 首先通过数据线将`开发机`和`iphone真机`连接
2. 用`xcode`打开`ios/WealthApp.xcodeproj`,选择 `xxx的iphone`
3. 按下`Command+R`,程序会自动安装到iphone真机上并启动,可以在xcode里查看调试信息

提醒: `晃动手机可以调出设置菜单`




# 如何开发
#### 添加一个新组件
在`app/components`目录下添加一个 js 命名为 `NewComponent.js`

`注意:根据组件命名规范,组件首字母必须大写`

    ```
    // NewComponent.js

    import React,{View,Text} from 'react-native';

    class NewComponent from React.Component{
        // 构造
        constructor(props){
            super(props);
            // 实现getInitState
            this.state = {
                ...
            }
        }
        // 渲染
        render(){
        }

        // 默认属性
        static defaultProps = {
        }
        // 属性类型
        static protoTypes = {
        }

    }
    // 导出组件
    export default NewComponent;
    ```

**快速生成组件代码**  输入 `rnC` 按下 `Tab`键 自动生成组件样板代码

#### 添加一个新路由
编辑`app/containers/app.js`

    ```
    // app/containers/app.js

    ...
    // 引用组件
    import NewComponent from '../components/NewComponent';
    ...
    // 定义路由
    <Route name='NewComponent' component={NewComponent} hideBar={false}/>
    ```

**路由属性说明**

- name      路由名称
- component
- type
- hideBar   `true` 或 `false` 默认为`false`
- hideFoot  `true` 或 `false` 默认为`false`

#### 命名规范
1. 组件名称`每个单词的首字母都要大写` 包括`组件文件名`,`类名`

    ```
    // NewComponent.js
    class NewComponent from React.Component{
    }
    export default NewComponent;
    ```
2. 路由命名 `第一个单首字母小写,第二个单词首字母大写`
    ```
    <Route name="demo" component={Demo} />
    ```

# 配置
全局颜色配置说明
text


# 打包 Android Apk
在项目根目录下执行 `buildAndroid.sh`,确保该脚本有执行权限, `chmod +x buildAndroid.sh`

```
# 赋予执行权限
chmod +x buildAndroid.sh

# 执行编译apk
./buildAndroid.sh
```

`apk` 默认保存到 `android/app/build/outputs/apk`


# 模拟http请求数据 mockServer

将需要模拟的数据文件以json格式保存到 `mockServer/public`下,然后 运行 `mockServer/index.js`

测试用例
http://127.0.0.1:3001/test.json




# 有价值的参考文章
- [React/React Native 的ES5 ES6写法对照表](http://bbs.react-native.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8)