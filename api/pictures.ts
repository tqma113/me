import path from 'path'
import { Api } from 'farrow-api'
import { ApiService } from 'farrow-api-server'
import { ObjectType, Type, Literal, Union, List, Record } from 'farrow-schema'
import { Picture, PictureType, SystemError } from './schema'

export const GetPicturesInput = {}

export const PictureList = List(Picture)

export type PictureListType = PictureType[]

export const PictureRecord = Record(Record(PictureList))

export type PictureRecordType = Record<string, Record<string, PictureType>>
export class GetPicturesSuccess extends ObjectType {
  type = Literal('GetPicturesSuccess')
  pictures = {
    description: 'picture list',
    [Type]: PictureRecord,
  }
}
export const PicturePicturesOutput = Union(GetPicturesSuccess, SystemError)

export const getPictures = Api({
  description: 'get pictures',
  input: GetPicturesInput,
  output: PicturePicturesOutput,
})

getPictures.use(() => {
  try {
    const pictures = require(path.resolve(
      process.cwd(),
      './data/pictures.json'
    ))
    return {
      type: 'GetPicturesSuccess',
      pictures,
    }
  } catch (err) {
    return {
      type: 'SystemError',
      message: JSON.stringify(err),
    }
  }
})

export const entries = {
  getPictures,
}

export const picturesService = ApiService({ entries })
