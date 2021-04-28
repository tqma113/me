import { Http } from 'farrow-http'
import { useReactView } from 'farrow-react'
import { PreloadType } from 'react-torch'
import start from 'react-torch/dev'
import torchConfig from './torch.config'
import api from './api'
import { useWebpackCTX, webpackMiddleware } from './webpackDevHook'
import webpackHotMiddleware from './webpackHotMiddleware'
import { syncClient } from './syncClient'
import type { ScriptPreload, StylePreload } from 'react-torch'

const startServer = () => {
  return new Promise<number>(async (resolve, reject) => {
    const http = Http()

    http.route('/api').use(api)

    const torch = await start(torchConfig)

    http.use(webpackMiddleware(torch.config.dir, torch.compiler))
    http.use(webpackHotMiddleware(torch.compiler, { log: false }))

    http.serve('/', torch.public())
    http.serve('/', torch.static())

    http.use(async (req) => {
      const ReactView = useReactView({
        docType: '<!doctype html>',
        useStream: true,
      })
      const webpackCTX = useWebpackCTX()
      const url = req.pathname
      const html = await torch.render(
        url,
        webpackCTX.assets as any,
        scripts,
        styles,
        {}
      )

      return ReactView.render(html)
    })

    http.listen(torch.config.port, () => {
      resolve(torch.config.port)
    })
  })
}

const styles: StylePreload[] = [
  {
    type: PreloadType.Link,
    href: '/css/base.css',
    preload: true,
  },
]

const scripts: ScriptPreload[] = [
  // {
  //   type: PreloadType.Link,
  //   src: 'https://www.googletagmanager.com/gtag/js?id=UA-178762043-1',
  // },
  // {
  //   type: PreloadType.Inner,
  //   content: `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', 'UA-178762043-1');
  //   `,
  // },
]


startServer()
  .then(syncClient)
  .catch((err) => {
    console.log('error', err)
  })