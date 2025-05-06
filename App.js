import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import Navigation from "./app/navigation/Navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Typography } from "./app/styles";
import { ThemeProvider } from "./app/context/ThemeContext";
import { AppProvider } from "./app/context/AppContext";
// import { useTheme } from "./app/context/ThemeContext";
// import { useAppContext } from "./app/context/AppContext";
import Loading from "./app/screens/splashScreens/Loading";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // const { Colors, Typography } = useTheme();
  // const { loading } = useAppContext;
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <AppProvider>
        <ThemeProvider>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <Navigation />
            {/* <View>
          {loading && <Loading />}</View> */}
          </View>
        </ThemeProvider>
      </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    fontFamily: Typography.fontFamily.regular,
    // color:Colors.textPrimary,
    // backgroundColor:Colors.background
  },
});
