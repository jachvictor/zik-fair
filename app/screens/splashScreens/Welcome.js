import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import logo from "../../../assets/logo2.png";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const { navigate } = useNavigation();
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      gap: 20,
      flex: 1,
      backgroundColor: "white",
    },
    image: {
      // flex: 1,
      width: "80%",
      height: 100,
    },
    text: {
      fontSize: Typography.fontSize.xl,
      // fontWeight: "bold",
      fontFamily: Typography.fontFamily.regular,
      textAlign: "center",
      color: Colors.textSecondary,
      // fontStyle: "italic",
    },
  });

  const handleNavigate = async () => {
    try {
      const storedData = await AsyncStorage.getItem("user");
      const user = storedData !== undefined ? JSON.parse(storedData) : {};
      // await AsyncStorage.removeItem("user");
      // const user = JSON.parse(await AsyncStorage.getItem("user"));
      // const user = {};
      console.log("user", user);
      setTimeout(() => {
        if (user && user.login) {
          navigate("tabs");
        } else {
          navigate("OnBoarding");
        }
      }, 2000);
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  useEffect(() => {
    handleNavigate();
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.text}>Let Your Hustle Be Seen.</Text>
    </View>
  );
}
