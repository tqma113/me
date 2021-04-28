import { createPage } from '@src/share'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import createStore from '@src/store'
import Tags from './View'

export default createPage(async ({ history, params, context }) => {
  usePaths([
    ['me', '/'],
    ['notes', '/notes'],
    ['tags', '/notes/tags'],
  ])

  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, ['/tags', '/notes'], context)
  }

  const create = () => Tags

  return { store, beforeCreate, create }
})
