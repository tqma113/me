import React, { useMemo, useEffect } from 'react'
import { useStore } from 'react-redux'
import { Link } from '@src/component'
import type { State, Action } from '@src/store'
import type { Tag } from 'type'

import './index.less'

export type TagWithcount = Tag & {
  count: number
}

export default function TagsPage() {
  const store = useStore<State, Action>()

  useEffect(() => {
    store.dispatch({
      type: 'SET_META_DATA',
      payload: {
        title: 'All tags | Notes by Ma Tianqi',
      },
    })
  }, [])

  return (
    <div className="tags">
      <div className="title-container">
        <h1 className="title">Tags</h1>
        <div className="link-container">
          <Link href="/notes" className="link-with-underline">
            View all notes
          </Link>
        </div>
      </div>
      <Tags />
    </div>
  )
}

function Tags() {
  const store = useStore<State, Action>()
  const { tags, notes } = store.getState()

  const tagsData: TagWithcount[] = useMemo(() => {
    return tags.map((tag) => {
      return {
        ...tag,
        count: notes.reduce((count, note) => {
          return note.tags.some((tagId) => tagId === tag.id) ? count + 1 : count
        }, 0),
      }
    })
  }, [tags, notes])

  return (
    <section className="tags-container">
      {tagsData.length > 0 ? (
        <ul className="tag-list">
          {tagsData.map((tag) => {
            return <TagComponent key={tag.name} tag={tag} />
          })}
        </ul>
      ) : (
        'Stay tuned...'
      )}
    </section>
  )
}

export type TagComponentProps = {
  tag: TagWithcount
}

function TagComponent({ tag }: TagComponentProps) {
  return (
    <li>
      <Link href={`/notes/tags/${tag.name}`}>{tag.title}</Link>
      <span className="tag-count">({tag.count})</span>
    </li>
  )
}
