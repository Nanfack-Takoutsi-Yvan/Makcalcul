import React, { useMemo, useRef } from "react"
import { StyleSheet } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { View } from "@components/Themed"
import { Text, useTheme } from "react-native-paper"
import { Image } from "expo-image"
import { appDispatch } from "@store/index"
import {
  closeNotification,
  useSelectBottomSheetState
} from "@store/slices/notification"
import { NOTIFICATION_STATUS } from "@utils/notification"

export const BottomSheetNotification: React.FC = () => {
  const { position, title, description, status } = useSelectBottomSheetState()
  const { colors, dark } = useTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ["40%"], [])
  const handleSheetChanges = React.useCallback((index: number) => {
    if (index === -1) appDispatch(closeNotification())
  }, [])
  const getStatusStyle = React.useCallback(
    (status: NOTIFICATION_STATUS) => {
      switch (status) {
        case NOTIFICATION_STATUS.ERROR:
          return {
            color: colors.error,
            icon: dark
              ? require("@assets/images/error-dark.gif")
              : require("@assets/images/error.gif")
          }
        default:
          return {
            color: colors.primary,
            icon: dark
              ? require("@assets/images/success-dark.gif")
              : require("@assets/images/success.gif")
          }
      }
    },
    [colors, dark]
  )
  const { icon, color } = getStatusStyle(status)
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={position}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      style={styles.container}
      handleStyle={{
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        backgroundColor: colors.background
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.inverseSurface
      }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            transition={1000}
            source={icon}
            contentFit="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="headlineLarge"
            style={[styles.title, styles.text, { color }]}
          >
            {title}
          </Text>
          {description && (
            <Text style={styles.text} variant="bodyLarge">
              {description}
            </Text>
          )}
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  imageContainer: {
    flex: 3,
    width: "100%"
  },
  textContainer: {
    flex: 4,
    alignItems: "center",
    rowGap: 12
  },
  title: {
    fontWeight: "bold"
  },
  text: {
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: "100%"
  }
})
