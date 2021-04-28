import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { State, MetaData } from 'client'

export const SEO = () => {
  const metadata = useSelector<State, MetaData>((state) => state.meta)

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="theme-color" content={'#d84136'} />
      <meta name="description" content={metadata.description} />
      <meta name="image" content={metadata.image} />
    </Helmet>
  )
}
