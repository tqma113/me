import React from 'react'
import { useHistory } from 'react-torch/client'

export const NotFound = () => {
  const history = useHistory()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    history.push('/')
    event.preventDefault()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 650 }}>Page not found</h1>
      <h1 style={{ fontSize: '100px', fontWeight: 650 }}>404</h1>
      <p>
        Back to{' '}
        <a className="link" href="/" onClick={handleClick}>
          Homepage
        </a>
        .
      </p>
    </div>
  )
}
