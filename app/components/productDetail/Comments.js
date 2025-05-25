import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign"; //twitter

export default function Comments({ comments, name, rating, id, user }) {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      gap: 5,
    },
    icon: {
      //   paddingVertical: 5,
      //   paddingHorizontal: 10,
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: Colors.accent,
      borderWidth: 2,
      borderColor: Colors.white,
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: Colors.white,
    },
    details: {
      //   width: "100%",
      display: "flex",
      gap: 5,
    },
    name: {
      fontSize: Typography.fontSize.lg,
      color: Colors.textPrimary,
    },
    comment: {
      fontSize: Typography.fontSize.md,
      color: Colors.textSecondary,
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    rating: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
      fontSize: Typography.fontSize.lg,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{comments.sender[0]}</Text>

      <View style={styles.details}>
        <Text style={styles.name}>{user ? "you" : comments.sender}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={24} color="gold" />
          <Text style={{ color: Colors.textPrimary }}>{comments.rating}</Text>
        </View>
        <Text style={styles.comment}>{comments.text}</Text>
      </View>
      {/* <Text>Comments</Text> */}
    </View>
  );
}
