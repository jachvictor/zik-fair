import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ErrorScreen({ header, message }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      color: Colors.textPrimary,
    },
    message: {
      color: Colors.textSecondary,
    },
  });
  return (
    <View style={styles.constainer}>
      <AntDesign size={200} style={{color:Colors.textSecondary}} name="delete" />
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
