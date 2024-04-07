- 中文文档
  - https://zh-hans.react.dev/learn
- {} 里面可以放数组，react会自动展开
- ![image-20230629204815921](/Users/lihaoran/Library/Application Support/typora-user-images/image-20230629204815921.png)
- ![image-20230629205918331](/Users/lihaoran/Library/Application Support/typora-user-images/image-20230629205918331.png)
- 动态class 字符串拼接 {`aa bb ${isActive ? 'active' : ''}`}
- bind

```js
// bind添加参数之后返回的函数被调用的时候，如果手动再给这个返回的函数传参的话，那么手动传入的参数会放到最后
const obj = {
  name: 'aa',
  age: 12
}
function foo(a, b, c, d, e) {
  console.log(a, b, c, d, e)
}

const foo2 = foo.bind(obj, 'bind1', 'bind2', 'bind3')
foo2('手动1', '手动2') // bind1 bind2 bind3 手动1 手动2
```



- jsx的本质是React.createElement,  组成了一个javascript对象树，然后处理成虚拟dom，最后虚拟dom转换成真实dom。

- 虚拟dom的好处 是 跨平台和高性能

- 协调：通过ReactDom.render() 让虚拟dom和真实dom同步起来，这个过程叫协调。

- react没有什么v-on,$emit, slot， 全都是js

- 如果组件中放了好几个元素，children是一个数组，如果只有一个元素，那么children就是该元素。

- react的作用域插槽： 传入一个函数

  ```jsx
  // App.jsx  	传入函数
  <Tab titles={titles} itemType={item => <button>{item}</button>}></Tab>
  
  // Tab.jsx
  <div className="tab">
      {titles.map((title, index) => (
        <div key={title.label}>
          <div>
            {/* {title.label} */}
            {/* 演示作用域插槽 */}
            {this.props.itemType(title.label)}
          </div>
        </div>
      ))}
  </div>
  ```

- 对于插槽的理解： 父组件提供结构，但是数据由子组件进行提供。 父组件中直接使用子组件的数据(由子组件传递而来)。



## context的使用流程1

1. 定义context

   ```js
   import React from 'react'
   
   export const AppContext = React.createContext({ name: 'zs', age: 12 })
   ```

2. 根组件或其他的组件引入AppContext

   ```jsx
   render() {
     return (
       // 将用户的信息传递给ProductItem组件
       <AppContext.Provider value={{ name: 'xiaohong', age: 33 }}>
      	 <div>
       		<Main></Main>
        </div>
       </AppContext.Provider>
     )
   }
   ```

3. 消费context的组件： 需要消费这个context的组件引入AppContext， 然后使用this.context获取数据

   ```jsx
   import React, { Component } from 'react'
   import { AppContext } from '../context/appContext.js'
   
   export default class ProductItem extends Component {
   	render() {
   		const { name, age } = this.context
   		return (
   			<div>
   				<h1>{name}</h1>
   				<h3>{age}</h3>
   			</div>
   		)
   	}
   }
   
   ProductItem.contextType = AppContext
   ```

4. 除了上个消费context组件的方法，还有一个方法用AppContext.Consumer，什么时间使用他们呢？

   1.当使用value的组件是一个函数式组件时；

   2.当组件中需要使用多个Context时

   

5. 上面主要是讲了使用context数据共享展示，跨层级组件通信。但是如果是事件触发组件互相传递， 比如A组件中触发了一个事件，需要B组件接收到，这个时候就要使用eventBus

6. React中的setState更新数据的时候，不仅dom是异步渲染的，而且数据也是异步更新的。



## 问： setState为什么要设计成异步的

1. 合并更新，可以有效的提高性能
   1. 放到队列中，批量更新
2. 保证state没有被更新的时候，state/props同步
   1. 如果更新同步了，但是还没有执行render函数，那么state和props不能保持同步



```js
state: {couter: 1}
changeState() {
  setTimeout(() => {
   	this.setState(couter: 100)
    console.log(this.state.couter) // ???
  },0)
}
```

在react18之前，这行代码是同步的，也就是打印this.state.couter是100， 但是在react18之后，所有的操作都变成批处理了。也就是这个代码还是异步的,  打印出来还是1。



setState一定是异步的吗？

- 在react18之前，setTimeout/Promise.then/原生dom事件 这些回调中执行setState是同步的。
- 在react18开始，setTimeout/Promise.then/原生dom事件 这些回调中执行setState变成了批处理操作，也就是异步的，如果要变成同步的，那就执行flushSync(() => {})



继承PureComponent，不管组件内有没有用到这个prop属性，当这个prop属性变化之后都会重新渲染这个组件。

函数组件是memo，包裹这个函数。





## 获取DOM元素的几种方式

```jsx
// render
<h2 ref="hworld">hello world</h2>

// js
getNativeDom() {
  // 1. 方式一: dom元素写ref，值为字符串
  const h2Dom = this.refs.hworld
  console.log(h2Dom, 'h2Dom')
}
```



```jsx
// render
<h3 ref={this.hreact}>hello react</h3>

// js
constructor(props) {
		super(props)
		this.hreact = React.createRef()
}

getNativeDom() {
		// 2.方式二: 使用createRef创建ref元素，然后绑定到dom元素上
		const h3Dom = this.hreact.current
		console.log(h3Dom, 'h3Dom')
}
```



```jsx
// render
<h4 ref={el => (this.hvue = el)}>hello vue</h4>

// js
constructor(props) {
  super(props)
  this.hvue = null
}

getNativeDOM() {
   // 3.方式三: 传入一个回调函数, 在对应的元素被渲染之后, 回调函数被执行, 并且将元素传入
   console.log(this.hvue)
}
```



## 获取类组件实例

```jsx
class HelloWorld extends Component {
	render() {
		return (
			<div>
				<h1>hello world</h1>
				<p>哈哈哈</p>
			</div>
		)
	}
}


export default class App extends Component {
	constructor(props) {
		super(props)

		this.helloWorldRef = React.createRef()
	}

  getComponentRef () {
    // 获取到了组件实例
		console.log(this.helloWorldRef.current, 'hello world ref')
	}

	render() {
		return (
			<div>
				<HelloWorld ref={this.helloWorldRef}></HelloWorld>
				<button onClick={() => this.getComponentRef()}>按钮</button>
			</div>
		)
	}
}

```



## 获取函数组件实例

> 获取不到，可以使用高阶组件的形式，获取到函数组件中的某个dom实例

```jsx
import React, { Component, forwardRef } from 'react'

// 第二个参数是ref， forwardRef是转发的作用
const HelloWorld = forwardRef(function HelloWorld(props, ref) {
	return (
		<div ref={ref}>
			<h1>hello world</h1>
			<p>哈哈哈</p>
		</div>
	)
})

export default class App extends Component {
	constructor(props) {
		super(props)

		this.helloworldRef = React.createRef()
	}

	getFunRef() {
		console.log('hello world function ref', this.helloworldRef.current)
	}

	render() {
		return (
			<div>
				<HelloWorld ref={this.helloworldRef}></HelloWorld>
				<button onClick={() => this.getFunRef()}>按钮</button>
			</div>
		)
	}
}
```





## 受控组件和非受控组件

- 受控组件是form表单中某个元素绑定了value
- 非受控组件是form表单某个元素没有绑定value，自由的。



Input 输入框，输入框中的值： 受控组件是value，非受控组件defaultValue



## 高阶组件

- context+高阶组件可以简化消费组件

  ```jsx
  import ThemeContext from "../context/theme_context"
  
  function withTheme(OriginComponment) {
    return (props) => {
      return (
        <ThemeContext.Consumer>
          {
            value => {
              return <OriginComponment {...value} {...props}/>
            }
          }
        </ThemeContext.Consumer>
      )
    }
  }
  
  export default withTheme
  
  
  // Product如果是ThemeContext的消费组件，那么就可以这样导出
  
  export const ProductConsumer = withTheme(Product)
  ```

  



## redux

```js
const { createStore } = require('redux')

const initialState = {
	name: 'zs',
	age: 12
}

// 拆出来常量 constant.js
const CHANGE_NAME = 'change_name'
const CHANGE_AGE = 'change_age'

// reducer.js
function reducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_NAME:
			return {
				...state,
				name: action.name
			}

		case CHANGE_AGE:
			return {
				...state,
				age: action.age
			}
	}

	return state
}

const store = createStore(reducer)

store.subscribe(() => {
	console.log('订阅数据的变化', store.getState())
})

// 定义actionCreator actionCreator.js
const changeNameAction = name => ({ type: CHANGE_NAME, name })
const addAgeAction = age => ({ type: CHANGE_AGE, age })

store.dispatch(changeNameAction('mdm'))

store.dispatch(addAgeAction(33))
```



## useCallback

```jsx
const Profile = function () {
  const [count, setCount] = useState(0) 
  function increment() {
    setCount(count+1)
  }
  return (
  	<div>
      <h1>{count}</h1>
      <button onClick={increment}>+1</button>
    </div>
  )
}
```

当Profile组件被重新渲染的时候，increment函数会被重新定义(但是其实他会在内存中被销毁)， 但是我们从定义的角度来说，他确实被定义了很多次 。

我们使用useCallback做性能优化

```jsx
const increment = useCallback(function () {
  setCount(count+1)
})
```

ok, 我们好像优化了一波increment函数，让每次组件被重新渲染都是用的是同一个increment函数，但是useCallback内部的函数还是被定义了很多次，所以其实并没有作了什么性能优化。



useCallback的真正作用是当把函数传递给子组件时，使用useCallback可以避免子组件的不必要重新渲染

```jsx
function ProfileIncrement(props) {
  const { increment } = props
  return (
 		<button onClick={increment}>increment</div>
  )
}

const Profile = function () {
  const [count, setCount] = useState(0) 
  const increment = useCallback(function (){
    setCount(count+1)
  })
  return (
  	<div>
      <h1>{count}</h1>
      <button onClick={increment}>+1</button>
    </div>
  )
}
```





使用useRef+useCallback进行往子组件传递函数时避免子组件重新渲染的最好的性能优化方案



```jsx
import React, { useCallback, useState, memo, useRef } from 'react'

const ProfileIncrement = memo(props => {
	const { increment } = props
	console.log('ProfileIncrement重新渲染了')
	return (
		<div>
			<button onClick={increment}>++increment</button>
		</div>
	)
})

export default function CallbackHook() {
	const [count, setCount] = useState(0)
	const [num, setNum] = useState(900)

	console.log('CallbackHook重新渲染了')

	// 当count发生变化时，increment函数就会被赋值新的。
	// const increment = useCallback(
	// 	function () {
	// 		setCount(count + 1)
	// 	},
	// 	[count]
	// )

	// 如果count发生变化，那么increment会被赋值新的，然后ProfileIncrement组件会被重新渲染，，这也是不太好的，因为函数没有变化啊，里面的处理逻辑都没有变化，有没有什么办法让increment永远都是一个呢？那就是第二个数组为空数组
	// const increment = useCallback(function () {
	// 	setCount(count + 1)
	// }, [])

	// 此时我们发现确实ProfileIncrement组件不重新渲染了，但是increment函数没有效果了，这肯定是不行的，但是这是为什么呢？其实这就是闭包陷阱，这个函数因为没有变化，所以导致捕获到了他这个闭包中保存的count值。
	// 所以我们还要优化, 使用useRef
	const countRef = useRef()
	countRef.count = count
	const increment = useCallback(function () {
		setCount(countRef.count + 1)
	}, [])

	// 此时我们发现上述代码让ProfileIncrement只会渲染一次了， count的变化也是正常的了，而且ProfileIncrement组件不会重新渲染。

	return (
		<div>
			<h1>count: {count}</h1>
			<button onClick={increment}>+1</button>
			<h1>num: {num}</h1>
			<button onClick={() => setNum(num + 1)}>setNum</button>
			<hr />
			<ProfileIncrement increment={increment}></ProfileIncrement>
		</div>
	)
}
```









## 使用redux hook

1. npx create-react-app learn-readux-hooks

2. npm i redux react-redux @reduxjs/toolkit

3. 创建store文件夹

   1. store/index.js
   2. store/feature文件夹  或者   store/modules
      - 里面放每个模块的名字 （其实就是每个reducer，然后在configStore中组装）
      - eg: count.js home.js

4. 在count/home.js文件中定义reducer (下面是count.js  home.js亦同)

   ```jsx
   import { createSlice } from '@reduxjs/toolkit'
   
   const countSlice = createSlice({
   	name: 'count',
   	initialState: {
   		count: 0,
   		countMsg: 'hello count'
   	},
   	reducers: {
   		addNumAction(state, { payload }) {
   			state.count += payload
   		},
   		subNumAction(state, { payload }) {
   			state.count -= payload
   		}
   	}
   })
   
   // 返回action
   export const { addNumAction, subNumAction } = countSlice.actions
   // 返回reducer
   export default countSlice.reducer
   
   ```

5. 在store.js中组合reducer

   ```jsx
   import { configureStore } from '@reduxjs/toolkit'
   import countReducer from './modules/count'
   import homeReducer from './modules/home'
   
   const store = configureStore({
   	reducer: {
   		counter: countReducer,
   		home: homeReducer
   	}
   })
   
   export default store
   ```

6. 在index.js中提供redux的store，里面的子孙组件可以使用

   ```jsx
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import { Provider } from 'react-redux'
   import store from './store/index.js'
   import App from './App.jsx'
   
   const root = ReactDOM.createRoot(document.getElementById('root'))
   root.render(
   	<Provider store={store}>
   		<App />
   	</Provider>
   )
   ```

7. 在组件中使用store中的数据，并派发action

   ```jsx
   import React, { memo } from 'react'
   import { useDispatch, useSelector } from 'react-redux'
   import { addNumAction, subNumAction } from '../store/modules/count'
   
   export default function Home() {
     // 获取store里面的数据在组件中使用
   	const { count } = useSelector(state => {
   		return {
   			count: state.counter.count
   		}
   	})
     // 使用dispatch派发action
   	const dispatch = useDispatch()
   
   	function addNum(num) {
   		dispatch(addNumAction(num))
   	}
   	function subNum(num) {
   		dispatch(subNumAction(num))
   	}
   	console.log('home render')
   	return (
   		<div>
   			<h1>Home-count {count}</h1>
   			<button onClick={() => addNum(1)}>+1</button>
   			<button onClick={() => addNum(5)}>+5</button>
   			<button onClick={() => subNum(6)}>-6</button>
   			<Profile></Profile>
   		</div>
   	)
   }
   ```





## 开始项目

> npm i react-redux react-router-dom axios @reduxjs/toolkit normalize.css
>
> npm i   @craco/craco craco-less -D
