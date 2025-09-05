import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button test'
      }
    })
    console.log(wrapper.html());
    expect(wrapper.classes()).toContain('vk-button--primary')
    console.log("🚀 ~ test ~ expect(wrapper.classes()):", wrapper.classes())
    // slot
    // get, find
    expect(wrapper.get('button').text()).toBe('button test')
    console.log("🚀 ~ test ~ wrapper.get('.vk-button--primary').text():", wrapper.get('.vk-button--primary').text())
    // events
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled:true
      },
      slots: {
        default: 'disabled button'
      }
    })
    console.log(wrapper.html());
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    console.log("🚀 ~ test ~ wrapper.attributes('disabled'):", wrapper.attributes('disabled'))
    // attributes
    expect(wrapper.find('button').element.disabled).toBeDefined()
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
    console.log("🚀 ~ test ~ wrapper.emitted():", wrapper.emitted())
  })
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log("🚀 ~ :57 ~ test ~ wrapper.html():", wrapper.html());
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    console.log("🚀 ~ :65 ~ test ~ wrapper.element:", wrapper.element.disabled);
    expect(wrapper.element.disabled).toBeTruthy()
    console.log("🚀 ~ :66 ~ test ~ wrapper.attributes('disabled'):", wrapper.attributes('disabled'));
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
