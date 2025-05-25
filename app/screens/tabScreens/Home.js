import React, { Component, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
import ToastManager, { Toast } from "toastify-react-native";
// import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const { Colors, Typography } = useTheme();
  // const { setLoading } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [Businesses, setBusinesses] = useState([]);

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
      position: "relative",
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
    dropdown: {
      // position: "absolute",
      backgroundColor: Colors.background,
      padding: 10,
      borderRadius: 5,
      elevation: 3,
      marginTop: 5,
      width: "100%",
      height: 60,
      alignSelf: "center",
      zIndex: 115,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      color: Colors.textPrimary,
    },
  });
  const { navigate } = useNavigation();
  const busList = [
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
  ];

  const handleNavigete = (data) => {
    navigate("category", {cat:data});
  };
  const handleNavigete2 = (data) => {
    navigate("productDetail", data);
  };
  const renderCat = ({ item }) => {
    return (
      <CategoryIcon
        onPress={() => handleNavigete(item.name)}
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

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/business/get-all-businesses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resData = await response.json();
        console.log("response", resData);

        if (response.ok) {
          setLoading(false);
          Toast.success(resData.message);

          // Here, extract businesses and set it to the state
          setBusinesses(resData.businesses); // Update this line to get the 'businesses' array
        } else {
          setLoading(false);
          Toast.error(resData.message);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error during fetch:", error);
        Toast.error("Error during fetch");
      }
    };
    handleFetch();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Sample list of businesses

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = Businesses.filter((biz) =>
        biz.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  }, [searchText]);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ height: "100%", width: "100%" }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.holdSearch}>
              <SearchBar
                placeholder={"Search"}
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />

              {filteredResults.length > 0 && (
                <ScrollView style={styles.dropdown}>
                  {filteredResults.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        // Navigate to business or show detail
                        console.log("Selected:", item.name);
                        setSearchText(item.name); // optional
                        setFilteredResults([]);
                      }}
                      style={styles.dropdownItem}
                    >
                      <Text style={{ color: Colors.textPrimary }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
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
      )}
      <ToastManager/>
    </>
  );
}
