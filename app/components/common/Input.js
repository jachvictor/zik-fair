import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({ onChange, placeholder, Icon }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChange={onchange}
      />
      <Icon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  input: {
    borderStyle: "none",
    width: "100%",
    padding: 10,
  },
});
