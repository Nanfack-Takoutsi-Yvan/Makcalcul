import { useAppSelector } from "@store/index"

export {
  reducer,
  closeNotification,
  openNotification
} from "./bottomNotification"
export const useSelectBottomSheetState = () =>
  useAppSelector((state) => state.bottomNotification)
