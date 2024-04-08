import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  DEFAULT_FALLBACK_LANGUAGE_CODE,
  REDUX_I18N_PERSISTOR_KEY
} from "../../../constants/i18n"
import { createAsyncThunk } from "@utils/store"

interface State {
  locale: string
  currency?: string | null
}

const initialState: State = {
  locale: DEFAULT_FALLBACK_LANGUAGE_CODE,
  currency: null
}

export const changeLanguage = createAsyncThunk(
  "i18n/changeLanguage",
  async (config: { lang: string; currency?: string | null }, api) => {
    const currentState = api.getState().i18n
    await api.extra.i18n.handleLanguageChange(
      config.lang,
      config.currency ?? currentState.currency
    )
  }
)

const persistConfig = {
  key: REDUX_I18N_PERSISTOR_KEY,
  storage: AsyncStorage
}

export const slice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setI18N(state, action: PayloadAction<State>) {
      Object.assign(state, action.payload)
    },
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload
    },
    setCurrency(state, action: PayloadAction<string | null>) {
      state.currency = action.payload
    }
  }
})

export const { reducer } = slice
export const persistedReducer = persistReducer(persistConfig, reducer)
export const { setI18N, setCurrency, setLocale } = slice.actions
