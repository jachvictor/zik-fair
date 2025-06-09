import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ErrorScreen({ header, message, handleFetch }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: 10,
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      color: Colors.textPrimary,
      display: "flex",
      textAlign: "center",
    },
    message: {
      color: Colors.textSecondary,
      display: "flex",
      textAlign: "center",
    },
  });
  return (
    <View style={styles.constainer}>
      <MaterialIcons
        size={200}
        style={{ color: Colors.textSecondary }}
        name="error"
      />
      <Text style={styles.header}>Oops! An error occurred</Text>
      <Text style={styles.message}>
        Something went wrong.This could be due to a network issue or a server
        problem.
      </Text>
      <Ionicons
        name="reload"
        size={30}
        color={Colors.primary}
        onPress={handleFetch}
        style={{
          position: "absolute",
          bottom: 0,
          // width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          alignSelf: "flex-end",
          backgroundColor: "transparent",
          // backgroundColor: Colors.background,
          margin: 10,
          // marginVertical: 10,
        }}
      />
    </View>
  );
}
