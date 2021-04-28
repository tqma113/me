import React from 'react'
import { createPage } from '@src/share'
import { usePaths } from '@src/hook'
import { fetchData } from '@src/api'
import { Link } from '@src/component'
import createStore from '@src/store'

import './index.less'

function Home() {
  return (
    <>
      <div className="name-container">
        <p className="name">Tianqi Ma</p>
      </div>
      <div className="avatar-container">
        <img className="avatar" alt="avatar" src="/icons/icon-512x512.png" />
      </div>
      <p className="position">Software Engineer</p>
      <p className="description">
        Photography enthusiast. I <span className="like-icon">❤</span> creating
        things.
      </p>
      <div className="remark">
        <p>
          I write tech in my{' '}
          <Link href="/notes" accessKey="n">
            Notes
          </Link>
          .
        </p>
        <p>
          I also take{' '}
          <Link href="/photography" accessKey="p">
            Photos
          </Link>
          .
        </p>
      </div>
    </>
  )
}

export default createPage(async ({ context }) => {
  usePaths([['me', '/']])

  const store = createStore()

  const beforeCreate = async () => {
    await fetchData(store, [], context)
  }

  return { store, beforeCreate, create: () => Home }
})
