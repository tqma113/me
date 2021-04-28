import React from 'react'
import { useHistory } from 'react-torch/client'

export type LinkProps = React.PropsWithChildren<{
  href: string
  className?: string
  style?: React.CSSProperties
  accessKey?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  blank?: true
}>

export const Link = ({
  href,
  children,
  style,
  className,
  onClick,
  accessKey,
  blank,
}: LinkProps) => {
  const history = useHistory()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!blank) {
      history.push(href)
      event.preventDefault()
    }
  }

  return (
    <a
      className={`link ${className || ''}`}
      href={href}
      onClick={onClick || handleClick}
      style={style}
      accessKey={accessKey}
      target={blank ? '_blank' : ''}
    >
      {children}
    </a>
  )
}
