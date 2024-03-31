## adb

如果要使用uniapp调试安卓程序，那么就需要adb调试桥，adb就是一个壳子，里面可以运行安卓代码。



## 开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，uni-app 约定了如下开发规范:

1. 页面文件遵循 Vue 单文件组件 (SFC) 规范
2. 组件标签靠近小程序规范，详见<a href="https://uniapp.dcloud.net.cn/component/">uni-app 组件规范</a>
3. 接口能力(JS API)靠近微信小程序规范，但需将前缀 wx 替换为 uni，详见<a href="https://uniapp.dcloud.net.cn/api/">uni-app接口规范</a>
4. 数据绑定及事件处理同 Vue.js 规范，同时补充了App及页面的生命周期
5.  为兼容多端运行，建议使用flex布局进行开发，推荐使用rpx单位(750设计稿)。
6. 文档直接查看uni-app的官网文档: https://uniapp.dcloud.net.cn/



## 条件编译

```js
// #ifdef VUE3
// #endif


// #ifndef VUE3
// #endif
```



## App.vue

1. 应用的生命周期
2. 编写全局样式
3. 定义全局数据 globalData

注意:应用生命的周期仅可在App.vue中监听，在页面监听无效。



## **全局和局部样式**

- 全局样式
  - App.vue 中style的样式为全局样式，作用于每一个页面
    - App.vue 中通过 @import 语句可以导入外联样式，一样作用于每一个页面。
  - uni.scss 文件也是用来编写全局公共样式，通常用来定义全局变量。
    - uni.scss 中通过 @import 语句可以导入外联样式，一样作用于每一个页面。
    - 在uni.scss中定义的变量，我们无需 @import 就可以在任意组件中直接使用。
  - `import '../../../index.scss'`
- 局部样式
  - 在 pages 目录下 的 vue 文件的style中的样式为局部样式，只作用对应的页面，并会覆盖 App.vue 中相同的选择器.
  - vue文件中的style标签也可支持scss等预处理器。
  - style标签默认开启scoped



## 全局数据

- getApp() 函数( 兼容h5、weapp、app )**:**

  - 用于获取当前应用实例，可用于获取globalData 。

- getCurrentPages() 函数**(** 兼容h5、weapp、app )

  - 用于获取当前页面栈的实例，以数组形式按栈的顺序给出。

    - 数组:第一个元素为首页，最后一个元素为当前页面。

  - 仅用于展示页面栈的情况，请勿修改页面栈，以免造成页面状态错误。

  - 常用方法如下图所示:

    ![image-20240330181551300](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330181551300.png)

    定义：

    <img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330182218568.png" alt="image-20240330182218568" style="zoom:50%;" />

    

    使用：

    <img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330182239964.png" alt="image-20240330182239964" style="zoom:50%;" />



## page.json

- page.json全局页面配置(兼容h5、weapp、app )

  - pages.json 文件用来对 uni-app 进行全局配置，类似微信小程序中app.json。
  - 决定页面的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

  ![image-20240330184828082](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330184828082.png)

## **manifest.json**

manifest.json应用配置

- Android平台相关配置
- iOS平台相关配置
- Web端相关的配置
- 微信小程序相关配置



## **常用内置组件**

-  view:视图容器。类似于传统html中的div，用于包裹各种元素内容。(视图容器可以使用div吗?可以，但div不跨平台) 
- text:文本组件。用于包裹文本内容。
- button:在小程序端的主题 和 在其它端的主题色不一样(可通过条件编译来统一风格)。
- image:图片。默认宽度 320px、高度 240px
  - 仅支持相对路径、绝对路径，支持导入，支持 base64 码;
- scrollview:可滚动视图区域，用于区域滚动。
     -  使用竖向滚动时，需要给` <scroll-view>` 一个固定高度，通过 css 设置 height
     -  使用横向滚动时，需要给`<scroll-view>`添加white-space: nowrap;样式，子元素设置为行内块级元素。 
     -  APP和小程序中，请勿在 scroll-view 中使用 map、video 等原生组件。
     -  小程序的 scroll-view 中也不要使用 canvas、textarea 原生组件。
     -  若要使用下拉刷新，建议使用页面的滚动，而不是 scroll-view 。
- swiper:滑块视图容器，一般用于左右滑动或上下滑动比如banner轮播图。
       -  默认宽100%，高为150px，可设置swiper组件高度来修改默认高度，图片宽高可用100%。
       

## **尺寸单位(rpx)

- uni-app 支持的通用 css 单位包括 px、rpx(推荐单位)、vh、vw
  - px 即屏幕像素，rpx 是响应式像素( responsive pixel )，可以根据屏幕宽度进行自适应。
  - 规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素。则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
  - 建议: 开发微信小程序时设计师可以用 iPhone6 作为设计稿的标准(即:设计稿宽度为750px)。

![image-20240330191834777](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330191834777.png)

## **样式导入**

- 使用@import语句可以导入外联样式(css 或 scss)
- @import后跟需要导入的外联样式表的相对路径， 用 ; 表示语句结束。
  - 除了相对路径，默认是支持绝对路径(即@别名前缀)
    - 相对路径:../../common/base.css
    - 相对路径:../../common/base.css

## **背景图片**

- uni-app 支持使用在 css 里设置背景图片，使用方式与普通 web 项目大体相同，但需要注意以下几点:

  - 支持 base64 格式图片，支持网络路径图片。

  - 小程序不支持在 css 中使用本地文件，包括背景图和字体文件，需转成 base64 后使用。如何转?

  - 使用本地背景图片或字体图标需注意:

    -  为方便开发者，在背景图片小于 40kb 时，uni-app 编译到不支持本地背景图的平台时，会自动将其转化为 base64 格式;

    - 图片大于等于 40kb，会有性能问题，不建议使用太大的背景图，如开发者必须使用，则需自己将其转换为 base64 格式使

      用，或将其挪到服务器上，从网络地址引用。

    - 本地背景图片的引用路径推荐使用以 ~@ 开头的绝对路径。

  <img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330192017822.png" alt="image-20240330192017822" style="zoom:50%;" />



## **字体图标**

- uni-app 支持使用字体图标，使用方式与普通 web 项目相同，注意事项也会背景图片一样，使用步骤如下:

  - 先制作字体图标，比如:可以在iconfont网站中生成
  - 将字体图标文件引入项目，比如:iconfont.ttf
  - 在全局的css中引入字体图标，比如:App.vue

  ![image-20240330192121101](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240330192121101.png)



## 扩展组件(uni-ui)

- **什么是** **uni-ui**?
  - uni-ui是DCloud提供的一个UI组件库，一套基于Vue组件、flex布局的跨全端UI框架。 
  - uni-ui不包括uni-app框架提供的基础组件，而是基础组件的补充。
    - 详情:https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html

-  **uni-ui** **特点**
  -  高性能
    - ✓ 目前为止，在小程序和混合app领域，uni-ui是性能的标杆。
    -  ✓ 自动差量更新数据。uni-app引擎底层会自动用diff算法更新数据。
    -  ✓ 优化逻辑层和视图层通讯折损。 比如，需要跟手式操作的UI组件，底层使用了wxs、bindingx等技术，实现了高性能的交互体验
      - WXS(WeiXin Script)是小程序的一套脚本语言，结合 WXML，可以构建出页面的结构。在 iOS 设备上小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍。
      - bindingx技术提供了一种称之为表达式绑定(Expression Binding) 的机制，在 weex 上让手势等复杂交互操作以60fps的帧率流畅执行，而不会导致卡顿。 
  -  全端
     -  ✓ uni-ui的组件都是多端自适应的，底层会抹平很多小程序平台的差异或bug。
     -  ✓ uni-ui还支持nvue原生渲染、以及PC宽屏设备  风格扩展
     -  ✓ uni-ui的默认风格是中型的，与uni-app基础组件风格一致。
     -  ✓ 支持<a href="https://uniapp.dcloud.net.cn/collocation/uni-scss.html">uni.scss</a> ，可以方便的扩展和切换应用的风格。



## **安装** **uni-ui** **组件库**

- **方式一(推荐):通过** **uni_modules**(插件模块化规范)单独安装组件，通过 uni_modules 按需安装某个组件: 
  - 步骤1:官网找到扩展组件清单，然后将所需要的组件导入到项目，导入后直接使用，无需import和注册。 
  - 步骤2:通常我们还想切换应用风格，这时可以在uni.scss导入uni-ui提供的内置scss变量，然后重启应用。 
  - ✓ 注意:需要登录 DCloud 账号才能安装
- **方式二(推荐) :通过** **uni_modules** 导入全部组件
  - 如想把所有uni-ui组件导入到项目，可以借用Hbuilder X插件导入。
  - 如没自动导入其他组件，可在 uni-ui 组件目录上右键选择 安装三方插件依赖 即可。
- **方式三:在 HBuilderX新建uni-app项目时，在模板中选择uni-ui模板来创建项目**
  - 由于uni-app独特的<a href="https://uniapp.dcloud.net.cn/collocation/pages.html#easycom">easycom(自动导包)技术</a>，可以免引入、注册，就直接使用符合规则的vue组件。


- **方式四:npm安装**

  - 在 vue-cli 项目中可用 npm 安装 uni-ui 库。
  - 或直接在 HBuilderX 项目中用 npm安装 。



## **定制** **uni-ui**主题风格

- 修改<a href="https://uniapp.dcloud.net.cn/component/uniui/uni-sass.html">重写组件库主题色</a> （定制主题色）



## 全量导入uni组件库



## 重写第三方组件库样式

- 小程序、App直接重写，需要添加 important
- H5、App和小程序使用:global( selector ) ，需要添加important 
- H5 、App和小程序使用:deep( selector ) ，需要添加important

在当前组件库中：

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331100058067.png" alt="image-20240331100058067" style="zoom:50%;" />





## **跨平台兼容**

- uni-app能实现一套代码、多端运行，核心是通过编译器 + 运行时实现的:
  - 编译器: 将uni-app统一代码编译生成每个平台支持的特有代码;如在小程序平台，编译器将.vue文件拆分生成wxml、wxss、js等。 
  - 运行时: 动态处理数据绑定、事件代理，保证 Vue和对应宿主平台 数据的一致性;

-  跨平台存在的问题:

  -  uni-app 已将常用的组件、JS API 封装到框架中，开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。

  -  但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。
    - ✓ 大量写 if else，会造成代码执行性能低下和管理混乱。
    -  ✓ 编译到不同的工程后二次修改，会让后续升级变的很麻烦。

- 跨平台兼容解决方案:
  - 在 C 语言中，通过 #ifdef、#ifndef 的方式，为 windows、mac 等不同 os 编译不同的代码。
  - uni-app 参考这个思路，为 uni-app 提供了条件编译手段，在一个工程里优雅的完成了平台个性化实现。

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331100404728.png" alt="image-20240331100404728" style="zoom:50%;" />

## 条件编译

- 条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。
- 具体的语法:以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。 
  - #ifdef:  if defined 仅在某平台存在
  - #ifndef:  if not defined 除了某平台均存在
  - **%PLATFORM%**:平台名称

- 支持条件编译的文件
  - .vue(template 、script 、style)
  - .js 、.css 、pages.json
  - 各预编译语言文件，如:.scss、.less、.stylus、.ts、.pug

- 例如:设置页面的标题
  - H5专有API:document.title = ’’
  - 微信小程序专有API:wx.setNavigationBarTitle(object)

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331100642353.png" alt="image-20240331100642353" style="zoom:50%;" />



<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331100630685.png" alt="image-20240331100630685" style="zoom:50%;" />



- 在template模板中使用条件编译

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331101021419.png" alt="image-20240331101021419" style="zoom:50%;" />

- 在script脚本中条件编译

  ```js
  onLoad() {
    // #ifdef H5
    document.title = 'H5'
    // window.xxx
    // #endif
  
    // #ifdef MP-WEIXIN
    wx.setNavigationBarTitle({
      title: "WeApp"
    })
    // wx.login()
    // #endif
  },
  onReady() {
    // #ifdef APP-PLUS
    uni.setNavigationBarTitle({
      title: 'App'
    })
    uni.setNavigationBarColor({
      frontColor:'#ffffff',
      backgroundColor: '#ff8198'
    })
    console.log('App ========> ');
    // #endif
  },
  ```



- 在css中编译

```css
/* #ifdef H5 */
  .c-title {
    color: red;
  }
/* #endif */

/* #ifdef MP-WEIXIN */
  .c-title {
    color: blue;
  }
/* #endif */

/* #ifdef APP-PLUS */
  .c-title {
    color: green;
  }
/* #endif */
```



## 条件编译-注意事项

- 条件编译是利用注释实现的，在不同语法里注释写法不一样 
  - js使用 // 注释
  - css 使用 /* 注释 */
  - vue/nvue 模板里使用 ` <!-- 注释 -->`

- 条件编译 APP-PLUS 包含 :APP-NVUE 和 APP-VUE
- APP-PLUS-NVUE 和 APP-NVUE 没什么区别，为了简写后面出了 APP-NVUE
- 使用条件编译请保证编译前和编译后文件的正确性，比如 json 文件中不能有多余的逗号
- Android 和 iOS 平台不支持条件编译，如需区分 Android、iOS 平台，请通过调用 uni.getSystemInfo 来获取平台信息 
- 微信小程序主题色是绿色，而百度支付宝小程序是蓝色，应用想分平台适配颜色，条件编译是代码量最低、最容易维护的



## 新建Page页面

- uni-app页面是编写在pages目录下:
  - 可直接在 uni-app 项目上右键“新建页面”，HBuilderX会自动在pages.json中完成页面注册。
  - HBuilderX 还内置了常用的页面模板(如图文列表、商品列表等)，这些模板可以大幅提升你的开发效率。
- 注意事项:
  -  每次新建页面，pages.json会自动配置pages列表(手动才需配置)
  - 未在pages.json -> pages 中配置的页面，uni-app会在编译阶段进行忽略。
- 删除页面:
  - 删除.vue文件 和 pages.json中对应的配置
- 配置tabBar
  - color
  - selectedColor
  - list -> pagePath、text、iconPath、selectedIconPath

## **页面路由**

- uni-app 有两种页面路由跳转方式:使用navigator组件跳转、调用API跳转(类似小程序，与vue-router不同)。
  - 组件:navigator
  - API:navigateTo、redirectTo、navigateBack、switchTab

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331105336244.png" alt="image-20240331105336244" style="zoom:50%;" />



- 跳转页面会导致底部的tabBar都没有了。

## **页面之间通讯**

- 在uni-app中，常见页面通讯方式:
  - 方式一:url查询字符串和EventChannel
  - 方式二:使用事件总线
  - 方式三:全局数据 globalData
  - 方式四:本地数据存储
  - 方式五:Vuex和Pinia，状态管理库。



- **方式一:url和EventChannel(兼容h5、weapp、app)**
  - 直接在url后面通过查询字符串的方式拼接
    -  如url查询字符串出现特殊字符等格式，需编码
  - 然后可在onLoad生命周期中获取url传递的参数
  - EventChannel 对象的获取方式
    - Options语法: `this.getOpenerEventChannel()`
    - Composition语法: `getCurrentInstance().proxy. getOpenerEventChannel()`



- 方式二： 事件总线

  - **uni.$emit( eventName, OBJECT )** 	触发全局的自定义事件。
  - **uni.$on( eventName, callback )**   监听全局的自定义事件。
  - **uni.$once( eventName, callback )**   由 uni.$emit 触发。
  - **uni.$off( eventName, callback )**  只监听一次全局的自定义事件。由 uni.$emit 触发 移除全局自定义事件监听器。
    - 如果没有提供参数，则移除所有的事件监听器;

  

  - 注意事项
    - 需先监听，再触发事件，比如:你在A界面触发，然后跳转到B页面后才监听是不行的。
    - 通常on 和 off 是同时使用，可以避免多次重复监听
    - 适合页面返回传递参数、适合跨组件通讯，不适合界面跳转传递参数






### 组件路由跳转

```vue
<view class="">1.路由(组件)</view>
<navigator url="/pages/detail01/detail01" open-type="navigate">
  <button type="default">01-detail navigate</button>
</navigator>

<navigator url="/pages/detail01/detail01" open-type="redirect">
  <button type="default">02-detail redirect</button>
</navigator>

<navigator url="/pages/category/category" open-type="switchTab">
  <button type="default">03-category</button>
</navigator>
```



### API路由跳转

```vue
<view class="">2.路由(API)</view>
<button type="default" @click="goToDetail01()">04-detail navigate</button>
<button type="default" @click="goToDetail02()">04-detail redirect</button>
<button type="default" @click="goToDetail03()">04-detail switchTab</button>

<script>
export default {
  methods: {
    goToDetail01() {
      uni.navigateTo({
        url: "/pages/detail01/detail01"
      })
    },
    goToDetail02() {
      uni.redirectTo({
        url: "/pages/detail01/detail01"
      })
    },
    goToDetail03() {
      uni.switchTab({
        url: "/pages/category/category"
      })
    },
  }
}
</script>
```



### 页面参数传递(page ==> detail)

```vue
<view class="">3.页面传递参数(正向)</view>
<navigator url="/pages/detail01/detail01?name=liujun&id=100" open-type="navigate">
  <button type="default">01-detail navigate</button>
</navigator>
<button type="default" @click="goToDetail()">04-detail navigate</button>

goToDetail() {
  uni.navigateTo({
    url: "/pages/detail01/detail01?name=liujun&id=200",
    success(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFormHomePage', {
        data: '我是从Home Page 传递过来的数据',
      })
    }
  })
},
```

`detail01.vue`

```vue
onLoad(options) {
  console.log("接受到url的参数:", options);
   const eventChannel = this.getOpenerEventChannel();
   eventChannel.on('acceptDataFormHomePage', (data) => {
     console.log("接受到eventChannel的参数", data);
   })
}
```

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240331111739510.png" alt="image-20240331111739510" style="zoom:50%;" />



### 页面参数传递(detail ==> page)

```vue
<view class="">4.页面传递参数(逆向)</view>
<button type="default" @click="goToDetail05()">01-detail02 eventchannel</button>

goToDetail05() {
  uni.navigateTo({
    url: "/pages/detail02/detail02?name=liujun&id=400",
    events: {
      acceptDataFormDetail02(data) {
        console.log("home page 拿到detail02传递过来的数据:", data);
      }
    }
  })
}
```

detail02.vue

```vue
<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
     <!-- 不触发goBackHome --> 
			<button type="default">返回(组件)</button>
		</navigator>
		<button type="default" @click="goBackHome">返回(API)</button>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		console.log('接受url传递过来的数据:', options)
	},
	methods: {
		goBackHome() {
			uni.navigateBack({
				delta: 1
			})
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.emit('acceptDataFormDetail02', {
				data: '将detail02页面的数据传递给Home页面'
			})
		}
	}
}
</script>
```



### 事件总线传递参数

```vue
<button type="default" @click="goToDetail06()">01-detail03 事件总线</button>
onLoad() {
   	// 在page页面先监听
    // 通过事件总线在拿到详情传递回来的数据
    uni.$on('acceptDataFromDetail03', this.acceptDataFromDetail03)	
},
onUnload() {
  console.log('home onUnload');
  uni.$off('acceptDataFromDetail03', this.acceptDataFromDetail03)
},

methods: {
  goToDetail06() {
    uni.navigateTo({
      url:'/pages/detail03/detail03'
    })
  },
  acceptDataFromDetail03(value) {
    console.log('这是从detail03传递过来的数据:', value);
  },
}
```



detail03.vue

```vue
<template>
	<view>
		<navigator :delta="1" open-type="navigateBack">
			<button type="default" >返回(组件)</button>
		</navigator>
		<button type="default" @click="goBackHome">返回(API)</button>
	</view>
</template>

<script>
	export default {
		methods: {
			goBackHome() {
				uni.navigateBack({
					delta: 1
				})
				// 触发一个全局的事件( 在触发事件之前一定要先监听 )
				uni.$emit('acceptDataFromDetail03', {
					data: {
						desc: '这个在detail03传递到Home页面的数据'
					}
				})
			}
		}
	}
</script>
```





## 页面及组件生命周期

<img src="https://uniapp.dcloud.net.cn/2024-03-29_18-32-07/assets/img/uni-app-lifecycle-vue2.f3967018.png" alt="img" style="zoom: 50%;" />

1. onLoad里不能直接操作dom（响应式数据已经更新完成），
   - onLoad比较适合的操作是：接受上页的参数，联网取数据，更新data。
2. 页面onReady
   - onReady后，页面元素就可以自由操作了，比如ref获取节点。同时首批界面也渲染了。
   - 联网不要在onReady里，那样太慢了，在onLoad里早点联网
   - 有的页面template内容非常少，整页就是一个需要联网加载的列表，这会造成虽然首批dom飞快渲染了，但页面其实还是白的，联网后才能显示字和图。 此时需要在template里做一些简单占位组件，比如loading组件、骨架屏，让本地先显示一些内容。
3. 页面可以使用Vue组件生命周期吗？ 可以的
4. 页面滚动才会触发 onReachBottom 回调，如果自行通过overflow实现的滚动不会触发 onReachBottom 回调



在哪里引入uniapp组件的生命周期

```js
import {
  onLoad,
  onShow,
  onReady,
  onHide,
  onUnload,
  onPullDownRefresh,
  onReachBottom
} from '@dcloudio/uni-app'
// 1.页面的生命周期
onLoad(() => {
	console.log('detail05 onLoad')
})

// 上拉刷新
onPullDownRefresh(() => {
	console.log('detail05 onPullDownRefresh')
	setTimeout(() => {
		uni.stopPullDownRefresh()
	}, 1000)
})
// 下拉加载
onReachBottom(() => {
	console.log('detail05 onReachBottom')
})
```





## 数据缓存

- uni.setStorage(OBJECT)将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
- uni.setStorageSync(KEY, DATA)将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
- uni.getStorage(OBJECT)从本地缓存中异步获取指定 key 对应的内容。
- uni.getStorageSync(KEY)从本地缓存中同步获取指定 key 对应的内容。
- uni.removeStorage(OBJECT)从本地缓存中异步移除指定 key。
- uni.removeStorageSync(KEY)从本地缓存中同步移除指定 key。

​	区别：setStorage 是异步的，setStorageSync是同步的。如果后续逻辑必须依赖于修改storage后的数据就必须使用同步setStorageSync，如果不需要用到就可以使用异步，毕竟修改内存会有耗时。





## 组件

- uni-app 组件 Vue标准组件基本相同，但是也有一点区别，比如：
  - 传统vue组件，需要创建组件、引用、注册，三个步骤后才能使用组件， easycom组件模式可以将其精简为一步。 
  - easycom组件规范：
    - 组件需符合components/组件名称/组件名称.vue 的目录结构。
    - 组件需符合components/组件名称/组件名称.vue 的目录结构。



## 组件生命周期

- uni-app 组件支持的生命周期，与Vue组件的生命周期相同。
  - uni-app 组件支持的生命周期，与Vue组件的生命周期相同。
    - uni-app 组件支持的生命周期，与Vue组件的生命周期相同。
    - 在Composition API语法：组件中支持页面生命周期，不同端支持情况有差异。





## 页面间通讯（setup）

### 页面参数传递 (page ==> detail)

onLoad和eventchannel

```vue
<view class="">1.页面传递数据(正向)</view>
<button type="default" @click="goToDetail01">01-detail01 navigate</button>
function goToDetail01() {
  uni.navigateTo({
    url: '/pages/detail01/detail01?name=liujun&id=100',
    success(res) {
      res.eventChannel.emit('acceptDataFormHomePage', {
        data: '我是home页面传递给detail01的数据'
      })
    },
  })
}
```

detail01.vue

```js
// 1.方式一: ?name=liujun&id=100
const $instance = ref(getCurrentInstance().proxy)
onLoad((options) => {
  console.log('接受到home传递过来url的数据:', options);
  // const eventChannel = this.getOpenerEventChannel();
  const eventChannel = $instance.value.getOpenerEventChannel();
  eventChannel.on('acceptDataFormHomePage', (value) => {
    console.log('接收到home页面eventchannel传递过来的数据:', value);
  })
})

// 2.方式二: ?name=liujun&id=100
const props = defineProps({
  name: String,
  id: String
})
console.log('在props中接受home传递过来url的数据:', props.name, props.id);
```



### 页面参数传递(detail ==> page)

```vue
<view class="">2.页面传递数据(逆向)</view>
<button type="default" @click="goToDetail02">01-detail02 navigate</button>

function goToDetail02() {
  uni.navigateTo({
    url: '/pages/detail02/detail02?name=liujun&id=200',
    events: {
      acceptDataFormDetail02(value) {
        console.log('接收到detail02传递过来的数据', value);
      }
    }
  })
}
```

detail02.vue

```vue
<button type="default" @click="goBack">返回</button>

const $instance = ref(getCurrentInstance().proxy) // this 
function goBack() {
  uni.navigateBack({
    delta: 1
  })
  const eventChannel = $instance.value.getOpenerEventChannel()
  // 触发事件, 将detail02的数据传递给Home页面
  eventChannel.emit('acceptDataFormDetail02', {
    data: '这里是detail02传递给Home页面的数据'
  })
}
```





## pinia

- uni-app 内置了 Pinia，使用 HBuilder X 不需要手动安装，直接使用即可。
- 使用 CLI 需要手动安装，执行 yarn add pinia 或 npm install pinia。
- 第一步：在 main.js 中安装 Pinia插件
- 第二步：接着创建一个store
- 第三步：然后在组件中就可以直接使用了




## Android-云打包配置

1. 注册一个Dcloud账号： https://dev.dcloud.net.cn/ 或在 HBuilder X 中注册 
2. HBuilder X 登录已注册好的账号，然后在manifest.json中配置应用基本信息
3. 云打包Android时，会自定生成证书
4. 开始执行云打包

