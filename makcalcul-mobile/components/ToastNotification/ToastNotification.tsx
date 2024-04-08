// import useThemeConfigs from "@hooks/theme"
import { DEFAULT_TOAST_DURATION } from "@constants/common"
import * as React from "react"
import { StyleSheet } from "react-native"
import ToastManager from "toastify-react-native"

export const ToastNotification: React.FC = () => {
  return (
    <ToastManager
      style={[styles.box]}
      textStyle={styles.text}
      position="bottom"
      duration={DEFAULT_TOAST_DURATION}
      animationStyle="rightInOut"
    />
  )
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    backgroundColor: "rgb(0, 255, 255)"
  },
  text: {
    fontFamily: "SpaceMono",
    fontSize: 15
  }
})
