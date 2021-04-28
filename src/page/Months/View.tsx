import React from 'react'
import { useStore } from 'react-redux'
import { Link, BackToTop } from '@src/component'
import type { State, Action } from '@src/store'

import './index.less'

export default function MonthsView() {
  return (
    <div className="months">
      <div className="title-container">
        <h1 className="title">Months</h1>
      </div>
      <Months />
      <BackToTop />
    </div>
  )
}

function Months() {
  const store = useStore<State, Action>()
  const pictures = store.getState().pictures
  const years = Object.keys(pictures).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="photos">
      {years.map((year) => {
        return <Year key={year} year={year} />
      })}
    </div>
  )
}

function Year({ year }: { year: string }) {
  const store = useStore<State, Action>()
  const pictures = store.getState().pictures[year]
  const months = Object.keys(pictures).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="photos-year">
      <h2 id={`year-${year}`}>
        <Link href={`/photography/${year}`} className="link-with-underline">
          {year}
        </Link>
      </h2>
      {months.map((month) => {
        return <Month key={`${year}-${month}`} year={year} month={month} />
      })}
    </div>
  )
}

function Month({ year, month }: { year: string; month: string }) {
  return (
    <div className="photos-month">
      <h3 id={`month-${month}`}>
        <Link
          href={`/photography/${year}/${month}`}
          className="link-with-underline"
        >
          {month}
        </Link>
      </h3>
    </div>
  )
}
