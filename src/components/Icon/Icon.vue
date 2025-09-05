<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }" :style="custemStyle" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>
<script setup lang="ts">
import { omit } from 'lodash-es';
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue';
defineOptions({
  name: 'VkIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const custemStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
