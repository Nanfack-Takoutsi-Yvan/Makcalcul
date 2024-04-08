// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "react-native-paper/babel",
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".ios.tsx",
            ".android.tsx",
            ".js",
            ".ts",
            ".tsx",
            ".json"
          ],
          alias: {
            "@app": "./app",
            "@store": "./store",
            "@utils": "./utils",
            "@hooks": "./hooks",
            "@assets": "./assets",
            "@services": "./services",
            "@constants": "./constants",
            "@components": "./components"
          }
        }
      ]
    ]
  }
}
