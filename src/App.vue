<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
// import Alert from './components/Alert/Alert.vue';
// import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import { createMessage } from "./components/Message/method";
import type { ButtonInstance } from "./components/Button/types";
import type { NameType } from "./components/Collapse/types";
// import type { AlertInstance } from './components/Alert/types';
import type { TooltipInstance } from "./components/Tooltip/types";
import type { MenuOption } from "./components/Dropdown/types";
const buttonRef = ref<ButtonInstance | null>(null);
// const alertRef = ref<AlertInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null);
const size = ref<any>("2xl");
const trigger = ref<any>("click");
const options: MenuOption[] = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
const show = () => {
  tooltipRef.value?.show();
};
const hide = () => {
  tooltipRef.value?.hide();
};
const inlineConsole = (...args: any) => {
  console.log(...args);
};
onMounted(() => {
  createMessage({ message: "hello message", duration: 0, showClose: true });
  createMessage({ message: "hello message again", duration: 0, showClose: true, type: 'success' });
  createMessage({ message: "hello message three", duration: 0, showClose: true, type: 'danger' });
  // console.log("🚀 ~ alertRef:", alertRef.value?.ref)
  // console.log("🚀 ~ buttonRef:", buttonRef.value?.ref)
  setTimeout(() => {
    // instance.destory()
    // openedValue.value = ['a', 'b']
    // size.value = '5x'
    // alertRef.value?.close()
    // trigger.value = 'hover'
  }, 2000);
});
const openedValue = ref<NameType[]>(["a"]);
</script>

<template>
  <header>
    <Dropdown
      ref="tooltipRef"
      :menu-options="options"
      placement="right"
      :trigger="trigger"
      manual
      @visible-change="(e) => inlineConsole('visible-change', e)"
      @select="(e) => inlineConsole('select', e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Dropdown>
  </header>
  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" />
  <main>
    <!-- <Alert ref="alertRef" content="alert" @close="size = '9x'">
      <h1>1231</h1>
    </Alert> -->
    <Button ref="buttonRef" @click="show">Test Button</Button>
    <Button plain @click="hide">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>VK</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
    <Button size="large" loading>loading</Button><br /><br />
    <Button size="large" icon="truck-ramp-box">icon</Button><br /><br />

    <Collapse v-model="openedValue">
      <CollapseItem name="a" title="Title A">
        <!-- <template #title>
          <h1>slot title</h1>
        </template> -->
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </CollapseItem>
      <CollapseItem name="b" title="Title B">
        <div>this is bbbbb test</div>
      </CollapseItem>
      <CollapseItem name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </CollapseItem>
    </Collapse>
    <h1>{{ openedValue }}</h1>
  </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}

.vk-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    width: 100%;
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
