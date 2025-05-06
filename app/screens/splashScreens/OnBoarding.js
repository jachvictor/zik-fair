import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import back from "../../../assets/onboard2.png";
import logo from "../../../assets/logo2.png";

export default function OnBoarding() {
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      width: "100%",
      height: "auto",
      padding: 10,
      paddingVertical: 26,
      backgroundColor: Colors.white,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // padding: 20,
    },
    content: {
      // flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      height: "auto",
      // padding: 10,
    },
    logo: {
      display: "flex",
      height: 30,
      width: 100,
      alignSelf: "flex-start",
    },
    holdInfo: {
      width: "100%",
      gap: 10,
      alignItems: "center",
    },
    header: {
      fontSize: Typography.fontSize.xl,
      fontFamily: Typography.fontFamily.bold,
      textAlign: "center",
      color: Colors.black,
      width: "100%",
    },
    highlight: {
      color: Colors.primary,
    },
    message: {
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.regular,
      color: Colors.textSecondary,
      textAlign: "center",
    },
    button: {
      backgroundColor: Colors.secondary,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      width: "100%",
      alignItems: "center",
      marginTop: 15,
    },
    buttonText: {
      color: Colors.white,
      fontSize: Typography.fontSize.md,
      fontFamily: Typography.fontFamily.bold,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Logo */}

          {/* Info Section */}
          <View style={styles.holdInfo}>
            <Image style={{ width: "100%" }} source={back} />
            <Text style={styles.header}>
              Your <Text style={styles.highlight}>Everyday</Text> Companion To
              Explore And Grow Your{" "}
              <Text style={styles.highlight}>Hustle.</Text>
            </Text>
            <Text style={styles.message}>
              ZikFair is a smart business directory app designed to help people
              discover, connect, and support local businesses around them.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("Signup")}
            >
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
