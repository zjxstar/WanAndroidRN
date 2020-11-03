# WanAndroid React-Native 版

## 简介

使用 React-Native 开发的玩Android APP，使用鸿洋大神提供的 Open Api 完成。

**注意：**本人只做了 Android 版本，没有适配 iOS ，仅供 RN 入门学习使用。代码不完善之处请谅解。

[WanAndroid官网](https://www.wanandroid.com/)

[WanAndroid Open Api](https://www.wanandroid.com/blog/show/2)

[Demo源码地址](https://github.com/zjxstar/WanAndroidRN)

* [React-Navigation](https://reactnavigation.org/docs/getting-started)：路由处理方案，提供 BottomTab 、TopTab 、Drawer 、路由跳转等功能，是构建 App 页面层次的基础。
* [React Redux](https://redux.js.org/introduction/getting-started)：全局状态管理方案，用于处理应用中复杂状态的转换、传递等问题，模板代码较多，存在一定的风险。
* [redux-thunk](https://github.com/reduxjs/redux-thunk)：Redux 的中间件，配合 Redux 进行状态管理，提供了异步方案，可以和页面绑定。
* [axios](https://github.com/axios/axios)：网络请求库，封装了 get 、post 等网络请求代码，提供 request 、response 的拦截器功能。
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)：图标库，很多第三方 RN 库都有使用。
* [react-native-webview](https://github.com/react-native-webview/react-native-webview)：WebView 库，负责加载网页资源。
* [@react-native-community/async-storage](https://github.com/react-native-async-storage/async-storage)：本地持久化库，用于存储应用级信息到本地，如：Cookie、用户的登录信息等。
* [lodash](https://www.lodashjs.com/)：js 的工具函数库，提供了很多工具方法。
* [React Native Elements](https://reactnativeelements.com/docs/)：二次封装的常用组件库，提供了很多常用组件，比原生的使用更方便。
* [react-native-swiper](https://github.com/leecade/react-native-swiper)：Swiper 组件，可用于构建 Banner 图等。
* [rn-placeholder](https://developer.aliyun.com/mirror/npm/package/rn-placeholder)：RN 骨架组件，用于初始化 loading 过程。

## 功能模块

主 Tab 页模块：**首页**、**体系**、**公众号**、**导航**、**项目**。

其他功能模块：**登录/注册**、**搜索**、**我的收藏**、**TODO**等。

![应用截图1](https://github.com/zjxstar/WanAndroidRN/blob/master/screenshots/meitu_1.jpg)

![应用截图2](https://github.com/zjxstar/WanAndroidRN/blob/master/screenshots/meitu_2.jpg)

![应用截图3](https://github.com/zjxstar/WanAndroidRN/blob/master/screenshots/meitu_3.jpg)

![应用截图4](https://github.com/zjxstar/WanAndroidRN/blob/master/screenshots/meitu_4.jpg)

## 遇到的问题和解决方案

### 1、是否使用 Redux ？

简单应用或者无复杂状态传递的应用无需使用 Redux 。使用 Redux 时要注意状态管理紊乱的问题，比如有顶部 Tab 的页面就不适合 Redux ，不同 Tab 页的状态不能用一个 Reducer 管理，会相互影响的。像给文章点赞这种功能比较适合 Redux ，方便页面刷新。

### 2、怎么监听页面的 onResume 、onStop 状态？

RN 中的页面就是一个 Component，而 Component 的生命周期中并没有类似 Android 的 onResume 这样的回调，所以想监听这种生命周期，需要使用 React Navigation 中的 navigation.addListener 方法。具体详见文档：https://reactnavigation.org/docs/navigation-events

```
this.props.navigation.addListener('focus', () => {
            const { isLogin } = that.props
            if (isLogin != lastIsLogin) {
                that.refreshPage()
                lastIsLogin = isLogin
            }
        })
```

### 3、MIUI 12 会影响组件的文案显示，如何处理？

MIUI 12 的优化会将 RN 中组件 Text 的文案强制末尾换行，需要特殊处理。

```
/** 解决Text在miui系统上出现截断问题 */
const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' }
  })
};

const oldRender = Text.render;
Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [defaultFontFamily, origin.props.style]
  });
};
```

### 4、使用 React Navigation 构建页面层次时需要注意 Drawer 和 Tab 页面的包含关系？

React Navigation 注册页面是比较自由的，但是如果应用中包含 Drawer 页面和 Tab 页面时需要注意它们的包含关系，父级可以将状态传递给子级。本 Demo 中就是 Drawer 包含 Tab。具体规则可见 React Navigation 的官方文档。

### 5、是否需要做 px 转换？

```
/**
 * 本项目设计基准像素为750 * 1334，使用时视情况调整
 * 按比例将设计的px转换成适应不同屏幕的dp
 * @param designPx 设计稿标注的px值
 * @returns {number}
 */
export function getRealDP(designPx) {
    return designPx * DEVICE_WIDTH / BASE_LINE ;
}
```

### 6、适配 iOS ？

有一些原生组件、api 是 iOS 和 Android 平台特有的，要么通过判断平台来分别处理，要么自定义组件来统一。

### 7、A 页面如何在 B 页面 goBack 时处理特定逻辑，类似 Android 中的 startActivityForResult ？

React Navigation 中的页面回退是无法携带参数的，这就需要在 A 调整 B 时再参数里传递一个 callback 回调函数，在 B 返回之前调用这个 callback 即可，需要我们转换一下 Android 中的开发思维。

## 参考

感谢以下两个项目的帮助：

[Flutter 版 WanAndroid 客户端](https://www.wanandroid.com/blog/show/2705)

[React Native版玩Android项目](https://www.wanandroid.com/blog/show/2681)

## 开源协议

Apache License 2.0