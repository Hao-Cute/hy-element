import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  const onChange = vi.fn()
  test('basic collapse', async () => {
    const wrapper = mount(() =>
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a" >
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
      ,
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      }
    )
    // console.log("🚀 ~ :20 ~ test ~ wrapper:", wrapper.html());
    const headers = wrapper.findAll('.vk-collapse-item__header')
    const contents = wrapper.findAll('.vk-collapse-item__wrapper')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // console.log("🚀 ~ :35 ~ test ~ contents.length:", contents.length);
    // console.log("🚀 ~ :35 ~ test ~ headers.length:", headers.length);

    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')
    // console.log("🚀 ~ :41 ~ test ~ firstHeader.text():", firstHeader.text());

    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    const thirdContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    // console.log("🚀 ~ :47 ~ test ~ firstContent.isVisible():", firstContent.isVisible());
    expect(secondContent.isVisible()).toBeFalsy()

    // 行为
    await firstHeader.trigger('click')
    // console.log("🚀 ~ :53 ~ test ~ firstContent.html():", firstContent.html());
    expect(firstContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])
    await secondHeader.trigger('click')
    expect(secondHeader.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])

    // disabled
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    // console.log("🚀 ~ :63 ~ test ~ disableHeader.html():", thirdContent.html());
    expect(thirdContent.isVisible()).toBeFalsy()
  })
})
