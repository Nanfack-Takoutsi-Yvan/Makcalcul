import "intl-pluralrules"
import "@formatjs/intl-locale/polyfill"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import { ThemeProvider } from "@react-navigation/native"
import * as React from "react"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { PaperProvider } from "react-native-paper"
import * as Sentry from "@sentry/react-native"

import { store, persistor } from "@store/index"
import { container } from "@services/container"
import { useLanguageDetector } from "@hooks/i18n"
import { ToastNotification } from "@components/ToastNotification"
import { BottomSheetNotification } from "@components/BottomSheetNotification"
import { useNavThemeConfigs, useThemeConfigs } from "@hooks/theme"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)"
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  environment: "development"
})

export function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  Sentry.nativeCrash()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  )
}

function RootLayoutNav() {
  const lang = useLanguageDetector()
  const theme = useThemeConfigs()
  const navTheme = useNavThemeConfigs()

  async function initialize() {
    container.init(store.dispatch)
    await container.i18n.start({ lang })
  }

  void (async () => {
    await initialize()
  })()

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={navTheme}>
        <ToastNotification />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <BottomSheetNotification />
      </ThemeProvider>
    </PaperProvider>
  )
}

export default Sentry.wrap(RootLayout)
