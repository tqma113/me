import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { useStore } from 'react-redux'

import { Link, BackToTop } from '@src/component'
import * as renderers from './render'

import type { State, Action } from '@src/store'
import type { Note } from 'type'

export type ViewProps = {
  note: Note
}

const View = ({ note }: ViewProps) => {
  const store = useStore<State, Action>()
  const state = store.getState()

  useEffect(() => {
    store.dispatch({
      type: 'SET_META_DATA',
      payload: {
        title: `${note.title} | Notes by Ma Tianqi`,
      },
    })
  }, [])

  const date = dayjs(Number(note.createTime)).format('MMMM D, YYYY')

  return (
    <div className="note">
      <div className="note-title-container">
        <h1 className="title">{note.title}</h1>
        <div className="meta">
          <time>{date}</time>
          {note.tags.length > 0 && (
            <>
              <span> in </span>
              {note.tags
                .map((id) => state.tags.find((tag) => tag.id === id))
                .filter(Boolean)
                .map((tag, index, tags) => {
                  if (index === tags.length - 1) {
                    return (
                      <React.Fragment key={tag!.name}>
                        <Link
                          className="tag"
                          href={`/notes/tags/${tag!.name}`}
                        >
                          {tag!.title}
                        </Link>
                        <span>.</span>
                      </React.Fragment>
                    )
                  }
                  return (
                    <React.Fragment key={tag!.name}>
                      <Link
                        className="tag"
                        href={`/notes/tags/${tag!.name}`}
                      >
                        {tag!.title}
                      </Link>
                      <span className="span">, </span>
                    </React.Fragment>
                  )
                })}
            </>
          )}
          {note.tip && <p>{note.tip}</p>}
        </div>
      </div>
      <ReactMarkdown
        className="content"
        renderers={renderers}
        plugins={[gfm]}
      >
        {state.noteSet[note.name]}
      </ReactMarkdown>
      <BackToTop />
    </div>
  )
}

export default View