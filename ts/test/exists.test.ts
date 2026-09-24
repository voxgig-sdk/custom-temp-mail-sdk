
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CustomTempMailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CustomTempMailSDK.test()
    equal(testsdk instanceof CustomTempMailSDK, true,
      'CustomTempMailSDK.test() must return a client synchronously')
  })

})
