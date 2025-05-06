import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function ButtonComponent({ onPress, text }) {
  return <Button title={text}  onPress={onPress} color={"purple"}  />;
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "purple",
    borderRadius: 10,
    color: "white",
    fontSize: 25,
  },
});
