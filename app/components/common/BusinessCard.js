import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
export default function BusinessCard({ image, category, address, onPress }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      // width: "100vw",
      backgroundColor: Colors.card,
      flexDirection: "column",
      padding: 10,
      marginHorizontal: 8,
      // alignItems: "center",
      gap: 10,
      borderRadius: 16,
    },
    image: {
      width: 200,
      height: 130,
      borderRadius: 16,
      borderWidth:1,
      borderColor:Colors.border
    },
    bottom: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rating: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    businessName: {
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
      <Pressable onPress={onPress}>
        <Image style={styles.image} source={image} />
      </Pressable>
      <View style={{ paddingVertical: 10, width: "100%" }}>
        <Text style={styles.businessName}>Business name</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.rating}>
          <AntDesign name="star" size={24} color="gold" />
          <Text style={{ color: Colors.textPrimary }}>4.5</Text>
        </View>

        <AntDesign s size={30} color={Colors.secondary} name="heart" />
      </View>
    </View>
  );
}
