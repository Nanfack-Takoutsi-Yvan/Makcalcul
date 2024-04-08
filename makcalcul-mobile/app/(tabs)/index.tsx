import * as React from "react"
import { StyleSheet } from "react-native"

import EditScreenInfo from "@components/EditScreenInfo"
import { View } from "@components/Themed"
import { useSelectI18N } from "@store/slices/localization"
import { useTranslation } from "react-i18next"
import { Button, Text } from "react-native-paper"
import { logger } from "@utils/logger"
import { appDispatch } from "@store/index"
import { openNotification } from "@store/slices/notification"
import { NOTIFICATION_STATUS } from "@utils/notification"

export default function TabOneScreen() {
  const locale = useSelectI18N()
  const { t } = useTranslation()

  const openBottomNotification = React.useCallback(() => {
    appDispatch(
      openNotification({
        status: NOTIFICATION_STATUS.SUCCESS,
        title: "Communicaiton error occured",
        description:
          "lorem ipsum dolor sit amet dolor sit amet consectetur tempor incididunt ut labore et dolore"
      })
    )
  }, [])

  const sentryTest = () => {
    try {
      throw new Error("My second Sentry error!")
    } catch (err) {
      logger.warn(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{locale.locale}</Text>
      <Text style={styles.title}>{t("hello_world", { name: "Yvan" })}</Text>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={sentryTest}>Send Bug</Button>
      <Button onPress={openBottomNotification}>View Notification</Button>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
})
