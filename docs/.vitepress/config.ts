import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';
// import { defineTeekConfig } from "vitepress-theme-teek/config";

// // Teek 主题配置
// const teekConfig = defineTeekConfig({});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hy Element",
  description: "高仿 ElementPlus 打造自己的组件库",
  base: '/hy-element/',
  // extends: teekConfig,
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
    ],

    sidebar: [
      {
        text: 'Hy Element 组件列表',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Tooltip 文字提示', link: '/components/tooltip' },
          { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
          { text: 'Message 消息提示', link: '/components/message' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hao-Cute/hy-element' }
    ]
  }
})
