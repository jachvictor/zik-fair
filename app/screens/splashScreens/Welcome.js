import { StyleSheet, Text, View, Image, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo2.png";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AdEventType,
  AppOpenAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { useAppContext } from "../../context/AppContext";

export default function Welcome() {
  const { navigate } = useNavigation();
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [navigated, setNavigated] = useState(false);

  const appOpenId = __DEV__
    ? TestIds.APP_OPEN
    : "ca-app-pub-7487058490506362/5296702866"; // Replace with real ad unit

  const handleNavigate = async () => {
    if (navigated) return;
    setNavigated(true);

    try {
      const count = 1;
      await AsyncStorage.setItem("adCount", count.toString());
      await AsyncStorage.setItem("adCountC", count.toString());
      const storedData = await AsyncStorage.getItem("user");

      let user = {};
      if (storedData && storedData !== "undefined") {
        user = JSON.parse(storedData);
      }

      if (user && user.login) {
        navigate("tabs");
      } else {
        navigate("OnBoarding");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      navigate("OnBoarding");
    }
  };

  useEffect(() => {
    // Start splash logo fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Load and show App Open Ad
    const appOpenAd = AppOpenAd.createForAdRequest(appOpenId, {
      requestNonPersonalizedAdsOnly: isNonPersonalized,
    });

    const onAdLoaded = () => {
      appOpenAd.show();
    };

    const onAdClosed = () => {
      handleNavigate();
    };

    const onAdFailedToLoad = () => {
      console.log("Ad failed to load, proceeding...");
      handleNavigate();
    };

    const unsubscribeLoaded = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      onAdLoaded
    );
    const unsubscribeClosed = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      onAdClosed
    );
    const unsubscribeFailed = appOpenAd.addAdEventListener(
      AdEventType.ERROR,
      onAdFailedToLoad
    );

    appOpenAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeFailed();
    };
  }, [adReady, isNonPersonalized]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ alignItems: "center", opacity: fadeAnim }}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.text}>Let Your Hustle Be Seen.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 80,
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
    fontStyle: "italic",
  },
});
