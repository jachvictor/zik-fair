import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../../context/ThemeContext";
import { Input } from "../../styles";
export default function Password({ password, setPassword, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      //   padding: 10,
      backgroundColor: Colors.white,
      borderRadius: 5,

      gap: 10,
    },
    holdHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: Colors.border,
      borderWidth: 2,
      padding: 5,
      gap: 5,
    },
    item: {
      width: "100%",
      padding: 5,
    },
    input: {
      padding: 10,
      //   borderColor: LightColors.border,
      // width: "100%",

      borderWidth: 0, // Removes the outline

      backgroundColor: Colors.white,
        outline:"one"
      //   borderRadius: 10,
      //   borderWidth: 1,
    },
  });
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.holdHeader}>
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={isOpen}
          keyboardType="name-phone-pad"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesome name="eye-slash" size={20} color={"black"} />
          ) : (
            <FontAwesome name="eye" size={20} color={"black"} />
          )}
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}
