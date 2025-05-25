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
      // borderColor: Colors.border,
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
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
      <TouchableOpacity
        style={styles.holdHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={{ color: textColor }}>{selected ? selected : header}</Text>

        <FontAwesome
          name={isOpen ? "sort-up" : "sort-down"}
          size={20}
          color={textColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View>
          {array.map((value, index) => (
            <Pressable
              key={index}
              onPress={() => handleSelect(value.name)}
              style={styles.item}
            >
              <Text style={{ color: textColor }}>{value.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
