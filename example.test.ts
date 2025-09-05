import { expect, test } from 'vitest'

test('test common matcher', () => {
  const name = 'viking'
  expect(name).toBe('viking')
  expect(2+2).toBe(4)
  expect(2+2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(1).toBeGreaterThan(-1)
  expect(1).toBeLessThan(2)
})

test('test object', () => {
  expect({name: 'viking'}).toEqual({name: 'viking'})
})
