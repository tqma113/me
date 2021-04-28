import { useState } from 'react'
import { useHistory } from 'react-torch/client'

type MetaData = {
  title: string
  description: string
  language: string
  image: string
  author: string
}

const defaultData: MetaData = {
  title: 'Ma Tianqi(@tqma) - Software Engineer',
  description: "Ma Tianqi's personal website.",
  image: 'icons/icon-192x192.png',
  language: 'en',
  author: 'Ma Tianqi',
}

export const useSiteMeta = () => {
  const history = useHistory()
  const [data, setData] = useState({
    ...defaultData,
    url: history.createHref(history.location),
  })

  const setMetaData = (_data: Partial<MetaData>) => {
    setData({
      ...data,
      url: history.createHref(history.location),
      ..._data,
    })
  }

  return [data, setMetaData] as const
}
