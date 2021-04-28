import { Int, List, ObjectType, Type, Literal, TypeOf } from 'farrow-schema'

export const Numbers = List(Number)

export class Note extends ObjectType {
  id = {
    description: `Note id`,
    [Type]: Int,
  }

  title = {
    description: `Note title`,
    [Type]: String,
  }

  name = {
    description: `Note name`,
    [Type]: String,
  }

  description = {
    description: `Note description`,
    [Type]: String,
  }

  createTime = {
    description: `Note createTime`,
    [Type]: String,
  }

  modifiedTime = {
    description: `Note modifiedTime`,
    [Type]: String,
  }

  tags = {
    description: `Note tags`,
    [Type]: Numbers,
  }

  tip = {
    description: `Note tip`,
    [Type]: String,
  }
}

export type NoteType = TypeOf<Note>

export class Tag extends ObjectType {
  id = {
    description: `Tag id`,
    [Type]: Int,
  }

  title = {
    description: `Tag title`,
    [Type]: String,
  }

  name = {
    description: `Tag name`,
    [Type]: String,
  }

  description = {
    description: `Tag description`,
    [Type]: String,
  }
}

export type TagType = TypeOf<Tag>

export class Picture extends ObjectType {
  id = {
    description: `Picture id`,
    [Type]: Int,
  }

  name = {
    description: `Picture name`,
    [Type]: String,
  }

  location = {
    description: `Picture location`,
    [Type]: String,
  }

  date = {
    description: `Picture date`,
    [Type]: String,
  }

  url = {
    description: `Picture url`,
    [Type]: String,
  }
}

export type PictureType = TypeOf<Picture>

export class SystemError extends ObjectType {
  type = Literal('SystemError')
  message = {
    description: 'SystemError message',
    [Type]: String,
  }
}
