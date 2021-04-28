import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import type { Note, Tag, Picture } from 'type'

export type MetaData = {
  title: string
  description: string
  language: string
  image: string
  author: string
}

export type State = {
  errors: string[]
  notes: Note[]
  displayNotes: Note[]
  tags: Tag[]
  noteSet: Record<string, string>
  notfound: boolean
  meta: MetaData
  pictures: Record<string, Record<string, Picture[]>>
  displayPictures: Record<string, Record<string, Picture[]>>
}

const initialState: State = {
  errors: [],
  notes: [],
  displayNotes: [],
  tags: [],
  noteSet: {},
  notfound: false,
  meta: {
    title: 'Ma Tianqi(@tqma) - Software Engineer',
    description: "Ma Tianqi's personal website.",
    image: 'icons/icon-192x192.png',
    language: 'en',
    author: 'Ma Tianqi',
  },
  pictures: {},
  displayPictures: {},
}

const UNSAFE_SETSTATE = 'UNSAFE_SETSTATE'

const SET_TAGS = 'SET_TAGS'
const SET_PICTURES = 'SET_PICTURES'
const SET_DISPLAY_PICTURES = 'SET_DISPLAY_PICTURES'
const SET_NOTES = 'SET_NOTES'
const SET_NOTE = 'SET_NOTE'
const SET_ERRORS = 'SET_ERRORS'
const SET_NOT_FOUND = 'SET_NOT_FOUND'
const SET_DISPLAY_NOTES = 'SET_DISPLAY_NOTES'
const SET_META_DATA = 'SET_META_DATA'

type UNSAFE_SETSTATE_ACTION = {
  type: typeof UNSAFE_SETSTATE
  payload: State
}

type SET_TAGS_ACTION = {
  type: typeof SET_TAGS
  payload: Tag[]
}

type SET_PICTURES_ACTION = {
  type: typeof SET_PICTURES
  payload: Record<string, Record<string, Picture[]>>
}

type SET_DISPLAY_PICTURES_ACTION = {
  type: typeof SET_DISPLAY_PICTURES
  payload: Record<string, Record<string, Picture[]>>
}

type SET_NOTES_ACTION = {
  type: typeof SET_NOTES
  payload: Note[]
}

type SET_NOTE_ACTION = {
  type: typeof SET_NOTE
  payload: [string, string]
}

type SET_ERRORS_ACTION = {
  type: typeof SET_ERRORS
  payload: string[]
}

type SET_NOT_FOUND_ACTION = {
  type: typeof SET_NOT_FOUND
  payload: boolean
}

type SET_DISPLAY_NOTES_ACTION = {
  type: typeof SET_DISPLAY_NOTES
  payload: Note[]
}

type SET_META_DATA_ACTION = {
  type: typeof SET_META_DATA
  payload: Partial<MetaData>
}

export type Action =
  | UNSAFE_SETSTATE_ACTION
  | SET_TAGS_ACTION
  | SET_PICTURES_ACTION
  | SET_DISPLAY_PICTURES_ACTION
  | SET_NOTE_ACTION
  | SET_NOTES_ACTION
  | SET_ERRORS_ACTION
  | SET_NOT_FOUND_ACTION
  | SET_DISPLAY_NOTES_ACTION
  | SET_META_DATA_ACTION

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'UNSAFE_SETSTATE': {
      return action.payload
    }
    case 'SET_TAGS': {
      return {
        ...state,
        tags: action.payload,
      }
    }
    case 'SET_PICTURES': {
      return {
        ...state,
        pictures: action.payload,
      }
    }
    case 'SET_DISPLAY_PICTURES': {
      return {
        ...state,
        displayPictures: action.payload,
      }
    }
    case 'SET_NOTE': {
      const [key, value] = action.payload
      return {
        ...state,
        noteSet: {
          ...state.noteSet,
          [key]: value,
        },
      }
    }
    case 'SET_NOTES': {
      return {
        ...state,
        displayNotes: action.payload,
        notes: action.payload,
      }
    }
    case 'SET_ERRORS': {
      return {
        ...state,
        errors: state.errors.concat(action.payload),
      }
    }
    case 'SET_NOT_FOUND': {
      return {
        ...state,
        notfound: action.payload,
      }
    }
    case 'SET_DISPLAY_NOTES': {
      return {
        ...state,
        displayNotes: action.payload,
      }
    }
    case 'SET_META_DATA': {
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      }
    }
  }

  return state
}

export default function () {
  const reduxStore = createStore(reducer, initialState, composeWithDevTools())
  return Object.assign(reduxStore, {
    __UNSAFE_SET_STATE__(state: State) {
      reduxStore.dispatch({ type: UNSAFE_SETSTATE, payload: state })
    },
  })
}
