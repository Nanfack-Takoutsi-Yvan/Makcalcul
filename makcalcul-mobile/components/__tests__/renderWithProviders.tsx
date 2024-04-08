/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { PropsWithChildren } from "react"
import { RenderOptions, render } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { reducer as i18n } from "@store/slices/localization/i18n"
import { container } from "@services/container"
import { RootState } from "@store/index"
import { AppStore } from "@store/store"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  state?: RootState
  store?: AppStore
}

const defaultStore = configureStore({
  reducer: { i18n },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: container,
        serializableCheck: true
      }
    })
})

export function renderWithProviders(
  ui: React.ReactElement,
  { store = defaultStore, ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
