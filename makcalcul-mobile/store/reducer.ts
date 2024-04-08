import { combineReducers, AnyAction } from "@reduxjs/toolkit"
import { persistedReducer as i18n } from "./slices/localization/i18n"
import { reducer as bottomNotification } from "./slices/notification"
// import { reducer as booking } from "./slices/booking";
// import { reducer as merchant } from "./slices/merchant";
// import { reducer as user } from "./slices/user";

const reduce = combineReducers({ i18n, bottomNotification })

type State = Parameters<typeof reduce>[0]

export function reducer(state: State, action: AnyAction) {
  return reduce(state, action)
}
