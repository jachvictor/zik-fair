import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FavoriteCard, EmptyScreen, PopUp } from "../../components";
import img from "../../../assets/ece.png";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Favorite() {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: Colors.background,
      position: "relative",
      // Ensures the SafeAreaView takes up the full screen height
    },
    flatList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 10,
      padding: 10,
    },
    header: {
      backgroundColor: "white",
      padding: 15,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const handleClearAll = () => {};
  const list = [
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: Typography.fontSize.lg, color: Colors.black }}>
          Favorite
        </Text>
        <TouchableOpacity
          style={{
            display: "flex",
            gap: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setIsPopUp(true)}
        >
          <AntDesign size={20} color={Colors.danger} name="delete" />
          <Text>Clear All</Text>
        </TouchableOpacity>
      </View>
      {list.length < 1 ? (
        <EmptyScreen
          header={"Favorite business is Empty"}
          message={"Add businesses to favorite to view here"}
        />
      ) : (
        <FlatList
          style={styles.flatList}
          contentContainerStyle={{ gap: 15 }}
          data={list}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <FavoriteCard
              address={item.address}
              name={item.name}
              source={item.image}
            />
          )}
        />
      )}
      {isPopUp && <PopUp handleNo={() => setIsPopUp(false)} />}
    </SafeAreaView>
  );
}
