import * as React from "react"
import { StyleSheet } from "react-native"
import { Toast } from "toastify-react-native"

import EditScreenInfo from "../../components/EditScreenInfo"
import { View } from "@components/Themed"
import { Button, Text } from "react-native-paper"

export default function TabTwoScreen() {
  const opentToast = () => {
    Toast.success("Promised is resolved")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <Button onPress={opentToast}>Open toast alert</Button>
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
