import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
export default function BusinessCard({
  image,
  category,
  address,
  onPress,
  id,
  name,
  rating,
  addToFav,
}) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: 200,
      backgroundColor: Colors.card,
      flexDirection: "column",
      padding: 10,
      marginHorizontal: 8,
      // alignItems: "center",
      gap: 10,
      borderRadius: 16,
    },
    image: {
      width: "100%",
      height: 130,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.border,
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
  const { navigate } = useNavigation();
  const handelNavigate = (businessId) => {
    navigate("productDetail", { id: businessId });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Image style={styles.image} source={image} />
      </Pressable>
      <View style={{ paddingVertical: 10, width: "100%" }}>
        <ScrollView horizontal>
          <Text style={styles.businessName}>{name}</Text>
        </ScrollView>
        <ScrollView horizontal>
          <Text style={styles.address}>{address}</Text>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View style={styles.rating}>
          <AntDesign name="star" size={24} color="gold" />
          <Text style={{ color: Colors.textPrimary }}>{rating}</Text>
        </View>

        <AntDesign
          size={30}
          color={Colors.secondary}
          name="heart"
          onPress={addToFav}
        />
      </View>
    </View>
  );
}
