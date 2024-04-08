import { useMemo } from "react"
import { useColorScheme } from "react-native"
import {
  // configureFonts,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme
} from "react-native-paper"
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from "@react-navigation/native"

import theme from "@assets/theme"

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
})

const lightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  ...theme.colors.lightColors
}

const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  ...theme.colors.darkColors
}

const lightNavTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: lightTheme.colors.primary,
    background: lightTheme.colors.background,
    card: lightTheme.colors.surface,
    text: lightTheme.colors.inverseSurface
  }
}

const darkNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkTheme.colors.primary,
    background: darkTheme.colors.background,
    card: darkTheme.colors.surface,
    text: darkTheme.colors.inverseSurface
  }
}

export const useThemeConfigs = () => {
  const colorScheme = useColorScheme()
  const theme = useMemo(() => {
    const md3Theme = colorScheme === "dark" ? darkTheme : lightTheme
    return {
      ...md3Theme,
      dark: colorScheme === "dark"
    }
  }, [colorScheme])

  return theme
}

export const useNavThemeConfigs = () => {
  const colorScheme = useColorScheme()
  const navTheme = useMemo(() => {
    return colorScheme === "dark" ? darkNavTheme : lightNavTheme
  }, [colorScheme])
  return navTheme
}
