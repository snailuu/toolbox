import path from 'node:path';
import process from 'node:process';
import { pluginPlayground } from '@rspress/plugin-playground';
import { pluginPreview } from '@rspress/plugin-preview';
import { globSync } from 'glob';
import fileTree from 'rspress-plugin-file-tree';
// import live2d from 'rspress-plugin-live2d';
import ghPages from 'rspress-plugin-gh-pages';
import readingTime from 'rspress-plugin-reading-time';
import { defineConfig } from 'rspress/config';

// import live2dModels from './live2d.model.json';

const __dirname = process.cwd();

const resolve = (url: string) => path.resolve(__dirname, url);

const config: any = defineConfig({
  root: resolve('./document'),
  base: '/toolbox/',
  logo: '/snailuu.png',
  icon: '/snailuu.png',
  logoText: '@snailuu',
  title: 'API 文档',
  description: '@snailuu/toolbox API 文档说明',
  search: {
    versioned: true,
  },
  route: {
    cleanUrls: true,
  },
  markdown: {
    checkDeadLinks: true,
    showLineNumbers: true,
    defaultWrapCode: true,
    globalComponents: globSync('src/**/*.jsx', { absolute: true }),
  },
  builderConfig: {
    tools: {
      rspack: {
        module: {
          rules: [{ resourceQuery: /raw/, type: 'asset/source' }],
        },
      },
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/snailuu/toolbox',
      },
      {
        icon: 'wechat',
        mode: 'text',
        content: 'snailuu1226',
      },
    ],
    lastUpdated: true,
    lastUpdatedText: '最后更新',
    nextPageText: '下一页',
    prevPageText: '上一页',
    hideNavbar: 'never',
    enableContentAnimation: true,
    enableScrollToTop: true,
    searchPlaceholderText: '搜索',
    outlineTitle: '目录',
  },
  head: [['link', { rel: 'manifest', href: '/toolbox/manifest.json' }]],
  plugins: [
    pluginPreview({ defaultRenderMode: 'pure' }),
    pluginPlayground({
      defaultRenderMode: 'pure',
      include: [
        ['@snailuu/base', '@snailuu/base'],
        ['web-vitals', 'web-vitals'],
      ],
    }),
    readingTime({ defaultLocale: 'zh-CN' }),
    // live2d({
    //   dockedPosition: 'left',
    //   mobileDisplay: false,
    //   sayHello: false,
    //   statusBar: {},
    //   tips: {},
    //   models: live2dModels as any,
    // }),
    ghPages({ repo: 'https://github.com/snailuu/toolbox.git', branch: 'document' }),
    fileTree({ initialExpandDepth: 0 }),
  ],
});

export default config;
