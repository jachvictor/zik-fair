import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
export default function FavoriteCard({ source, name, address, onPress }) {
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
      borderRadius: 10,
      height: 150,
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
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={source} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <AntDesign size={24} color={Colors.danger} name="delete" />
    </View>
  );
}
