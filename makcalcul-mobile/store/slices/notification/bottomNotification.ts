import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NOTIFICATION_STATUS } from "@utils/notification"

interface Bottom_Notification_State {
  status: NOTIFICATION_STATUS
  title: string
  description?: string
  position: -1 | 0
}

const initialState: Bottom_Notification_State = {
  position: -1,
  status: NOTIFICATION_STATUS.SUCCESS,
  title: ""
}

export const slice = createSlice({
  name: "bottom_notification",
  initialState,
  reducers: {
    closeNotification(state) {
      state.position = -1
      state.title = ""
      state.description = ""
      state.status = NOTIFICATION_STATUS.SUCCESS
    },
    openNotification(
      state,
      action: PayloadAction<Omit<Bottom_Notification_State, "position">>
    ) {
      state.position = 0
      Object.assign(state, action.payload)
    }
  }
})

export const { reducer } = slice
export const { closeNotification, openNotification } = slice.actions
