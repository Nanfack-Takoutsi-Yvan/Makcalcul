/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react"
import { View as DefaultView } from "react-native"

import { useTheme } from "react-native-paper"

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type ViewProps = ThemeProps & DefaultView["props"]

export function View(props: ViewProps) {
  const { style, ...otherProps } = props
  const { colors } = useTheme()

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  )
}
