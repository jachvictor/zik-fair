import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import background from "../../../assets/onboard2.png";
import logo from "../../../assets/logo2.png";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";

// if (consentStatus === AdsConsent.Status.REQUIRED) {
//   return <Text>Please accept ads personalization to see ads.</Text>;
// }

export default function OnBoarding() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.55)",
    },
    content: {
      flex: 1,
      width: "100%",
      padding: 30,
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      width: 120,
      height: 40,
      marginTop: 30,
      alignSelf: "flex-start",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 15,
    },
    accent: {
      color: Colors.accent, // Orange or your secondary color
    },
    subtitle: {
      fontSize: 16,
      color: "#e0e0e0",
      textAlign: "center",
      lineHeight: 22,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: "#FFA500",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignSelf: "center",
      marginBottom: 40,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true; // block back button
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.overlay} />

        <Animated.View style={[styles.content, { opacity: fadeIn }]}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Discover, Connect, <Text style={styles.accent}>Grow</Text>.
            </Text>
            <Text style={styles.subtitle}>
              Your ultimate directory to explore businesses and showcase your
              hustle within UNIZIK.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Signup")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}
