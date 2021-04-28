import React from 'react'
import { createPage as cp, createNoopStore } from 'react-torch/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SEO, Container } from '../component'
import type {
  StoreLike,
  PageView,
  CreaterProps,
  PageCreater,
} from 'react-torch/client'
import type { Store } from 'redux'
import type { Location } from 'torch-history'

export type LayoutProps = React.PropsWithChildren<{}>

export type BasePage = {
  store?: Store<any, any> & StoreLike<any>

  beforeCreate?: () => Promise<void> | void
  create: () => Promise<PageView> | PageView
  created?: () => Promise<void> | void
  beforeDestory?: (nextLocation: Location) => Promise<void> | void
  destroyed?: (nextLocation: Location) => Promise<void> | void
}

export type Page = PageView | BasePage

export type StandardPage = Required<BasePage>

export type Creater = (props: CreaterProps) => Page | Promise<Page>

const noopStore = Object.assign(
  createStore(() => {}),
  createNoopStore()
)

const noopPage = {
  store: noopStore,
  beforeCreate: () => {},
  created: () => {},
  beforeDestory: () => {},
  destroyed: () => {},
}

const standardizePage = (page: Page): StandardPage => {
  if (isFunction(page)) {
    return {
      ...noopPage,
      create: async () => page,
    }
  } else {
    return {
      ...noopPage,
      ...page,
    }
  }
}

export const createPage = (creater: Creater): PageCreater => {
  return cp(async (props) => {
    const {
      store,
      beforeCreate,
      create,
      beforeDestory,
      destroyed,
    } = standardizePage(await creater(props))

    const Layout = ({ children }: LayoutProps) => {
      return (
        <Provider store={store}>
          <SEO />
          <Container>{children}</Container>
        </Provider>
      )
    }

    return {
      store,
      beforeCreate: () => {
        if (!props.context.ssr) {
          // @ts-ignore
          store.dispatch({ type: 'SET_NOT_FOUND', payload: false })
        }

        return beforeCreate()
      },
      create: async () => {
        const PageView = await create()
        return () => (
          <Layout>
            <PageView />
          </Layout>
        )
      },
      beforeDestory,
      destroyed,
    }
  })
}

function isFunction<Args, R, S>(
  input: ((args: Args) => R) | S
): input is (args: Args) => R {
  return input && typeof input === 'function'
}
