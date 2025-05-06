import React, { Component, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import {
  SearchBar,
  Carousel,
  CategoryIcon,
  BusinessCard,
  HomeCarousel,
} from "../../components";
import pics from "../../../assets/ece.png";
import { categories } from "../../data/Categories";
import { useNavigation } from "@react-navigation/native";
import Loading from "../splashScreens/Loading";
import { useFonts } from "expo-font";
// import { Colors, Typography, Spacing } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";
export default function Home() {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "auto",
      fontFamily: "outfit",
      backgroundColor: Colors.background,
      color: Colors.textPrimary,
    },
    holdSearch: {
      padding: 10,
      width: "100%",
      paddingBottom: 20,
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
      backgroundColor: Colors.primary,
      // fontFamily: "outfit",
    },
    carouselImage: {
      borderRadius: 16,
      marginHorizontal: 10,
      width: 200,
    },
  });
  const { navigate } = useNavigation();
  const busList = [
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
  ];

  const handleNavigete = (data) => {
    navigate("category", data);
  };
  const handleNavigete2 = (data) => {
    navigate("productDetail", data);
  };
  const renderCat = ({ item }) => {
    return (
      <CategoryIcon
        onPress={() => handleNavigete(item)}
        name={item.name}
        icon={item.icon}
      />
    );
  };
  const renderBiz = ({ item }) => {
    return (
      <BusinessCard
        onPress={() => handleNavigete2(item)}
        image={item.image}
        address={item.address}
        category={"category"}
      />
    );
  };
  const handleFatch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  useEffect(() => {
    // handleFatch();
  }, []);
  return (
    <>
      {/* <Loading /> */}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.holdSearch}>
            <SearchBar placeholder={"Search"} />
          </View>
          {/* <Carousel head={"#For you"} renderItem={renderItem} data={carolList} /> */}
          <HomeCarousel />
          <Carousel
            head={"Categories"}
            renderItem={renderCat}
            data={categories}
          />
          <Carousel head={"Popular"} renderItem={renderBiz} data={busList} />
          <Carousel head={"New"} renderItem={renderBiz} data={busList} />
          <Carousel
            head={"Recommended"}
            renderItem={renderBiz}
            data={busList}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
