/* eslint-disable @typescript-eslint/no-misused-promises */
import * as React from "react"
import { ErrorBoundaryProps } from "expo-router"
import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import { useTranslation } from "react-i18next"

export function ErrorBoundary({ retry }: ErrorBoundaryProps) {
  const { t } = useTranslation()
  const reloadApp = async () => {
    await retry()
  }

  return (
    <View style={styles.screen}>
      <View>
        <Image source={require("@assets/images/error_boundary.png")} />
        <View>
          <Text>{t("boundary_error")}</Text>
          <Text onPress={reloadApp}>{t("cta_try_again")}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
