import { api } from './model'

import type { Context } from 'react-torch'
import type { Store } from 'redux'
import type { State, Action } from 'client'

type Input = '/notes' | '/tags' | '/pictures' | string

export const fetchData = async (
  store: Store<State, Action>,
  list: Input[],
  context: Context
) => {
  const promises: Promise<any>[] = []

  list.forEach((input) => {
    if (typeof input === 'string') {
      if (input === '/notes') {
        promises.push(fetchNotes(store))
      } else if (input === '/tags') {
        promises.push(fetchTags(store))
      } else if (input === '/pictures') {
        promises.push(fetchPictures(store))
      } else {
        promises.push(fetchNote(store, input))
      }
    }
  })

  return Promise.all(promises).catch((err) => {
    store.dispatch({
      type: 'SET_ERRORS',
      payload: [err.stack || err.message],
    })
  })
}

const fetchNotes = async (store: Store<State, Action>) => {
  return api.getNotes({}).then((res) => {
    switch (res.type) {
      case 'GetNotesSuccess': {
        store.dispatch({
          type: 'SET_NOTES',
          payload: res.notes,
        })
        break
      }
      case 'SystemError': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
    }
  })
}

const fetchTags = async (store: Store<State, Action>) => {
  return api.getTags({}).then((res) => {
    switch (res.type) {
      case 'GetTagsSuccess': {
        store.dispatch({
          type: 'SET_TAGS',
          payload: res.tags,
        })
        break
      }
      case 'SystemError': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
    }
  })
}

const fetchPictures = async (store: Store<State, Action>) => {
  return api.getPictures({}).then((res) => {
    switch (res.type) {
      case 'GetPicturesSuccess': {
        store.dispatch({
          type: 'SET_PICTURES',
          payload: res.pictures,
        })
        break
      }
      case 'SystemError': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
    }
  })
}

const fetchNote = async (store: Store<State, Action>, name: string) => {
  return api.getNote({ name }).then((res) => {
    switch (res.type) {
      case 'GetNoteSuccess': {
        store.dispatch({
          type: 'SET_NOTE',
          payload: [name, res.note],
        })
        break
      }
      case 'NoteIsBroken': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
      case 'NoteNotExist': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
      case 'SystemError': {
        store.dispatch({
          type: 'SET_ERRORS',
          payload: [res.message],
        })
        break
      }
    }
  })
}
