import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors, Spacing, Typography } from "../../styles";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
export default function SearchBar({ placeholder, type, onChangeText, value }) {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: Colors.card,
    },
    search: {
      paddingVertical: 10,
      width: "90%",
      color: Colors.textPrimary,
      outlineStyle: "none",
    },
    icon: {
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
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
