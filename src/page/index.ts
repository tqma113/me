import type { ScriptPreload, StylePreload } from 'react-torch'
import type { Route, ResourcesTransform } from 'react-torch/client'

export enum PreloadType {
  Link = 'link',
  Inner = 'inner',
}

function getKeys<T extends {}>(o: T): Array<keyof T> {
  return Object.keys(o) as Array<keyof T>
}

const transformResources = (names: string[]): ResourcesTransform => {
  const exist = (key: string) => names.some(name => (new RegExp(`${name}.css$`)).test(key))
  return ({ styles, scripts }, assets) => {
    const pageStyles: StylePreload[] = []
    const pageScriptes: ScriptPreload[] = []

    getKeys(assets).forEach((key) => {
      if (exist(key)) {
        pageStyles.push({
          type: PreloadType.Link,
          href: assets[key],
          preload: true,
        })
      }
      if (names.includes(key)) {
        pageScriptes.push({
          type: PreloadType.Link,
          src: assets[key],
        })
      }
    })

    return {
      styles: [...styles, ...pageStyles],
      scripts: [...scripts, ...pageScriptes],
    }
  }
}

const routes: Route[] = [
  {
    path: '/photography/months',
    module: {
      pageCreater: () => import(/* webpackChunkName: "months" */ './Months'),
      transform: transformResources(['months']),
    },
  },
  {
    path: [
      '/photography/:year/:month',
      '/photography/:onlyYear',
      '/photography',
    ],
    module: {
      pageCreater: () =>
        import(/* webpackChunkName: "photography" */ './Photography'),
      transform: transformResources(['photography']),
    },
  },
  {
    path: ['/notes', '/notes/tags/:tagName'],
    module: {
      pageCreater: () => import(/* webpackChunkName: "notes" */ './Notes'),
      transform: transformResources(['notes']),
    },
  },
  {
    path: '/notes/tags',
    module: {
      pageCreater: () => import(/* webpackChunkName: "tags" */ './Tags'),
      transform: transformResources(['tags']),
    },
  },
  {
    path: '/notes/:noteName',
    module: {
      pageCreater: () => import(/* webpackChunkName: "note" */ './Note'),
      transform: transformResources(['note', 'highlight']),
    },
  },
  {
    path: '/',
    module: {
      pageCreater: () => import(/* webpackChunkName: "home" */ './Home'),
      transform: transformResources(['home']),
    },
  },
  {
    path: '/:path*',
    module: {
      pageCreater: () =>
        import(/* webpackChunkName: "notfound" */ './NotFound'),
      transform: transformResources(['notfound']),
    },
  },
]

export default routes
