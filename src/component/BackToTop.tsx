import React from 'react'
import { Link } from './index'

export const BackToTop = () => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    window.scrollTo({ top: 0 })
    event.preventDefault()
  }

  return (
    <div className="back-to-top">
      <Link href="#top" onClick={handleClick}>
        ⇪ Back to top
      </Link>
    </div>
  )
}
