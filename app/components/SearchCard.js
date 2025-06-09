import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors, Typography } from "../styles";
import { useTheme } from "../context/ThemeContext";
export default function SearchCard({
  source,
  name,
  address,
  onPress,
  onAddFav,
}) {
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
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image style={styles.image} source={source} />
      </TouchableOpacity>
      <ScrollView horizontal>
        <Text style={styles.name}>{name}</Text>
      </ScrollView>
      <ScrollView horizontal>
        <Text style={styles.address}>{address}</Text>
      </ScrollView>
      <Ionicons
        size={24}
        color={Colors.secondary}
        onPress={onAddFav}
        name="heart"
      />
    </View>
  );
}
