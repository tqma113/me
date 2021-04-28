import { createPage } from '@src/share'
import createStore from '@src/store'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import View from './View'

const Home = createPage(async ({ context }) => {
  usePaths([
    ['me', '/'],
    ['photography', '/photography'],
    ['months', '/photography/months'],
  ])

  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, ['/pictures'], context)
  }

  return { store, beforeCreate, create: () => View }
})

export default Home
