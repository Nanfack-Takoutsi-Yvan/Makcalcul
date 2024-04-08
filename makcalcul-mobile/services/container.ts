import { AppDispatch } from "@store/store"
import { I18NService } from "./i18n"

export class Container {
  i18n?: I18NService
  init(dispatch: AppDispatch) {
    this.i18n = new I18NService(dispatch)
  }
}

export const container = new Container() as Required<Readonly<Container>>
