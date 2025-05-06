import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors, Spacing, Typography } from "../../styles";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
export default function SearchBar({ placeholder, type, onPress }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignContent: "center",
      justifyContent: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
    },
    search: {
      // padding: 15,
      paddingVertical: 10,
      width: "90%",
      color: Colors.textPrimary,
      outlineStyle: "none",
    },
    icon: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      color: Colors.textPrimary,
      width: "10%",
    },
  });

  return (
    <View style={styles.container}>
      <Ionicons size={20} style={styles.icon} name="search" />
      <TextInput
        style={styles.search}
        placeholder={placeholder}
        keyboardType={type}
        onPress={onPress}
      />
    </View>
  );
}
