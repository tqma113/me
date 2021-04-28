import React, { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import dayjs from 'dayjs'
import { Link } from '@src/component'
import type { State, Action } from 'client'
import type { Note } from 'type'

import './style.less'

export type NotesPageProps = {
  tagTitle?: string
}

export default function NotesPage({ tagTitle }: NotesPageProps) {
  const store = useStore<State, Action>()
  useEffect(() => {
    if (tagTitle) {
      store.dispatch({
        type: 'SET_META_DATA',
        payload: {
          title: `${tagTitle} | Notes by Ma Tianqi`,
        },
      })
    } else {
      store.dispatch({
        type: 'SET_META_DATA',
        payload: {
          title: 'Notes by Ma Tianqi',
        },
      })
    }
  }, [])

  return (
    <div className="notes">
      <div className="title-container">
        <h1 className="title">Notes</h1>
        <div className="link-container">
          <Link href="/notes/tags" className="link-with-underline">
            View all tags
          </Link>
        </div>
      </div>
      <Notes />
    </div>
  )
}

function Notes() {
  const notes = useSelector<State, Note[]>((state) => state.displayNotes)

  if (notes.length === 0) return <>Stay tuned...</>

  return (
    <section className="note-list-container">
      <ul className="note-list">
        {notes.map((note) => (
          <NoteComponent key={note.name} note={note} />
        ))}
      </ul>
    </section>
  )
}

export type NoteProps = {
  note: Note
}

function NoteComponent({ note }: NoteProps) {
  const date = dayjs(Number(note.createTime)).format('MMMM D, YYYY')

  return (
    <li className="note">
      <div className="note-title-container">
        <Link href={`/notes/${note.name}`}>
          <p className="note-title">{note.title}</p>
        </Link>
      </div>
      <div className="note-time-container">
        <time>{date}</time>
      </div>
      <p className="note-description">{note.description}</p>
    </li>
  )
}
