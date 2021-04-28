import React from 'react'
import { useStore } from 'react-redux'
import { Header, Footer, NotFound } from './index'
import type { State, Action } from 'client'

export type ContainerProps = React.PropsWithChildren<{}>

export const Container = ({ children }: ContainerProps) => {
  const state = useStore<State, Action>().getState()

  if (state.errors.length > 0) children = <>{state.errors}</>
  if (state.notfound) children = <NotFound />

  return (
    <div className="container">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
