# 创建项目

```ts
pnpm create vue@latest
```

- 删除示例代码留下基本的架子。

## 创建.editorconfig

```bash
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

```

### vscode安装插件

![image-20240305222052413](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240305222052413.png)

### .editconfig的作用

`.editconfig`作用： EditorConfig有助于跨不同编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。

`.editconfig`如何作用于文件：EditorConfig由定义编码**样式的文件格式**和**文本编辑器的插件**集合组成，这些插件使编辑器能够读取文件格式并遵守定义的样式。

插件的功能：该插件尝试使用 .editorconfig 文件中的设置覆盖用户/工作空间设置。 与任何 EditorConfig 插件一样，如果未指定 root=true，EditorConfig 将继续在项目外部查找 .editorconfig 文件。

插件的运行规则：当打开新的编辑器、将选项卡切换到现有的编辑器或将焦点转移到已打开的编辑器时，都会激活此扩展。激活后，它使用[`editorconfig`](https://www.npmjs.com/package/editorconfig) 解析特定文件的配置，并应用任何相关的编辑器设置。

*注意：某些设置只能在文件保存时应用，如上所述。*

插件的一些坑点：**charset**还没作用。

最大的作用就是：charset 和 end_of_line ，其他的prettier可以完美接管。



## **prettier**美化

> <a href="https://prettier.io/">prettier</a>是一款代码美化工具，可以快速帮我们建立并统一代码风格，在代码保存时进行格式化，支持JavaScript (including experimental features)、[JSX](https://facebook.github.io/jsx/)、[Angular](https://angular.io/)、[Vue](https://vuejs.org/)、[Flow](https://flow.org/)、[TypeScript](https://www.typescriptlang.org/)、CSS, [Less](http://lesscss.org/), and [SCSS](https://sass-lang.com/)、[HTML](https://en.wikipedia.org/wiki/HTML)、[Ember/Handlebars](https://handlebarsjs.com/)、[JSON](https://json.org/)、[GraphQL](https://graphql.org/)、[Markdown](https://commonmark.org/), [YAML](https://yaml.org/)。



### 安装

```js
npm install prettier -D
```

- 如果在创建项目时选择了prettier，那么就不用输入上面的命令安装了。

### 配置.prettierrc文件:

- useTabs:使用tab缩进还是空格缩进，选择false; 
- tabWidth:tab是空格的情况下，是几个空格，选择2个; 
- printWidth:当行字符的⻓度，推荐80，也有人喜欢100或者120;
-  singleQuote:使用单引号还是双引号，选择true，使用单引号;
-  trailingComma:在多行输入的尾逗号是否添加，设置为 none ，比如对象类型的最后一个属性后 面是否加一个，;
- semi:语句末尾是否要加分号，默认值true，选择false表示不加;

```ts
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

### 创建.prettierignore忽略文件

- .prettierignore 的作用是perttier进行美化时，忽略这些文件。

```bash
/dist/*
.local
.output.js
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

### VSCode需要安装prettier的插件

![image-20240306190915662](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240306190915662.png)

在vscode配置文件中配置可以保存时，自动使用`prettier`进行格式化。

```json
"editor.formatOnSave": true,
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

此vscode扩展将使用项目本地依赖项中的 prettier。

1. 如果装了插件，项目依赖里没prettier包则无效。

2. 如果装了依赖没装插件，则无法与vscode配合使用。不过可以采用命令行的方式进行格式化。

   ```ts
   "format": "prettier --write src/"
   ------------------------------
   npm run format
   ```

详见：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode



## 使用**ESLint**检测

1. 创建项目的时候脚手架已经帮我们配置好了`eslint`环境

2. VSCode需要安装ESLint插件

![image-20240306192831250](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240306192831250.png)

1. eslint的作用不是帮我们格式化代码，而是通过静态分析帮我们在开发时发现问题，eslint也可以自动帮我们修复问题。

2. 但是eslint不仅包含代码质量规则，还包含风格规则。但是在使用 Prettier 时，eslint大多数风格规则都是不必要的，而且它们可能与 Prettier 发生冲突！

3. 在我们项目中Prettier 用于代码格式化问题，ESLint 用于代码质量问题。

4. prettier制定了代码格式的规则。

5. eslint制定了代码的质量的规则，可帮助我们在代码捕获错误。
6. <a href="https://github.com/prettier/eslint-config-prettier">eslint-config-prettier</a>可以不让eslint的风格选择妨碍我们使用 Prettier。



### 防止eslint与perttier冲突的配置

- eslint可能与prettier的规则冲突，但是我们需要以prettier为准，因为我们最后想要生成的代码是prettier定义的。所以需要在安装一个插件。
- 安装 `pnpm add --dev @vue/eslint-config-prettier @rushstack/eslint-patch`
  - 我们在创建vue项目的时候，选择了prettier，那么这个插件就会被自动安装了.

- 在.eslintrc文件中，添加插件

  ```ts
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier' // 确保将其放在最后，以便它有机会覆盖其他配置。
  ]
  ```

- <a href="https://github.com/vuejs/eslint-config-prettier">@vue/eslint-config-prettier</a> 的作用是：在vue项目中它禁用所有不必要或可能与 Prettier 冲突的规则。

  - 这个插件其实也就是集成了[`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier/#recommended-configuration) 和[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)， 

- `@rushstack/eslint-patch`的作用是配合`@vue/eslint-config-prettier`使用， 减少安装太多的依赖项。

- 在`eslint`与`prettier`和编辑器配合使用的时候，通常会一起执行，谁执行的慢就用谁的(通常是prettier)，但这会导致一些混乱的问题，所以`@vue/eslint-config-prettier`提供了一个规则集来让 Prettier 用于代码格式化问题，ESLint 用于代码质量问题的工作流顺利的执行。

  ```ts
  'extends': [
    'plugin:vue/vue3-essential',
   	 // ...
    '@vue/eslint-config-prettier/skip-formatting' // 确保将其放在最后，以便它有机会覆盖其他配置。
  ]
  ```

可以看看这篇文章：https://juejin.cn/post/7156893291726782500#heading-8





## 开发环境和生产环境

- 很多同学通常使用process这个变量来区别开发和生产环境。但是这在vite中错误的，因为vite在开发期间(dev)， 是没有用到node环境的。所以没有process这个变量。

- vite在`import.meta.env`对象上暴露环境变量，vite默认给我们提供了这些环境变量

  1. **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode#modes)。
  2. **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/shared-options.html#base)决定。
  3. **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境（使用 `NODE_ENV='production'` 运行开发服务器或构建应用时使用 `NODE_ENV='production'` ）。
  4. **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
  5. **`import.meta.env.SSR`**: {boolean} 应用是否运行在 [server](https://cn.vitejs.dev/guide/ssr.html#conditional-logic) 上。

- 在根目录下建立下面的文件

  ![image-20240313185218943](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240313185218943.png)

  Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vitejs.dev/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量：

  ```ts
  .env                # 所有情况下都会加载
  .env.local          # 所有情况下都会加载，但会被 git 忽略
  .env.[mode]         # 只在指定模式下加载
  .env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
  ```

  ```ts
  .env                	# 所有情况下都会加载
  .env.development      # 在开发环境会加载
  .env.production				# 在生产环境会加载
  ```

- vite定义环境变量：只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。

  ```ts
  VITE_SOME_KEY=123
  DB_PASSWORD=foobar
  ```

  在客户端获取定义的环境变量数据

  ```ts
  console.log(import.meta.env.VITE_SOME_KEY) // "123"
  console.log(import.meta.env.DB_PASSWORD) // undefined
  ```

- 更多信息可以访问：<a href="https://cn.vitejs.dev/guide/env-and-mode">环境变量和模式</a>

## 重置样式

1. 安装`normalize.css`

2. 在`main.ts`中引入

   ```ts
   import 'normalize.css'
   ```

3. 引入自己定义的样式重置文件和公共样式文件

   ```ts
   import './assets/css/index.less
   ```

   `index.less`中：

   ```ts
   @import './reset.less';
   @import './common.less';
   ```

   

## 引入element-plus

1. 安装`element-plus`

   ```js
   pnpm install element-plus
   ```

2. 在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型（后面加了自动导入组件的插件这个就可以去掉了）

   - 这一步如果用了第三步的按需自动导入其实是不需要的，只有在没有按需导入的时候有提示功能。

   ```json
   {
     "compilerOptions": {
       // ...
       "types": ["element-plus/global"]
     }
   }
   ```

3. 按需引入之自动导入（强烈推荐）

   ```bash
   pnpm install -D unplugin-vue-components unplugin-auto-import
   ```

4. 安装完上面两个插件之后，在`vite.config.ts`中配置

   ```ts
   import { defineConfig } from 'vite'
   import AutoImport from 'unplugin-auto-import/vite'
   import Components from 'unplugin-vue-components/vite'
   import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
   
   export default defineConfig({
     // ...
     plugins: [
       // ...
       AutoImport({
         resolvers: [ElementPlusResolver()],
       }),
       Components({
         resolvers: [ElementPlusResolver()],
       }),
     ],
   })
   ```

5. `npm run dev`启动项目会自动生成`auto-imports.d.ts`和`components.d.ts`

6. 在`tsconfig.app.json`中`include`添加上面两个文件

   ```ts
   "include": [/* ...others */, "components.d.ts", "auto-imports.d.ts"]
   ```

   经历3、4、5步骤，组件就会按需自动引入(我们项目中使用到哪个就会自动引入哪个)，而且ts也有对应的提示。

7. 因为使用了`unplugin-element-plus`, 那么还需要**手动导入样式**， 这样太麻烦了，我们使用`vite-plugin-style-import`自动导入组件样式。

   安装：`pnpm i vite-plugin-style-import -D `

   在`vite.config.ts`中使用

   ```ts
   import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
   export default defineConfig({
     plugins: [
       // ...
       createStyleImportPlugin({
         resolves: [ElementPlusResolve()],
         libs: [
           {
             libraryName: 'element-plus',
             esModule: true,
             resolveStyle: (name: string) => {
               return `element-plus/theme-chalk/${name}.css`
             }
           }
         ]
       })
     ],
   })
   ```

   

## 项目目录搭建

```sh
src
├── assets
│   ├── css
│   │   └── coomon.css
│   │   └── reset.css
│   │   └── index.css
│   ├── img
│   │   └── logo.svg
├── base-ui
│   └── xxx文件夹...
└── components
│   └── xxx文件夹...
├── global
│   └── constants.ts
│   └── register-icons.ts
└── hooks
│		└── index.ts
├── router
│   └── index.ts
└── service
│   └── ...
│   └── index.ts
├── store
│   └── couter文件夹
│       └── index.ts
│   └── login文件夹
│       └── index.ts
└── types
│   └── couter文件夹
│       └── index.ts
│   └── login文件夹
│       └── index.ts
├── utils
│   └── validator.ts
└── views
│   └── couter文件夹
│       └── index.vue
│   └── login文件夹
│       └── index.vue
└── App.vue
└── main.ts

```

## 注册element-pluse icon

1. 在`src/global/register-icons.ts`中对icon进行注册(插件的写法)

```ts
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default registerIcons
```

2. 在`main.ts`中引入

```ts
// ...
import icons from './global/register-icons'

const app = createApp(App)

app.use(icons)
// ...
```



## App.vue整体搭建

```css
.app {
  width: 100vw;
  height: 100vh;
}
```



## 封装cache utils

在`src/utils/cache.ts`文件中创建操作本地存储的方法

```ts
enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
```

