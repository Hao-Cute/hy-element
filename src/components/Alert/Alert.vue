<template>
  <div v-if="!isClosed" ref="alertRef" class="vk-alert">
    <div class="vk-alert__content">
      <slot>
        {{ content }}
      </slot>
    </div>
    <Icon v-if="closable" icon="xmark" @click="handleClosed" />
  </div>
</template>

<script setup lang="ts">
import type { AlertEvents, AlertProps } from './types';
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';
withDefaults(defineProps<AlertProps>(), {
  closable: true
})
const emit = defineEmits<AlertEvents>()
const isClosed = ref(false)
const handleClosed = () => {
  isClosed.value = true;
  emit('close')
}
const alertRef = ref(null)
defineExpose({
  ref: alertRef,
  close: handleClosed
})
</script>
