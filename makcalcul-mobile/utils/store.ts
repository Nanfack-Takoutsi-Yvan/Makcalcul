import { AppDispatch, RootState } from "@store/index"
import { Container } from "@services/container"
import { AsyncThunkConfig as _AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk"
import {
  createAsyncThunk as _createAsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  SerializedError,
  Dispatch
} from "@reduxjs/toolkit"

type AsyncThunkConfig = {
  state?: _AsyncThunkConfig["state"]
  dispatch?: Dispatch
  extra?: _AsyncThunkConfig["extra"]
  rejectValue?: _AsyncThunkConfig["rejectValue"]
  serializedErrorType?: _AsyncThunkConfig["serializedErrorType"]
}

export function createAsyncThunk<
  R,
  A,
  C extends AsyncThunkConfig = {
    state: RootState
    dispatch: AppDispatch
    extra: Required<Readonly<Container>>
    rejectValue: unknown
    serializedErrorType: SerializedError
  }
>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<R, A, C>,
  options?: AsyncThunkOptions<A, C>
) {
  return _createAsyncThunk(typePrefix, payloadCreator, options)
}
