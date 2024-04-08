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

_注意：某些设置只能在文件保存时应用，如上所述。_

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
- singleQuote:使用单引号还是双引号，选择true，使用单引号;
- trailingComma:在多行输入的尾逗号是否添加，设置为 none ，比如对象类型的最后一个属性后 面是否加一个，;
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

- 配置文件

  ```ts
  // ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
  // 文档：https://eslint.bootcss.com/docs/user-guide/configuring
  module.exports = {
    // 表示当前目录即为根目录，ESLint 规则将被限制到该目录下
    root: true,
    // env 表示启用 ESLint 检测的环境
    env: {
      // 在 node 环境下启动 ESLint 检测
      node: true
    },
    // ESLint 中基础配置需要继承的配置
    extends: ['plugin:vue/vue3-essential', '@vue/standard'],
    // 解析器
    parserOptions: {
      parser: 'babel-eslint'
    },
    // 需要修改的启用规则及其各自的错误级别
    /**
     * 错误级别分为三种：
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
  ```

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

## 约定式提交规范

https://juejin.cn/post/7325243117861879818#heading-19

### 规范git提交代码

- **commitlint**：代码提交检测，检测git commit 内容是否符合定义的规范
- **commitizen**：用于自动化提交信息的工具，帮助开发者在每次提交代码时自动生成符合规范的提交信息，使用Commitizen可以使得团队的提交信息更加统一和规范。

1. 安装`pnpm add @commitlint/config-conventional @commitlint/cli -D`

2. 根目录下添加 `commitlint.config.js`文件

```ts
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [
      2, // 2 表示必须
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'merge', // 合并分支
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

在`packjson.json`中添加

```json
"scripts": {
    "commitlint": "commitlint --config commitlint.config.js -e -V"
}
```

此时如果不规范的提交代码msg，也不会报错， 因为缺少了git hook。

### 配置husky

`husky` 是一个为 git 客户端增加 `hook` 的工具。安装后，它会自动在仓库中的 `.git/` 目录下增加相应的钩子；比如 `pre-commit` 钩子就会在你执行 `git commit` 的触发。即：`git hook`可以在`git` 在执行某个事件之前或之后进行一些其他额外的操作。

下面是常用的hooks：

> 1.  pre-commit：钩子在提交信息前运行命令。
> 2.  prepare-commit-msg：钩子在启动提交信息编辑器之前，默认信息被创建之后运行。
> 3.  commit-msg：这个钩子在 `git commit` 和 `git merge` 命令触发，会传递一个参数，该参数为存放当前 commit 消息的临时文件路径。 如果该钩子脚本以非零值退出，Git 将放弃提交， 因此，可以用来在提交通过前验证项目状态或提交信息。
> 4.  post-commit：钩子在整个提交过程完成后运行

1. 安装`pnpm install husky --save-dev`
2. `npx husky init`
3. 删除`pre-commit`文件
4. 在命令行中输入 `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`

此时如果不规范的提交代码msg，会报错.

![image-20240402203859960](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240402203859960.png)

### 配置commitizen

配置commitizen后，帮助开发者在**每次提交代码**时**自动生成**符合规范的提交信息，提示每个subjet的含义。

1. 安装

```bash
pnpm add  commitizen cz-customizable -D
```

2. 配置packjson.jso

```json
"scripts": {
  "commit": "git-cz",
}
// 这里自定义commitizen，使用git-cz执行git commit命令
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  },
  "cz-customizable": {
    "config": "./.cz-config.cjs"
  }
}
```

3. 在根目录创建的.cz-config.cjs文件

```json
// 自定义commit提示内容
module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    // scope: '请输入文件修改范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  // limit subject length, commitlint默认是72
  subjectLimit: 72
}
```

此时执行`npm run commit`会有友好地提示：

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240402204414244.png" alt="image-20240402204414244" style="zoom:50%;" />

### lint-staged + pre-commit 自动修复格式错误

- pre-commit 可以检测提交时代码规范
- lint-staged可以自动修复代码格式错误

1. 在命令行输入: `echo "npx --no -- lint --edit \$1" > .husky/pre-commit`

2. 修改pre-commit

   `npm run lint --edit $1`

此时执行git commit

![image-20240402205714600](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240402205714600.png)

但是如果是warning仍会通过。

如果是error 则不会通过

![image-20240402210100794](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240402210100794.png)

修改pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

执行git commit测试

![image-20240402210901295](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240402210901295.png)

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
  VITE_SOME_KEY = 123
  DB_PASSWORD = foobar
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
         resolvers: [ElementPlusResolver()]
       }),
       Components({
         resolvers: [ElementPlusResolver()]
       })
     ]
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
     ]
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

3. 使用

```vue
<el-icon><UserFilled /></el-icon>
```

## vite中使用外部svg图标

1. 安装

   ```ts
   pnpm install vite-plugin-svg-icons -D
   ```

2. 在vite.config.js中配置

   ```ts
   import { fileURLToPath, URL } from 'node:url'
   import { defineConfig } from 'vite'
   import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
   // https://vitejs.dev/config/
   export default defineConfig({
     plugins: [
       // ...
       createSvgIconsPlugin({
         // 指定需要缓存的图标文件夹
         iconDirs: [fileURLToPath(new URL('./src/icons/svg', import.meta.url))],
         // 指定symbolId格式
         symbolId: 'icon-[dir]-[name]'

         /**
          * 自定义插入位置
          * @default: body-last
          */
         // inject?: 'body-last' | 'body-first'

         /**
          * custom dom id
          * @default: __svg__icons__dom__
          */
         // customDomId: '__svg__icons__dom__',
       })
     ]
   })
   ```

3. 创建svg-icon组件

   ```vue
   <template>
     <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
       <use :xlink:href="symbolId" :fill="props.color" />
     </svg>
   </template>

   <script setup>
   import { computed } from 'vue'
   const props = defineProps({
     prefix: {
       type: String,
       default: 'icon'
     },
     name: {
       type: String,
       required: true
     },
     color: {
       type: String,
       default: '#333'
     },
     size: {
       type: String,
       default: '1em'
     }
   })

   const symbolId = computed(() => `#${props.prefix}-${props.name}`)
   </script>
   ```

4. 目录结构

   <img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240403192246312.png" alt="image-20240403192246312" style="zoom:50%;" />

5. main.ts中注册

   ```ts
   // svg图标
   import 'virtual:svg-icons-register'
   import svgIcon from '@/components/svg-icon/index.vue'

   app.component('svg-icon', svgIcon)
   ```

6. 使用

   ```vue
   <svg-icon :name="'article'" />
   ```

## 通用后台登录方案解析

1. axios模块
2. 接口请求模块
3. 登录请求动作
4. Token缓存
5. 登录鉴权

## vscode + ts

> 在vscode中配置tsconfig.json中，会时常会有一些点击ctrl识别不到的情况出现，这时候需要让vscode去识别这些配置。将路径改为一个错误的路径，唤醒路径。

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240404214452043.png" alt="image-20240404214452043" style="zoom:50%;" />

点击不了❌

改为错误的路径， 唤醒智能识别

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240404214532078.png" alt="image-20240404214532078" style="zoom:50%;" />

在改为正确的，此时有了提示：

<img src="/Users/lihaoran/Library/Application Support/typora-user-images/image-20240404214616963.png" alt="image-20240404214616963" style="zoom:50%;" />

## Q

Q: 在点击按钮发送请求的按钮上是不是都要加loading？

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

  setItem(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeItem(key: string) {
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

## 前端登陆鉴权操作

**登录鉴权** 的定义：

> 当用户未登陆时，不允许进入除 `login` 之外的其他页面。
>
> 用户登录后，`token` 未过期之前，不允许进入 `login` 页面

而想要实现这个功能，那么最好的方式就是通过 [路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB) 来进行实现。

```ts
import type { Router } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const title = import.meta.env.VITE_APP_NAME
// 白名单
const whiteList = ['/login']
export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 判断有无TOKEN,登录鉴权
    const isLogin = Boolean(localCache.getItem(LOGIN_TOKEN))
    if (!isLogin) {
      if (to.name === 'login') next()

      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    next()
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${title}`
  })
}
```

## 权限控制

根据登录用户的不同，呈现不同的后台管理系统内容（具备不同的操作权限）。

一般来说B端项目都是采用了RBAC权限设计。即role based access control（基本角色的访问控制）。

## 封装的axios有问题，需要重构

##

## 搭建B端项目基本框架

### 整体的容器布局

`views/main/index.vue`：

```vue
<div class="main">
  <el-container class="main-content">
    <el-aside :width="isFold ? '60px' : '210px'">
      <main-menu :is-fold="isFold" />
    </el-aside>
    <el-container>
      <el-header height="50px">
        <main-header @fold-change="handleFoldChange" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
```

### 左侧菜单

```vue
<div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        default-active="3"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
      <!-- 遍历整个菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</div>
```

## 动态路由

在显示左侧菜单栏的时候，根据接口数据返回菜单数据，然后渲染`el-meun`。 但是在`router.Typescript`中是注册所有的路由，然后页面跳转。这样的弊端是如果用户管理的路由地址，但是他没有用户管理路由的权限， 也是可以进入页面的。

接口判断(后端要做的)：

 因为我们每个接口都带token，当我们进入用户管理页面会请求用户列表，那这个时候后端应该会进行校验，没有权限返回状态码。然后我们前端在根据状态码进行退出登陆然后跳转到登陆页面或者提示无权限进入404。

动态路由（根据用户的权限信息，动态的添加路由，而不是一次性的注册所有路由）：

1. 基于角色的动态路由管理(根据不同的用户角色生成动态的路由)

   ```ts
   const roles = {
     superAdmin: 所有的路由,
     admin: 一部分的路由,
     user: 一部分的路由
   }
   ```

   弊端：没增加一个角色，都要手动的增加key/value。非常不友好。

2. 基于菜单的动态路由管理

   1. 获取用户菜单列表

   2. 获取所有路由对象，

   3. 根据菜单去匹配正确的路由，然后添加到路由对象中。

      `router.addRoute('main', 路由对象)`

   代码如下：

   ```ts
   // 获取到要添加的路由
   const routes = mapMenusToRoutes(userMenus)
   // 动态添加路由 'main' 是路由的name
   routes.forEach((route) => router.addRoute('main', route))
   ```

   ```ts
   // 根据本地路由与接口中获取到的menu菜单对应之后生成最后要addRoute的路由
   export function mapMenusToRoutes(userMenus: any[]) {
     // 1.加载本地路由
     const localRoutes = loadLocalRoutes()
   
     // 2.根据菜单去匹配正确的路由
     const routes: RouteRecordRaw[] = []
     for (const menu of userMenus) {
       for (const submenu of menu.children) {
         const route = localRoutes.find((item) => item.path === submenu.url)
         if (route) {
           // 1.给每层的route的顶层菜单增加重定向功能(但是只需要添加一次即可)
           if (!routes.find((item) => item.path === menu.url)) {
             routes.push({ path: menu.url, redirect: route.path })
           }
   
           // 2.将二级菜单对应的路径
           routes.push(route)
         }
         // 记录第一个被匹配到的菜单
         if (!firstMenu && route) firstMenu = submenu
       }
     }
     return routes
   }
   ```

   `firstMenu`是后端返回的路由菜单的第一个，这个用来做路由守卫的重定向，当有人想去`/main`的时候重定向到`firstMenu`。

   ```ts
   router.beforeEach((to) => {
     // ....
     if (to.path === '/main') {
       return firstMenu?.url
     }
   })
   ```

## 面包屑

根据当前的`route.path`遍历获取面包屑层级， 放到`breadcrumbs`中。

```ts
// utils.ts
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
```

`header-crumb.vue`

```vue
<el-breadcrumb separator-icon="CaretRight">
  <template v-for="item in breadcrumbs" :key="item.name">
    <el-breadcrumb-item :to="item.path">
      {{ item.name }}
    </el-breadcrumb-item>
  </template>
</el-breadcrumb>
<script>
// ...
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>
```

## 这个权限架构真的菜，重构！

## el-form

查询条件重置：

```ts
function handleResetClick() {
  formRef.value?.resetFields() // 要保证
}
```

要保证`el-form`中的`searchForm`和 `el-form-item`中的`prop`的`name`有对应关系。

```vue
<el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
  <el-form-item label="用户名" prop="name">
    <el-input
      v-model="searchForm.name"
      placeholder="请输入查询的用户名"
    />
  </el-form-item>
</el-form>
```

## storeToRefs

```ts
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'

// storeToRefs将store中数据的变成响应式的。类似于compute
const { usersList, usersTotalCount } = storeToRefs(systemStore)
```

## dayjs UTC formatter

```ts
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
```

## element-plus 国际化

```vue
<el-config-provider :locale="zhCn">
    <div class="app">
      <router-view></router-view>
    </div>
  </el-config-provider>
```

```ts
<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
```

## 使用 vue-i18n 进行国际化

## 组件状态驱动的动态 CSS 值

```ts
<template>
  <div class="overview">
    <h2>overview</h2>
    <button @click="changeColor">changeColor</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let color = ref('yellow')
function changeColor() {
  color.value = 'red'
}
</script>

<style lang="scss" scoped>
.overview {
  color: v-bind(color);
}
</style>
```

## vue3中的css选择器

### 深度选择器

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

上面的代码会被编译成

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

### 全局选择器

> 让其中一个样式规则应用到全局

```css
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

和如下一致，且不会在组件切换时消失(remove掉)。

```html
<style>
  .red {
    color: red
	}
</style>
```



## pinia的问题

https://stackoverflow.com/questions/70710965/vue-cant-access-pinia-store-in-beforeenter-vue-router



## 封装高级搜索

```vue
<page-search
  :search-config="searchConfig"
  @query-click="handleQueryClick"
  @reset-click="handleResetClick"
/>
```

`page-search.vue`

```vue
 <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
</div>
```

```ts
interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

// 获取权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)
// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()

  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
```

`config.ts`

```ts
const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门名称',
      initialValue: 'bbb'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
```

### 如果select中options的数据如果是服务器来的那么如何处理？

```ts
const modalConfig = {
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称'
    },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}

export default modalConfig
```

options设置为空，在传入组件前重新操作一遍

```tsx
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})
// 组件：
<page-modal :modal-config="modalConfigRef" ref="modalRef" />
```

## 坑点

- 如果`script`中的响应式数据没问题，但是页面却不显示，那么可能是数据初始化好了，但是页面还没渲染好(通常是由v-if控制了页面渲染)。

## 监听store中action的执行

- after表示action执行成功了，才执行after中的回调。

```ts
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
```
