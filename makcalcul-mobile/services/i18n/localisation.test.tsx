// import { renderWithProviders } from "@components/__tests__/renderWithProviders"
import { DEFAULT_FALLBACK_LANGUAGE_CODE } from "@constants/i18n"
import { container } from "@services/container"

beforeEach(async () => {
  await container.i18n.start({ lang: DEFAULT_FALLBACK_LANGUAGE_CODE })
})
