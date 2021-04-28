import fs from 'fs'
import path from 'path'
import { Api } from 'farrow-api'
import { ObjectType, Type, Literal, Union } from 'farrow-schema'
import { SystemError } from './schema'
import type { NoteType } from './schema'

const NOTES_PATH = './data/notes.json'
const NOTE_PATH = './data/note'

export class GetNoteInput extends ObjectType {
  name = {
    description: 'Note name',
    [Type]: String,
  }
}

export class GetNoteSuccess extends ObjectType {
  type = Literal('GetNoteSuccess')
  note = {
    description: 'Note content',
    [Type]: String,
  }
}

export class NoteNotExist extends ObjectType {
  type = Literal('NoteNotExist')
  message = {
    description: 'NoteNotExist message',
    [Type]: String,
  }
}

export class NoteIsBroken extends ObjectType {
  type = Literal('NoteIsBroken')
  message = {
    description: 'NoteIsBroken message',
    [Type]: String,
  }
}

export const GetNoteOutput = Union(
  GetNoteSuccess,
  NoteNotExist,
  NoteIsBroken,
  SystemError
)

export const getNote = Api({
  description: 'get note content',
  input: GetNoteInput,
  output: GetNoteOutput,
})

getNote.use(({ name }) => {
  try {
    const notes: NoteType[] = require(path.resolve(process.cwd(), NOTES_PATH))
    const note = notes.find((item) => item.name === name)
    if (note) {
      const filePath = path.resolve(process.cwd(), NOTE_PATH, `${name}.mdx`)
      if (fs.existsSync(filePath)) {
        const mdx = fs.readFileSync(filePath, 'utf-8')
        return {
          type: 'GetNoteSuccess',
          note: mdx,
        }
      } else {
        return {
          type: 'NoteIsBroken',
          message: `The note: ${name} is broken`,
        }
      }
    } else {
      return {
        type: 'NoteNotExist',
        message: `The note: ${name} is not exist`,
      }
    }
  } catch (err) {
    return {
      type: 'SystemError',
      message: JSON.stringify(err),
    }
  }
})
