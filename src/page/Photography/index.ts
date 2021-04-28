import { createPage } from '@src/share'
import createStore from '@src/store'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import View from './View'

const Home = createPage(async ({ params, context, history }) => {
  usePaths([
    ['me', '/'],
    ['photography', '/'],
  ])

  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, ['/pictures'], context)
  }

  const create = () => {
    const state = store.getState()

    const year = params?.year || params?.onlyYear
    if (year) {
      const picturesByYear = state.pictures[year]
      if (picturesByYear) {
        if (params?.month) {
          const pictures = picturesByYear[params.month]
          if (pictures) {
            const displayNotes = {
              [year]: {
                [params.month]: pictures,
              },
            }
            store.dispatch({
              type: 'SET_DISPLAY_PICTURES',
              payload: displayNotes,
            })

            usePaths([
              ['me', '/'],
              ['photography', '/photography'],
              [year, `/photography/${year}`],
              [params.month, `/photography/${year}/${params.month}`],
            ])
          } else {
            history.push(`/photography/${year}`)
          }
        } else {
          const displayNotes = {
            [year]: picturesByYear,
          }
          store.dispatch({
            type: 'SET_DISPLAY_PICTURES',
            payload: displayNotes,
          })

          usePaths([
            ['me', '/'],
            ['photography', '/photography'],
            [year, `/photography/${year}`],
          ])
        }
      } else {
        history.push(`/photography`)
      }
    } else {
      store.dispatch({ type: 'SET_DISPLAY_PICTURES', payload: state.pictures })

      usePaths([
        ['me', '/'],
        ['photography', '/photography'],
      ])
    }

    return View
  }

  return { store, beforeCreate, create }
})

export default Home
