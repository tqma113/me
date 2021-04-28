import path from 'path'
import { Api } from 'farrow-api'
import { ApiService } from 'farrow-api-server'
import { ObjectType, Type, Literal, Union, List } from 'farrow-schema'
import { Tag, SystemError } from './schema'

export const GetTagsInput = {}

export const TagList = List(Tag)
export class GetTagsSuccess extends ObjectType {
  type = Literal('GetTagsSuccess')
  tags = {
    description: 'tag list',
    [Type]: TagList,
  }
}
export const TagTagsOutput = Union(GetTagsSuccess, SystemError)

export const getTags = Api({
  description: 'get tags',
  input: GetTagsInput,
  output: TagTagsOutput,
})

getTags.use(() => {
  try {
    const tags = require(path.resolve(process.cwd(), './data/tags.json'))
    return {
      type: 'GetTagsSuccess',
      tags,
    }
  } catch (err) {
    return {
      type: 'SystemError',
      message: JSON.stringify(err),
    }
  }
})

export const entries = {
  getTags,
}

export const tagsService = ApiService({ entries })
