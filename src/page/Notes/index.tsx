import React from 'react'
import { usePaths } from '@src/hook'
import { createPage } from '@src/share'
import { fetchData } from '@src/api'
import createStore from '@src/store'
import View from './View'

export default createPage(async ({ params, context, history }) => {
  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, ['/notes', '/tags'], context)
  }

  if (context.side === 'client')
    // @ts-ignore
    window.__history = history

  const create = () => {
    const state = store.getState()

    if (params?.tagName) {
      const tag = state.tags.find((tag) => tag.name === params.tagName)
      if (tag) {
        const displayNotes = state.notes.filter((note) =>
          note.tags.some((tagId) => tag.id === tagId)
        )
        store.dispatch({ type: 'SET_DISPLAY_NOTES', payload: displayNotes })

        usePaths([
          ['me', '/'],
          ['notes', '/notes'],
          ['tags', '/notes/tags'],
          [tag.name, `/notes/tags/${tag.name}`],
        ])

        return () => <View tagTitle={tag.title} />
      } else {
        store.dispatch({ type: 'SET_NOT_FOUND', payload: true })
        usePaths([['me', '/']])
      }
    } else {
      usePaths([
        ['me', '/'],
        ['notes', '/notes'],
      ])
    }

    return () => <View />
  }

  return { store, beforeCreate, create }
})
