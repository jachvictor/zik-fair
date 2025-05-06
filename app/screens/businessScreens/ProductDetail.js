import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather"; //phone
import FontAwesome from "@expo/vector-icons/FontAwesome"; //Whatsapp
//facbook
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; //web
import AntDesign from "@expo/vector-icons/AntDesign"; //twitter
import image from "../../../assets/ece.png";
import { Carousel, Review, Comments } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProductDetail() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      // padding: 15,
      width: "100%",

      backgroundColor: Colors.card,

      color: Colors.textPrimary,
    },
    productImage: {
      width: "100%",
      height: 340,
      // flex: 1,
    },
    productContent: {
      height: "auto",
      borderRadius: 20,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
    },
    iconList: {
      display: "flex",
      flexDirection: "row",
      gap: 16,
    },
    icon: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      margin: 10,
    },
    scroll: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      height: "100%",
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
    holdName: {
      display: "flex",
      padding: 16,
      gap: 10,
    },
    holdRating: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 16,
      // gap: 10,
    },
    about: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: 16,
    },
    sampleImage: {
      borderRadius: 10,
      height: 150,
      width: 150,
      margin: 10,
      borderWidth: 1,
      borderColor: Colors.border,
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

  const data = [
    { id: "1", title: "Phone", icon: "phone", color: "green" },
    { id: "2", title: "WhatsApp", icon: "whatsapp", color: "blue" },
    { id: "3", title: "Facebook", icon: "facebook", color: "yellow" },
    { id: "4", title: "Web", icon: "web", color: "red" },
    { id: "5", title: "Twitter", icon: "twitter", color: "orange" },
  ];
  const data2 = [image, image, image, image];
  const renderIcon = (name, size = 24) => {
    switch (name) {
      case "phone":
        return <AntDesign name={name} size={size} color={"white"} />;
      case "whatsapp":
        return <FontAwesome name={name} size={size} color={"white"} />;
      case "facebook":
        return <FontAwesome name={name} size={size} color={"white"} />;
      case "web":
        return (
          <MaterialCommunityIcons size={size} name={name} color={"white"} />
        );
      case "twitter":
        return <AntDesign name={name} size={size} color={"white"} />;
      default:
        return null;
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.icon}>
        <View
          style={{
            backgroundColor: item.color,
            // padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        >
          {renderIcon(item.icon)}
        </View>
        <Text style={{ color: Colors.textPrimary }}>{item.title}</Text>
      </View>
    );
  };
  const renderItem2 = ({ item }) => {
    return <Image style={styles.sampleImage} source={item} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Image style={styles.productImage} source={image} />
        <View
          style={{
            width: "100%",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: -60,
            padding: 10,
          }}
        >
          <Ionicons size={24} color={Colors.secondary} name="heart" />
        </View>
        <View style={styles.productContent}>
          <View style={styles.holdName}>
            <Text style={styles.name}>Name of Business</Text>
            <Text style={styles.address}>business address</Text>
          </View>
          <View style={styles.holdRating}>
            <View style={styles.rating}>
              <AntDesign name="star" size={24} color="gold" />
              <Text style={{ color: Colors.textPrimary }}>4.5</Text>
            </View>

            <Text
              style={{
                fontSize: Typography.fontSize.lg,
                color: Colors.textPrimary,
              }}
            >
              Category
            </Text>
          </View>
          <Carousel data={data} renderItem={renderItem} />
          <View style={styles.about}>
            <Text
              style={{
                fontSize: Typography.fontSize.lg,
                fontWeight: "bold",
                textAlign: "left",
                width: "100%",
                color: Colors.textPrimary,
              }}
            >
              About
            </Text>
            <Text
              style={{
                color: Colors.textPrimary,
                fontFamily: Typography.fontFamily.regular,
              }}
            >
              There are many movies based on Mary Shelley's 1818 novel
              Frankenstein; or, The Modern Prometheus, including: Frankenstein
              1931: This adaptation has a happier ending than the original book,
              with Frankenstein's father toasting the couple at their wedding.
              Victor Frankenstein: A well-acted movie with horror elements, but
              not considered a traditional horror film.
            </Text>
          </View>
          <Carousel data={data2} renderItem={renderItem2} head={"Samples"} />
        </View>
        <Review />
        <Comments
          comments={"your services are awful, do better."}
          icon={"C"}
          name={"Victor"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
