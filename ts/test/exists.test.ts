
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CustomTempMailSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CustomTempMailSDK.test()
    equal(null !== testsdk, true)
  })

})
