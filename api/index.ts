import path from 'path'
import { getNote } from './note'
import { getNotes } from './notes'
import { getTags } from './tags'
import { getPictures } from './pictures'
import { ApiService } from 'farrow-api-server'

const entries = {
  getNote,
  getNotes,
  getTags,
  getPictures,
}

const api = ApiService({ entries })

api.serve('assets', path.resolve(__dirname, '../data'))

export default api
