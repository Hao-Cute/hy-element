import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import { h } from 'vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: h(CollapseItem, { name: 'a', title: 'Title A' }, () => 'content a')
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log("🚀 ~ :20 ~ test ~ wrapper:", wrapper.html());
  })
})
