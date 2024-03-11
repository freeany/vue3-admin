# 创建项目

```ts
pnpm create vue@latest
```



- 删除冗余代码

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

vscode安装插件

![image-20240305222052413](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240305222052413.png)

`.editconfig`作用： EditorConfig有助于跨不同编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。

`.editconfig`如何作用于文件：EditorConfig由定义编码**样式的文件格式**和**文本编辑器的插件**集合组成，这些插件使编辑器能够读取文件格式并遵守定义的样式。

插件的功能：该插件尝试使用 .editorconfig 文件中的设置覆盖用户/工作空间设置。 与任何 EditorConfig 插件一样，如果未指定 root=true，EditorConfig 将继续在项目外部查找 .editorconfig 文件。

插件的运行规则：当打开新的编辑器、将选项卡切换到现有的编辑器或将焦点转移到已打开的编辑器时，都会激活此扩展。激活后，它使用[`editorconfig`](https://www.npmjs.com/package/editorconfig) 解析特定文件的配置，并应用任何相关的编辑器设置。

*注意：某些设置只能在文件保存时应用，如上所述。*

插件的一些坑点：**charset**还未交付上线。

最大的作用就是：charset 和 end_of_line ，其他的prettier可以完美接管。



## **prettier**美化

> <a href="https://prettier.io/">prettier</a>是一款代码美化工具，可以快速帮我们建立并统一代码风格，在代码保存时进行格式化，支持JavaScript (including experimental features)、[JSX](https://facebook.github.io/jsx/)、[Angular](https://angular.io/)、[Vue](https://vuejs.org/)、[Flow](https://flow.org/)、[TypeScript](https://www.typescriptlang.org/)、CSS, [Less](http://lesscss.org/), and [SCSS](https://sass-lang.com/)、[HTML](https://en.wikipedia.org/wiki/HTML)、[Ember/Handlebars](https://handlebarsjs.com/)、[JSON](https://json.org/)、[GraphQL](https://graphql.org/)、[Markdown](https://commonmark.org/), [YAML](https://yaml.org/)。

### 安装

```js
npm install prettier -D
```

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

此扩展将使用项目本地依赖项中的 prettier。

1. 如果装了插件，项目依赖里没prettier包则无效。

2. 如果装了依赖没装插件，则无法与vscode配合使用。不过可以采用命令行的方式进行格式化。

   ```ts
   "format": "prettier --write src/"
   ------------------------------
   npm run format
   ```

详见：https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode



### 使用**ESLint**检测

1. 创建项目的时候脚手架已经帮我们配置好了`eslint`环境

2. VSCode需要安装ESLint插件

![image-20240306192831250](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240306192831250.png)

eslint的作用不是帮我们格式化代码，而是通过静态分析帮我们在开发时发现问题，eslint也可以自动帮我们修复问题。

但是eslint不仅包含代码质量规则，还包含风格规则。但是在使用 Prettier 时，eslint大多数风格规则都是不必要的，而且它们可能与 Prettier 发生冲突！

Prettier 用于代码格式化问题，ESLint 用于代码质量问题。

prettier制定了代码格式的规则。

eslint制定了代码的质量的规则，可帮助我们在代码捕获错误。

<a href="https://github.com/prettier/eslint-config-prettier">eslint-config-prettier</a>可以不让eslint的风格选择妨碍您使用 Prettier。



eslint可能与prettier的规则冲突，但是我们需要以prettier为准，因为我们最后想要生成的代码是prettier定义的。所以需要在安装一个插件，但是我们在创建vue项目的时候，选择了prettier，那么这两个插件就会被自动安装了.

```ts
npm install eslint-plugin-prettier eslint-config-prettier -D
```

在.eslintrc文件中，添加插件

```ts
'extends': [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/eslint-config-typescript',
  '@vue/eslint-config-prettier/skip-formatting' // 确保将其放在最后，以便它有机会覆盖其他配置。
],
```

<a href="https://github.com/vuejs/eslint-config-prettier">@vue/eslint-config-prettier</a> ==> vue项目中它禁用所有不必要或可能与 Prettier 冲突的规则。

看看这篇文章：https://juejin.cn/post/7156893291726782500#heading-8





### 开发环境和生产环境

vite在开发期间(dev)， 是没有用到node环境的。所以没有process这个变量。

![image-20240306202947466](/Users/lihaoran/Library/Application Support/typora-user-images/image-20240306202947466.png)

## 引入element-plus

1. 安装`element-plus`

   ```js
   pnpm install element-plus
   ```

2. 在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

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

4. `vite.config.js`

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

5. 启动项目生成`auto-imports.d.ts`和`components.d.ts`

6. 在`tsconfig.json`中`include`添加上面两个文件

   ```ts
   "include": ["components.d.ts", "auto-imports.d.ts"]
   ```

7. 
