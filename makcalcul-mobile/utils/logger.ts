import * as Sentry from "@sentry/react-native"

export const logger = {
  warn: Sentry.captureException,
  info: Sentry.captureMessage
}
