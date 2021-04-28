import { createPage } from '@src/share'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import createStore from '@src/store'
import { NotFound } from '@src/component'

export default createPage(async ({ context }) => {
  usePaths([['me', '/']])

  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, [], context)
  }

  return { store, beforeCreate, create: () => NotFound }
})
