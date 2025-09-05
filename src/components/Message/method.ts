import { render, h, shallowReactive } from "vue";
import type { CreateMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";
let seed = 1;
const instances: MessageContext[] = shallowReactive([]);
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`;
  const { nextZIndex } = useZIndex();
  const container = document.createElement("div");
  const destory = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => (instance.id === id));
    if (idx === -1) {
      return;
    }
    instances.splice(idx, 1);
    render(null, container);
  };
  // 手动调用删除, 其实就是手动调整组件中 visible 的值
  // visible 是通过 expose 传出来的
  const manualDestory = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);

  // 非空断言操作符
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestory,
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances.at(-1);
};

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) {
    return 0;
  } else {
    const pre = instances[idx - 1];
    return pre.vm.exposed!.bottomOffset.value;
  }
};

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory()
  })
}
