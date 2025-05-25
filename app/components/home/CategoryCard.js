import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Touchable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Colors, Typography, Spacing } from "../../styles";
import { useTheme } from "../../context/ThemeContext";

export default function CategoryCard({
  name,
  address,
  image,
  onPress,
  rating,
}) {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 10,
      backgroundColor: Colors.card,
      borderRadius: 10,
    },
    image: {
      width: "45%",
      height: 120,
      borderRadius: 10,
    },
    details: {
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      height: "auto",
      gap: 5,
    },
    wrapDetails: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "55%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    detailsHeader: {
      fontSize: 15,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
    detailsText: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      // backgroundColor: "blue",
      overflow: "scroll",
      color: Colors.textSecondary,
    },
    bottom: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    wrapRating: {
      flexDirection: "row",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image} onPress={onPress}>
        <Image
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          source={image}
        />
      </TouchableOpacity>
      <View style={styles.wrapDetails}>
        <View style={styles.details}>
          <ScrollView horizontal>
            <Text
              // numberOfLines={1}
              // ellipsizeMode="clip"
              style={styles.detailsHeader}
            >
              {name}
            </Text>
          </ScrollView>
          <ScrollView horizontal>
            <Text style={styles.detailsText}>{address}</Text>
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <View style={styles.wrapRating}>
            <AntDesign size={25} name="star" color={"gold"} />
            <Text style={{ color: Colors.textPrimary }}>{rating}</Text>
          </View>
          <Ionicons size={25} name="heart" color={Colors.secondary} />
        </View>
      </View>
    </View>
  );
}
