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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function SearchBar({
  placeholder,
  type,
  onChangeText,
  value,
  handleClear,
}) {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      // justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: Colors.card,
    },
    search: {
      paddingVertical: 10,
      width: "80%",
      color: Colors.textPrimary,
      outlineStyle: "none",
      display: "flex",
      alignSelf: "flex-start",
      
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
        placeholderTextColor={Colors.textPrimary}
        keyboardType={type}
        onChangeText={onChangeText}
        value={value}
      />
      {value && (
        <MaterialCommunityIcons
          name="close-circle"
          size={24}
          color={Colors.textPrimary}
          onPress={handleClear}
        />
      )}
    </View>
  );
}
