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
      backgroundColor: Colors.card,
      borderRadius: 5,

      gap: 5,
    },
    holdHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: Colors.border,
      borderWidth: 2,
      borderRadius: 5,

      padding: 3,
      gap: 5,
    },
    item: {
      width: "100%",
      padding: 5,
    },
    input: {
      padding: 8,
      //   borderColor: LightColors.border,
      width: "60%",

      borderWidth: 0, // Removes the outline
      color: Colors.textPrimary,
      backgroundColor: Colors.card,
      outline: "one",
      //   borderRadius: 10,
      //   borderWidth: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.holdHeader}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={isOpen}
          keyboardType="name-phone-pad"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesome
              name="eye-slash"
              size={20}
              color={Colors.textPrimary}
            />
          ) : (
            <FontAwesome name="eye" size={20} color={Colors.textPrimary} />
          )}
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}
