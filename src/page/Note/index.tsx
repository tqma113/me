import React from 'react'
import { createPage } from '@src/share'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import createStore from '@src/store'
import View from './View'

import './index.less'

export default createPage(async ({ history, params, context }) => {
  const noteName = params?.noteName

  const store = createStore()

  const beforeCreate = async () => {
    if (noteName) {
      await fetchData(store, ['/notes', '/tags', params.noteName], context)
    }
  }

  const create = () => {
    const state = store.getState()

    let PageView = () => <></>

    if (noteName && state.noteSet[noteName]) {
      const note = state.notes.find((note) => note.name === params.noteName)
      if (note) {
        usePaths([
          ['me', '/'],
          ['notes', '/notes'],
          [note.name, `/notes/${note.name}`],
        ])

        PageView = () => <View note={note} />
      } else {
        store.dispatch({ type: 'SET_NOT_FOUND', payload: true })
        usePaths([['me', '/']])
      }
    } else {
      store.dispatch({ type: 'SET_NOT_FOUND', payload: true })
      usePaths([['me', '/']])
    }

    return PageView
  }

  return { store, beforeCreate, create }
})
