import { PreloadType } from 'react-torch'
import type { Middleware, StylePreload, ScriptPreload } from 'react-torch'

const styles: StylePreload[] = [
  {
    type: PreloadType.Link,
    href: '/css/base.css',
    preload: true,
  },
]

const scripts: ScriptPreload[] = [
  {
    type: PreloadType.Link,
    src: 'https://www.googletagmanager.com/gtag/js?id=UA-178762043-1',
  },
  {
    type: PreloadType.Inner,
    content: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-178762043-1');
    `,
  },
]

export const attachStatic: Middleware = (app, server) => {
  app.use((req, res, next) => {
    console.log(req.path)
    res.locals = {
      styles,
      scripts,
    }
    next()
  })
}
