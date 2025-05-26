# @snailuu/git-down

下载 GitHub 仓库或单文件的工具包

## 功能

- 支持下载整个 GitHub 仓库
- 支持下载仓库中的单个文件或目录
- 使用 Git 的 sparse checkout 功能高效下载部分仓库内容
- 提供 Promise 和 callback 两种调用方式
- 自动清理临时文件

## 安装

```bash
npm install @snailuu/git-down
# 或
yarn add @snailuu/git-down
# 或
pnpm add @snailuu/git-down
```

## 使用方法

### 下载整个仓库

```js
import gitDown from '@snailuu/git-down';

// Promise 方式
await gitDown('https://github.com/snailuu/toolbox', {
  output: './output-dir',
  branch: 'main'
});
```

```js
// 回调方式
import { gitDownWithCallback } from '@snailuu/git-down';

gitDownWithCallback('https://github.com/snailuu/toolbox', { output: './output-dir' }, (error) => {
  if (error)
    console.error('下载失败:', error);
  else console.log('下载成功');
});
```

### 下载特定文件或目录

```js
// 下载特定目录
await gitDown('https://github.com/snailuu/toolbox/tree/main/packages/git-down', {
  output: './output-dir'
});

// 下载特定文件
await gitDown('https://github.com/snailuu/toolbox/blob/main/README.md', {
  output: './output-dir'
});
```

### 解析 GitHub URL

```js
import { parseGitUrl } from '@snailuu/git-down';

const urlInfo = parseGitUrl('https://github.com/snailuu/toolbox/tree/main/packages/git-down');
console.log(urlInfo);
// {
//   href: 'https://github.com/snailuu/toolbox/tree/main/packages/git-down',
//   owner: 'snailuu',
//   project: 'toolbox',
//   isRepo: false,
//   sourceType: 'dir',
//   branch: 'main',
//   pathname: 'packages/git-down'
// }
```

## 选项

| 选项   | 类型   | 默认值       | 描述               |
| ------ | ------ | ------------ | ------------------ |
| output | string | './git-down' | 下载内容的输出路径 |
| branch | string | 'main'       | 下载的分支名称     |

## 注意事项

下载过程中会频繁修改执行目录，请勿在运行期间执行文件相关操作，除非你清楚执行目录的修改行为。

## 许可证

MIT
