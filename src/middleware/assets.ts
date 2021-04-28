import { createRouter } from 'torch-router'
import { PreloadType } from 'react-torch'
import type { Middleware, ScriptPreload, StylePreload } from 'react-torch'
import type { DraftRoute } from 'torch-router'

const transformResources = (name: string): ResourcesTransform => {
  const regexp = new RegExp(`${name}.css`)
  return ({ styles, scripts }, manifest) => {
    Object.keys(manifest).forEach((key) => {
      if (regexp.test(key)) {
        styles = [
          ...styles,
          {
            type: PreloadType.Link,
            href: manifest[key],
            preload: true,
          },
        ]
      }
    })

    return {
      styles,
      scripts,
    }
  }
}

type Resources = {
  styles: StylePreload[]
  scripts: ScriptPreload[]
}

type ResourcesTransform = (
  resources: Resources,
  assets: Record<string, string>
) => Resources

const routes: DraftRoute<ResourcesTransform>[] = [
  {
    path: '/',
    module: transformResources('home'),
  },
  {
    path: '/photography',
    module: transformResources('photography'),
  },
  {
    path: ['/notes', '/notes/tags/:tagName'],
    module: transformResources('notes'),
  },
  {
    path: '/notes/tags',
    module: transformResources('tags'),
  },
  {
    path: '/notes/:noteName',
    module: transformResources('note'),
  },
  {
    path: '/games',
    module: transformResources('games'),
  },
  {
    path: '/:path*',
    module: transformResources('notfound'),
  },
]

export const assets: Middleware = (app, server) => {
  const router = createRouter(routes)

  app.use((req, res, next) => {
    console.log(req.path)
    const matches = router(req.path)

    if (matches) {
      const { scripts, styles } = matches.module(
        {
          styles: res.locals.styles,
          scripts: res.locals.scripts,
        },
        res.locals.assets
      )
      res.locals.styles = styles
      res.locals.scripts = scripts
    }

    next()
  })
}
