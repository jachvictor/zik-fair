import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors, Typography } from "../styles";
import { useTheme } from "../context/ThemeContext";
export default function SearchCard({ source, name, address, onPress }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 10,
      padding: 10,
      backgroundColor: Colors.card,
      borderRadius: 10,
    },
    image: {
      width: "100%",
      height: 150,
      borderRadius: 10,
    },
    name: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
    address: {
      fontSize: Typography.fontSize.md,
      color: Colors.textSecondary,
    },
  });

  return (
    <View >
      <Pressable style={styles.container} onPress={onPress}>
        <Image style={styles.image} source={source} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Ionicons size={24} color={Colors.secondary} name="heart" />
      </Pressable>
    </View>
  );
}
