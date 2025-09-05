<template>
  <div ref="popperContainerNode" class="vk-tooltip" v-on="outerEvents">
    <div ref="triggerNode" class="vk-tooltip__trigger" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" ref="popperNode" class="vk-tooltip__popper">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue';
import type { TooltipInstance, TooltipEmits, TooltipProps } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';
defineOptions({
  name: 'VkTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions,
  }
})
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
  isOpen.value = false
  emits('visible-change', false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
watch(() => props.manual, (newValue) => {
  if (newValue) {
    // clear the events
    events = {}
    outerEvents = {}
  } else {
    attachEvents()
  }
})
watch(() => props.trigger, () => {
  // clear the events
  events = {}
  outerEvents = {}
  attachEvents()
})
watch(isOpen, (newValue) => {
  if (newValue) {
    if (popperNode.value && triggerNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
},
  { flush: 'post' }
)
onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})
</script>
