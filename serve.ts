import fs from 'fs'
import path from 'path'
import {
  TORCH_DIR,
  TORCH_CLIENT_DIR,
  TORCH_PUBLIC_PATH,
  TORCH_ASSETS_FILE_NAME,
} from 'react-torch'
import { Http } from 'farrow-http'
import { useReactView } from 'farrow-react'
import { PreloadType } from 'react-torch'
import fetch from 'node-fetch'
import start from 'react-torch/start'
import api from './api'
import type { ScriptPreload, StylePreload, TorchConfig, IntegralTorchConfig } from 'react-torch'

process.env.NODE_ENV = 'production'

const polyfillNodeFetch = (config: IntegralTorchConfig) => {
  global.fetch = ((input: string, init?: RequestInit | undefined) => {
    if (input.startsWith('//')) {
      input = 'http:' + input
    }
    if (input.startsWith('/')) {
      input = `http://localhost:${config.port}${input}`
    }
    return fetch(input, init as any) as any
  }) as any
}

const torchCofnig : TorchConfig = {
  title: 'Ma Tianqi',
  src: './src/page',
  middleware: './src/middleware',
  document: './src/document',
  port: 8080,
  installPolyfill: (config) => {
    polyfillNodeFetch(config)
  },
}

export type Assets = { index: string; vendor: string } & Record<string, string>

const getAssets = (stats: Record<string, string | string[]>) => {
  return Object.keys(stats).reduce(
    (result: Record<string, string>, assetName) => {
      const value = stats[assetName]
      result[assetName] = Array.isArray(value) ? value[0] : value
      return result
    },
    {}
  )
}

export const startServer = () => {
  return new Promise<number>(async (resolve, reject) => {
    const http = Http()

    http.route('/api').use(api)

    const torch = await start(torchCofnig)

    http.serve('/', torch.static())

    http.use(async (req) => {
      const ReactView = useReactView({
        docType: '<!doctype html>',
        useStream: true,
      })
      const url = req.pathname
      const codeStr = fs.readFileSync(
        path.resolve(
          torch.config.dir,
          TORCH_DIR,
          TORCH_CLIENT_DIR,
          TORCH_PUBLIC_PATH,
          TORCH_ASSETS_FILE_NAME
        ),
        'utf-8'
      )
      const assets = getAssets(JSON.parse(codeStr)) as Assets
      const html = await torch.render(
        url,
        assets,
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
  .then((port) => {
    console.log(`server started at ${port}`)
  })
  .catch((err) => {
    console.log('error', err)
  })
