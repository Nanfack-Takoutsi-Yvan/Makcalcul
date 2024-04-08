import { configureStore } from "@reduxjs/toolkit"
import { enableBatching } from "redux-batched-actions"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { reducer } from "./reducer"
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"

import { container } from "@services/container"

export const store = configureStore({
  reducer: enableBatching(reducer) as typeof reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: container
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const appDispatch: AppDispatch = store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
