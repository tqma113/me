import path from 'path'
import { Api } from 'farrow-api'
import { ApiService } from 'farrow-api-server'
import { ObjectType, Type, Literal, Union, List } from 'farrow-schema'
import { Note, SystemError } from './schema'

export const GetNotesInput = {}

export const NoteList = List(Note)
export class GetNotesSuccess extends ObjectType {
  type = Literal('GetNotesSuccess')
  notes = {
    description: 'Note list',
    [Type]: NoteList,
  }
}
export const GetNotesOutput = Union(GetNotesSuccess, SystemError)

export const getNotes = Api({
  description: 'get notes',
  input: GetNotesInput,
  output: GetNotesOutput,
})

getNotes.use(() => {
  try {
    const notes = require(path.resolve(process.cwd(), './data/notes.json'))
    return {
      type: 'GetNotesSuccess',
      notes,
    }
  } catch (err) {
    return {
      type: 'SystemError',
      message: JSON.stringify(err),
    }
  }
})

export const entries = {
  getNotes,
}

export const notesService = ApiService({ entries })
