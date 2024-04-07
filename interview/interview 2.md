## 框架

1. vue的生命周期




1. vue中key的作用




1. v-if和v-show的区别

权限组件   最好用v-if，因为在dom中还可以看到的




1. 修改数组的索引是否刷新视图



1. 为什么vue的data是一个函数

​	

1. vue组件的通讯方式



1. 说一下对nextTick的理解



1. 不需要响应式数据该怎么办



1. vue如何实现响应式的



1. 介绍下vuex



1. 如何监听vuex中的数据

2. vue中做过哪些优化

   1. 我们一般希望只有在template模板中的数据在data中定义。

   ```js
   对象层级不要过深，否则性能就会差
   不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
   v-if 和 v-show 区分使用场景
   computed 和 watch 区分使用场景
   v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
   大数据列表和表格性能优化-虚拟列表/虚拟表格
   防止内部泄漏，组件销毁后把全局变量和事件销毁
   图片懒加载
   路由懒加载
   第三方插件的按需引入
   适当采用 keep-alive 缓存组件
   防抖、节流运用
   ```

3. .vue中如何进行样式穿透

   /deep/ 样式穿透



nextTick？ 样式穿透？ 路由跳转？

1. vue模板编译原理

2. vuex可以脱离vue应用使用吗？ 比如redux可以脱离react应用在其他框架中使用

3. watch有哪几个配置

4. vue-router的钩子

5. 路由跳转方式

   1. 声明式路由和编程式路由

   ```js
   1，<router-link to='home'> router-link标签会渲染为<a>标签，咋填template中的跳转都是这种；
   
   2，另一种是编程是导航 也就是通过js跳转 比如 router.push('/home') router.replace('/home')
   ```

6. computed和watch的区别

   ```js
   1. computed是计算属性,也就是计算值,它更多用于计算值的场景
   2. computed具有缓存性,computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
   3. computed适用于计算比较耗性能的计算场景
   ```

   ```
   1. 更多的是「观察」的作用,类似于某些数据的监听回调,用于观察props $emit或者本组件的值,当数据变化时来执行回调进行后续操作
   2. 无缓存性，页面重新渲染时值不变化也会执行
   ```

   ```js
   1. 当我们要进行数值计算,而且依赖于其他数据，那么把这个数据设计为computed
   2. 如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
   ```







## js基础知识

1. js有几种数据类型



1. 介绍一下promise， promise有哪些静态方法

Promise.all

1. var let const的区别

```js
1. 变量提升
var声明的变量存在变量提升，即变量可以在声明之前调用，值为undefined
let和const不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错
2. 暂时性死区
var不存在暂时性死区
let和const存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
3. 块级作用域
var不存在块级作用域
let和const存在块级作用域
4. 重复声明
var允许重复声明变量
let和const在同一作用域不允许重复声明变量
5. 修改声明的变量
var和let可以
const声明一个只读的常量。一旦声明，常量的值就不能改变使用
能用const的情况尽量使用const，其他情况下大多数使用let，避免使用var
```

22. es6的知识点:

    尖头函数 结构复制 set map 

    - 声明和表达式：let const 解构赋值 Symbol
    - 内置对象：Map和Set  proxy和reflect
    - 字符串模板
    - 函数：参数扩展 箭头函数 迭代器 for of
    - for of 和 for in 有啥区别
    - class类
    - export和import 模块
    - promise async await和generator

23. 数组的常用方法

```js
push pop unshift shift pop concat splice slice indexOf includes find map filter findIndex reverse sort join some every
```

23. 数组去重

```js
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
```

24. 本地存储的方式有哪些， 区别及应用场景

```js
存储大小：cookie数据大小不能超过4k，sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大
有效时间：localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据； sessionStorage数据在当前浏览器窗口关闭后自动删除；cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
数据与服务器之间的交互方式，cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端； sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
```

25. 谈一谈你对闭包的理解及实际使用场景

```js
闭包就是函数中包含另一个函数，可以让你在函数外部读取到内部的变量（就是在函数内部再定义一个函数），让这些变量的值始终保持在内存中，可以达到延长变量生命周期的效果，过多使用会导致内存泄漏的问题

（在创建私有变量和想延长变量的生命周期时会用到闭包）
```

26. 什么是防抖和节流

防抖： 处理快速事件！！

鼠标移动事件，输入事件，滚动事件，这种快速事件。 

```js
// 防抖
export function debounce(callback: Function, delay: number) {
  // 闭包
  let timeId: NodeJS.Timeout;
  return (...params: any) => {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      callback(params)
    }, delay)
  }
}


const log = debounce(() => console.log('33'), 5000)
log()
log()
log()
```



```js
防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时 (进来之后等待执行，如果一定时间内没人进，那么我就执行，如果有，那就重新计时)
节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效 (进来之后就开始执行，在一定时间内谁进来都不行，只有等到我执行完)
电梯第一个人进来后，等待15秒。如果过程中又有人进来，15秒等待重新计时，直到15秒后开始运送，这是防抖

电梯第一个人进来后，15秒后准时运送一次，这是节流
```

27. 什么是原型和原型链

```js
JavaScript 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法
```

28. 从输入url到页面显示发生了什么



dns解析， tcp链接 

```js
1 用户输入 URL 地址。
2 对 URL 地址进行 DNS 域名解获得IP地址。
3 建立 TCP 连接（三次握手）。
4 浏览器向 web 服务器发送一个 HTTP 请求报文。
5 服务器返回 HTTP 响应报文给客户端。
6 关闭 TCP 连接（四次挥手）。
7 浏览器解析文档资源并渲染页面。
解析过程：浏览器解析的资源（html，svg,Xhtml等），解析完成后都会生成一个完整的DOM Tree ，css资源则会解析成CSS Rule Tree，生成之后进行浏览器渲染，保证脚本执行前已完成DOM渲染会放在body标签结束之后。
```

29. eventLoop

不了解

```js
事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环（即宏任务）。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task（微任务）。当所有可执行的micro-task（微任务）执行完毕之后。循环再次从macro-task（宏任务）开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task（微任务），这样一直循环下去
```

30. 如何水平居中一个元素

## http协议

1. 介绍下http状态码

​	301(永久重定向)和302(临时重定向)

2. 什么是跨域，如何解决跨域

```js
跨域的概念：协议、域名、端口都相同才同域，否则都是跨域
vue.config配置文件中的proxy做代理
解决: 
1、使用JSONP（json+padding）把数据内填充起来
2、CORS方式（跨域资源共享），在后端上配置可跨域
3、服务器代理，通过服务器的文件能访问第三方资源
```

3. 缓存

- 强缓存（本地缓存）：
  直接使用使用本地缓存，不用跟服务器进行通信
  header:Expires/Cache-Control
  状态码为：200
- 协商缓存
  将资源一些相关信息返回服务器，让服务器判断浏览器是否能直接使用本地缓存，整个过程至少与服务器通信一次
  header:Last-Modified/Etag
  状态码为：304

4. axios怎么设置请求和响应拦截器

   axios的拦截器interceptors request response

## webpack

1. webpack优化有没有了解过
2. 了解过哪些loader和plugin

## 微信小程序

33. 微信小程序页面和组件的生命周期

```js
**组件** 的生命周期应该被定义在 `lifetimes` 中，而方法必须要放入到 `methods` 中。

组件的生命周期一共有三个：

1. `created` ： 组件实例刚刚被创建好。**此时还不能调用 `setData`**
2. `attached`：组件完全初始化完毕、进入页面节点树后。**绝大多数初始化工作可以在这个时机进行**
3. `detached`：在组件离开页面节点树后
```

34. 小程序页面跳转方式

```js
1. 声明式导航
   1. 跳转到 `tabbar` 页面
   2. 跳转到 `非tabbar` 页面
   3. 后退页面
2. 编程式导航
   1. 跳转到 `tabbar` 页面
   2. 跳转到 `非tabbar` 页面
   3. 后退页面
```

声明式导航

```js
<navigator url="/pages/detail/detail">{{ index }} -- {{ item.title }}</navigator>
<navigator open-type="switchTab" url="/pages/index/index">跳转到首页</navigator>
<!-- 注意：后退页面必须指定 open-type="navigateBack" -->
<navigator open-type="navigateBack">后退</navigator>
```



编程式导航

1. [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)：跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

   ```js
    wx.switchTab({
           url: '/pages/index/index',
       })
   ```

   

2. [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面

   ```js
   wx.navigateTo({
     url: '/pages/detail/detail',
   })
   ```

   

3. [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)：关闭当前页面，返回上一页面或多级页面。

   ```js
   wx.navigateBack({
     delta: 1,
   })
   ```




## uniapp获取dom

1. 获取dom

   ```js
    // 获取 dom 的固定写法
   const query = uni.createSelectorQuery().in(this);
   // 循环数据源
   data.forEach((item, index) => {
     // 获取 dom 的固定写法
     query
       .select('#_tab_' + index)
       .boundingClientRect((res) => {
       // 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
       item._slider = {
         // 当前的 tab 距离左侧的距离
         left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
       };
       // 运算完成之后，执行一次 【滑块】位置运算
       if (data.length - 1 === index) {
         this.tabToIndex();
       }
     })
       .exec();
   });
   ```

   # 总结

   1. 组件之scroll-view,  一般用于滚动，横向纵向都可以用它

   ```js
    <scroll-view
           scroll-x
           class="scroll-view"
           scroll-with-animation
           :scroll-left="scrollLeft"
   >
   ```

   2. block为空元素

   3. uniapp获取dom

       ```js
       // 获取 dom 的固定写法
       const query = uni.createSelectorQuery().in(this);
       // 循环数据源
       data.forEach((item, index) => {
         // 获取 dom 的固定写法
         query
           .select('#_tab_' + index)
           .boundingClientRect((res) => {
           // 为数据对象中每一个 item 都维护一个 _slider（滑动条） 对象
           item._slider = {
             // 当前的 tab 距离左侧的距离
             left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2
           };
           // 运算完成之后，执行一次 【滑块】位置运算
           if (data.length - 1 === index) {
             this.tabToIndex();
           }
         })
           .exec();
       });
       ```

      ​	

      // 
      
      ```js
      query
        .selectAll(`.hot-list-item-${this.currentIndex}`)
        .boundingClientRect((res) => {
        res.forEach(item => {
          sum += item.height
        })
        resolve(sum)
      }).exec()
      ```

      

      4. 查询框和icon  `uni-search-bar` uni提供的搜索框组件
      
      ```js
      <uni-search-bar
        v-if="isShowInput"
        class="my-search-bar"
        :radius="100"
        :bg-color="config.backgroundColor"
        :placeholder="placeholderText"
        :value="value"
        @confirm="onSearch"
        @focus="onFocus"
        @blur="onBlur"
        @clear="onClear"
        @cancel="onCancel"
        @input="onInput"
      >
        <uni-icons
          slot="clearIcon"
          type="clear"
          color="#999999"
        />
      </uni-search-bar>
      ```

      5. 图片 mode属性
      
      ```js
      <image
        class="logo"
        src="@/static/images/logo.png"
        mode="aspectFit"
        />
      ```

      6. 监听页面的滚动

      通过`onPageScroll`事件监听页面滚动。此方法与methods同级
      
      ```js
      onPageScroll(res) {
        console.log(res)
        this.currentPageScrollTop = res.scrollTop
      }
      ```

      7. 通过uni让列表进行滚动
      
      ```js
      uni.pageScrollTo({scroll: xxx})
      ```
      
      


## 以前的项目开发中有没有遇到过什么难点？

```html


1、面试完你还有什么问题要问的吗
2、你有什么爱好?
3、你最大的优点和缺点是什么?
4、你为什么会选择这个行业，职位?
5、你觉得你适合从事这个岗位吗?
6、你有什么职业规划?
7、你对工资有什么要求?
8、如何看待前端开发？
9、未来三到五年的规划是怎样的？
```

















































js有哪几种数据类型  js类型判断 typeof instanceof   闭包   最简单实现闭包的方式  js数据类型 作用域 有哪几种作用域。let var区别 原型和原型链  promise的静态方法





this指向 async await





























