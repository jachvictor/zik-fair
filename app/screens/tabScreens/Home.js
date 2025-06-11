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
import pics from "../../../assets/noImage.png";
import { categories } from "../../data/Categories";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Loading from "../splashScreens/Loading";
import { useFonts } from "expo-font";
// import { Colors, Typography, Spacing } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";
import ToastManager, { Toast } from "toastify-react-native";
// import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { BackHandler } from "react-native";

const calculateAverageRating = (comments = []) => {
  if (comments.length === 0) return 0;
  const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
  return (total / comments.length).toFixed(1); // e.g., "4.3"
};
export default function Home() {
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();
  const isFocused = useIsFocused();

  // const { setLoading } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [Businesses, setBusinesses] = useState([]);
  const [popularBus, setPopularBus] = useState([]);
  const [newBus, setNewBus] = useState([]);
  const [recommendedBus, setRecommendedBus] = useState([]);
  const [nearYouBus, setNearYouBus] = useState([]);
  const [error, setError] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "auto",
      fontFamily: "outfit",
      backgroundColor: Colors.background,
      color: Colors.textPrimary,
      paddingBottom: 15,
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
    { address: "", image: pics },
    { address: "", image: pics },
    { address: "", image: pics },
  ];

  const handleNavigete = (data) => {
    navigate("category", { cat: data });
  };
  const handleNavigete2 = (businessId) => {
    navigate("productDetail", { id: businessId });
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
        onPress={() => handleNavigete2(item._id)}
        name={item.name}
        image={
          item?.coverImage?.url ? { uri: item.coverImage.url } : null // your local fallback image
        }
        address={item.location == "others" ? item.address : item.location}
        category={item.category}
        rating={calculateAverageRating(item.comments)}
        addToFav={() => handleAddToFav(item._id)}
      />
    );
  };
  const handleFetch = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    // console.log("Fetched User2:", parsedUser);
    setError(false);
    setLoading(true);

    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/get-all-businesses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await response.json();
      // console.log("response", resData);

      if (response.ok) {
        setLoading(false);
        // Toast.success(resData.message);

        // Here, extract businesses and set it to the state
        setBusinesses(resData.businesses); // Update this line to get the 'businesses' array
        const popularBusinesses = resData.businesses
          .filter(
            (b) =>
              calculateAverageRating(b.comments) >= 4 &&
              b.comments &&
              b.comments.length >= 3
          )
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 10); // top 10 popular
        setPopularBus(popularBusinesses);

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const newBusinesses = resData.businesses.filter((business) => {
          const createdDate = new Date(business.createdAt);
          return createdDate >= startOfMonth;
        });
        const newBusinessesThisMonth = newBusinesses
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setNewBus(newBusinessesThisMonth);

        const recommendedBusinesses = resData.businesses
          .filter((b) => calculateAverageRating(b.comments) >= 4)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 10); // top 10 popular
        setRecommendedBus(recommendedBusinesses);
        const nearYou = resData.businesses.filter(
          (b) => b.location == parsedUser.location
        );
        setNearYouBus(nearYou);
      } else {
        setError(true);
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("An error occurred:", error);
      Toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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

  const handleAddToFav = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};

    setLoading(true);
    const formData = {
      userId: parsedUser._id,
      businessId: id,
    };
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/add-favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      // console.log("response", resData);

      if (response.ok) {
        setLoading(false);
        handleFetch();
        Toast.success(resData.message);

        // Here, extract businesses and set it to the state
        // Update this line to get the 'businesses' array
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      Toast.error("An error occurred. Try again.");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true; // block back button
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  const tabsBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/3407237828";
  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
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
                handleClear={() => setSearchText("")}
              />

              {searchText !== "" && (
                <ScrollView style={styles.dropdown}>
                  {filteredResults.length > 0 ? (
                    <>
                      {filteredResults.map((item) => (
                        <>
                          <TouchableOpacity
                            key={item._id}
                            onPress={() => {
                              handleNavigete2(item._id);
                            }}
                            style={styles.dropdownItem}
                          >
                            <Text style={{ color: Colors.textPrimary }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ))}
                    </>
                  ) : (
                    <Text style={styles.dropdownItem}>No result found</Text>
                  )}
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

            {error ? (
              <>
                <Carousel
                  head={"Popular"}
                  renderItem={renderBiz}
                  data={busList}
                />
                <Carousel head={"New"} renderItem={renderBiz} data={busList} />
                <Carousel
                  head={"Recommended"}
                  renderItem={renderBiz}
                  data={busList}
                />
              </>
            ) : (
              <>
                {!popularBus.length < 1 && (
                  <Carousel
                    head={"Popular"}
                    renderItem={renderBiz}
                    data={popularBus}
                  />
                )}
                {!newBus.length < 1 && (
                  <Carousel head={"New"} renderItem={renderBiz} data={newBus} />
                )}
                {adReady && (
                  <BannerAd
                    unitId={tabsBannerId}
                    size={BannerAdSize.MEDIUM_RECTANGLE}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: isNonPersonalized,
                    }}
                  />
                )}
                {!recommendedBus.length < 1 && (
                  <Carousel
                    head={"Recommended"}
                    renderItem={renderBiz}
                    data={recommendedBus}
                  />
                )}
                {!nearYouBus.length < 1 && (
                  <Carousel
                    head={"Near You"}
                    renderItem={renderBiz}
                    data={nearYouBus}
                  />
                )}
              </>
            )}
          </ScrollView>
          <Ionicons
            name="reload"
            size={30}
            color={Colors.primary}
            onPress={handleFetch}
            style={{
              position: "absolute",
              bottom: 0,
              // width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              backgroundColor: "transparent",
              // backgroundColor: Colors.background,
              margin: 10,
              // marginVertical: 10,
            }}
          />
        </SafeAreaView>
      )}

      <ToastManager />
    </>
  );
}
