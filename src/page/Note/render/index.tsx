import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Link } from '@src/component'

import './index.less'

export type CodeProps = {
  language: string
  value: string
}

export const code: React.ElementType = ({ language, value }: CodeProps) => {
  return (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={language || 'javascript'}
      children={value}
    />
  )
}

export const inlineCode: React.ElementType = ({ value }) => {
  return <code className="code">{value}</code>
}

export const link: React.ElementType = ({ href, children }) => {
  return (
    <Link blank href={href}>
      {children}
    </Link>
  )
}

export const thematicBreak: React.ElementType = () => {
  return <div className="divider" />
}

export const heading: React.ElementType = ({ level, children }) => {
  switch (level) {
    case 1: {
      return <h1 className="h1">{children}</h1>
    }
    case 2: {
      return <h2 className="h2">{children}</h2>
    }
    case 3: {
      return <h3 className="h3">{children}</h3>
    }
    case 4: {
      return <h4 className="h4">{children}</h4>
    }
    case 5: {
      return <h5 className="h5">{children}</h5>
    }
    case 6: {
      return <h6 className="h6">{children}</h6>
    }
  }

  return null
}

export const text: React.ElementType = ({ children }) => {
  return children
}

export const paragraph: React.ElementType = ({ children }) => {
  return <p className="p">{children}</p>
}

export const image: React.ElementType = ({ alt, src, title }) => {
  return <img className="image" alt={alt} src={src} title={title} />
}
