/**
 * This file was generated by farrow-api
 * Don't modify it manually
 */

import { createApiPipelineWithUrl } from 'farrow-api-client'

/**
 * {@label GetNoteInput}
 */
export type GetNoteInput = {
  /**
   * @remarks Note name
   */
  name: string
}

/**
 * {@label GetNoteSuccess}
 */
export type GetNoteSuccess = {
  type: 'GetNoteSuccess'
  /**
   * @remarks Note content
   */
  note: string
}

/**
 * {@label NoteNotExist}
 */
export type NoteNotExist = {
  type: 'NoteNotExist'
  /**
   * @remarks NoteNotExist message
   */
  message: string
}

/**
 * {@label NoteIsBroken}
 */
export type NoteIsBroken = {
  type: 'NoteIsBroken'
  /**
   * @remarks NoteIsBroken message
   */
  message: string
}

/**
 * {@label SystemError}
 */
export type SystemError = {
  type: 'SystemError'
  /**
   * @remarks SystemError message
   */
  message: string
}

/**
 * {@label GetNotesSuccess}
 */
export type GetNotesSuccess = {
  type: 'GetNotesSuccess'
  /**
   * @remarks Note list
   */
  notes: Note[]
}

/**
 * {@label Note}
 */
export type Note = {
  /**
   * @remarks Note id
   */
  id: number
  /**
   * @remarks Note title
   */
  title: string
  /**
   * @remarks Note name
   */
  name: string
  /**
   * @remarks Note description
   */
  description: string
  /**
   * @remarks Note createTime
   */
  createTime: string
  /**
   * @remarks Note modifiedTime
   */
  modifiedTime: string
  /**
   * @remarks Note tags
   */
  tags: number[]
  /**
   * @remarks Note tip
   */
  tip: string
}

/**
 * {@label GetTagsSuccess}
 */
export type GetTagsSuccess = {
  type: 'GetTagsSuccess'
  /**
   * @remarks tag list
   */
  tags: Tag[]
}

/**
 * {@label Tag}
 */
export type Tag = {
  /**
   * @remarks Tag id
   */
  id: number
  /**
   * @remarks Tag title
   */
  title: string
  /**
   * @remarks Tag name
   */
  name: string
  /**
   * @remarks Tag description
   */
  description: string
}

/**
 * {@label GetPicturesSuccess}
 */
export type GetPicturesSuccess = {
  type: 'GetPicturesSuccess'
  /**
   * @remarks picture list
   */
  pictures: Record<string, Record<string, Picture[]>>
}

/**
 * {@label Picture}
 */
export type Picture = {
  /**
   * @remarks Picture id
   */
  id: number
  /**
   * @remarks Picture name
   */
  name: string
  /**
   * @remarks Picture location
   */
  location: string
  /**
   * @remarks Picture date
   */
  date: string
  /**
   * @remarks Picture url
   */
  url: string
}

export const url = '/api'

export const apiPipeline = createApiPipelineWithUrl(url)

export const api = {
  /**
   * @remarks get note content
   */
  getNote: (input: GetNoteInput) =>
    apiPipeline.invoke({ path: ['getNote'], input }) as Promise<
      GetNoteSuccess | NoteNotExist | NoteIsBroken | SystemError
    >,
  /**
   * @remarks get notes
   */
  getNotes: (input: {}) =>
    apiPipeline.invoke({ path: ['getNotes'], input }) as Promise<
      GetNotesSuccess | SystemError
    >,
  /**
   * @remarks get tags
   */
  getTags: (input: {}) =>
    apiPipeline.invoke({ path: ['getTags'], input }) as Promise<
      GetTagsSuccess | SystemError
    >,
  /**
   * @remarks get pictures
   */
  getPictures: (input: {}) =>
    apiPipeline.invoke({ path: ['getPictures'], input }) as Promise<
      GetPicturesSuccess | SystemError
    >,
}
