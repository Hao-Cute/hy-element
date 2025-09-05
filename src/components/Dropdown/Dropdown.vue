<template>
  <div class="vk-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="vk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="vk-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              @click="itemClick(item)"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import RenderVnode from "../Common/RenderVnode";
import { ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";

defineOptions({
  name: 'VkDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return;
  }
  emits("select", e);
  console.log("🚀 ~ :49 ~ itemClick ~ props.hideAfterClick:", props.hideAfterClick)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
};
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
})
</script>
