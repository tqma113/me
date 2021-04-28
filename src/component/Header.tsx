import React from 'react'
import { useHistory } from 'react-torch/client'
import { usePaths } from '@src/hook'
import { ThemeToggle, Github, Mail } from './index'

export const Header = () => {
  const [paths] = usePaths()
  const history = useHistory()
  const _paths = paths.slice()
  const tail = _paths.pop()

  return (
    <header className="header">
      <div className="header-box">
        <nav className="nav">
          {_paths.map((path) => {
            const [name, href] = path
            const handleClick = (
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              history.push(href)
              event.preventDefault()
            }
            return (
              <span key={name}>
                <a className="link" href={href} onClick={handleClick}>
                  /&nbsp;{name}&nbsp;&nbsp;
                </a>
              </span>
            )
          })}
          {tail && (
            <span className="tail text" key={tail[0]}>
              <span>/</span>
              &nbsp;
              <span>{tail[0]}</span>
            </span>
          )}
        </nav>
        <div className="operation">
          <a
            href="https://github.com/tqma113"
            className="github"
            aria-label="Github"
            accessKey="g"
          >
            <Github width={25} height={25} className="icon" />
          </a>
          <a
            href="mailto:mtq1997@126.com"
            className="mail"
            aria-label="Github"
            accessKey="m"
          >
            <Mail width={25} height={25} className="icon" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
