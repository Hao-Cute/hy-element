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
        text: 'Basic',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Select', link: '/components/select' },
          { text: 'Form', link: '/components/form' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
