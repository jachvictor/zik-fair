import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function EmptyScreen({ header, message }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
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
      <AntDesign
        size={200}
        style={{ color: Colors.textSecondary }}
        name="inbox"
      />
      <Text style={styles.header}>Nothing here yet</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
