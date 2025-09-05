import DefaultTheme from "vitepress/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
// import Teek from "vitepress-theme-teek";
// import "vitepress-theme-teek/index.css";

import "@vitepress-demo-preview/component/dist/style.css";
import "../../../src/styles/index.css";
import './custom.css'
library.add(fas);

export default {
  ...DefaultTheme,
  // extends: Teek,
  enhanceApp({ app }) {
    // app.component("demo-preview", AntDesignContainer);
    app.component("demo-preview", ElementPlusContainer);
    // app.component("demo-preview", NaiveUIContainer);
  },
};
