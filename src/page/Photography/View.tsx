import React from 'react'
import { useStore } from 'react-redux'
import dayjs from 'dayjs'
import LazyLoad from 'react-lazyload'
import styled, { keyframes } from 'styled-components'
import { Link, BackToTop } from '@src/component'
import type { State, Action } from '@src/store'
import type { Picture } from 'type'

import './index.less'

export default function Photography() {
  return (
    <div className="photography">
      <div className="title-container">
        <h1 className="title">Photography</h1>
        <div className="link-container">
          <Link href="/photography/months" className="link-with-underline">
            View all months
          </Link>
        </div>
      </div>
      <Photos />
      <BackToTop />
    </div>
  )
}

function Photos() {
  const store = useStore<State, Action>()
  const pictures = store.getState().displayPictures
  const years = Object.keys(pictures).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="photos">
      {years.map((year) => {
        return <PhotosByYear key={year} year={year} />
      })}
    </div>
  )
}

function PhotosByYear({ year }: { year: string }) {
  const store = useStore<State, Action>()
  const pictures = store.getState().displayPictures[year]
  const months = Object.keys(pictures).sort((a, b) => Number(a) - Number(b))

  return (
    <div className="photos-year">
      <h2 id={`year-${year}`}>
        <a href={`#year-${year}`} className="link-with-underline">
          {year}
        </a>
      </h2>
      {months.map((month) => {
        return (
          <PhotosByMonth key={`${year}-${month}`} year={year} month={month} />
        )
      })}
    </div>
  )
}

function PhotosByMonth({ year, month }: { year: string; month: string }) {
  const store = useStore<State, Action>()
  const pictures = store.getState().displayPictures[year][month]
  const groupedPictures = groupPictures(pictures)

  return (
    <div className="photos-month">
      <h3 id={`month-${month}`}>
        <a href={`#month-${month}`} className="link-with-underline">
          {month}
        </a>
      </h3>
      <div className="photo-list">
        {groupedPictures.map((group) => {
          if (Array.isArray(group)) {
            return (
              <DoublePhoto key={group[0].id} left={group[0]} right={group[1]} />
            )
          } else {
            return <SinglePhoto key={group.id} picture={group} />
          }
        })}
      </div>
    </div>
  )
}

function DoublePhoto({ left, right }: { left: Picture; right: Picture }) {
  return (
    <div className="double-photo">
      <Photo {...left} />
      <Photo {...right} />
    </div>
  )
}

function SinglePhoto({ picture }: { picture: Picture }) {
  return (
    <div className="single-photo">
      <Photo {...picture} />
    </div>
  )
}
const ImageWrapper = styled.div`
  padding: 56.25% 0 0;
  position: relative;
`

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
  width: 100%;
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

function Photo({ name, url, location, date }: Picture) {
  const dateStr = dayjs(Number(date)).format('MMMM D, YYYY')
  return (
    <div className="photo">
      <LazyImage src={url} alt={name} />
      <div className="title">
        <div className="title-content">{name}</div>
      </div>
      <div className="info">
        <div className="location">{location}</div>
        <div className="date">{dateStr}</div>
      </div>
    </div>
  )
}

export type LazyImageProps = {
  src: string
  alt: string
}
const LazyImage = ({ src, alt }: LazyImageProps) => {
  const refPlaceholder = React.useRef<HTMLDivElement | null>()

  const removePlaceholder = () => {
    refPlaceholder.current?.remove()
  }

  return (
    <ImageWrapper>
      {/** @ts-ignore */}
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </ImageWrapper>
  )
}

type PictureGroup = [Picture, Picture]

function groupPictures(pictures: Picture[]): (PictureGroup | Picture)[] {
  const length = pictures.length
  let result: (PictureGroup | Picture)[] = []

  for (let i = 0; i + 1 < length; i = i + 2) {
    result.push([pictures[i], pictures[i + 1]])
  }

  if (length % 2 === 1) {
    result.push(pictures[length - 1])
  }

  return result
}
