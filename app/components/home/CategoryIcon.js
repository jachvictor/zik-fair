import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import { Colors, Typography } from "../../styles";s
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native";

export default function CategoryIcon({ icon, name, onPress }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // backgroundColor: "silver",
      borderRadius: 20,
      gap: 5,
      padding: 16,
      // margin: 5,
    },
    text: {
      display: "flex",
      textAlign: "center",
      flexWrap: "wrap",
      width: "auto",
      overflow: "scroll",
      fontSize: Typography.fontSize.md,
      color: Colors.textPrimary,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesome6 name={icon} size={35} color={Colors.primary} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}
