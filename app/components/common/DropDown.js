import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "../../context/ThemeContext";
export default function DropDown({
  array = [],
  selected,
  setSelected,
  header,
  background,
  textColor,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      //   padding: 10,
      backgroundColor: background,
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
      padding: 10,
    },
    item: {
      width: "100%",
      padding: 10,
      color: textColor,
    },
  });
  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.holdHeader} onPress={() => setIsOpen(!isOpen)}>
        <Text style={{ color: textColor }}>{selected ? selected : header}</Text>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FontAwesome name="sort-up" size={20} color={textColor} />
          ) : (
            <FontAwesome name="sort-down" size={20} color={textColor} />
          )}
        </TouchableOpacity>
      </Pressable>
      {isOpen && (
        <View>
          {array.map((value, index) => (
            <Text onPress={() => handleSelect(value.name)} style={styles.item}>
              {value.name}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
