import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  SearchBar,
  SearchCard,
  DropDown,
  EmptyScreen,
  ErrorScreen,
} from "../../components";
import img from "../../../assets/ece.png";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import ToastManager, { Toast } from "toastify-react-native";
import { categories, location } from "../../data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { useAppContext } from "../../context/AppContext";
export default function Search() {
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();
  const focused = useIsFocused();

  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Businesses, setBusinesses] = useState([]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      position: "relative",
      display: "flex",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      // paddingBottom: 20,
    },
    holdSearch: {
      padding: 10,
      width: "100%",
      backgroundColor: Colors.primary,
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "row",
    },
    flatList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 10,
      padding: 10,
      paddingBottom: 20,
      marginBottom: 10,
    },
    filterContainer: {
      padding: 10,
      width: "100%",
      height: "40%",
      backgroundColor: Colors.background,
      display: "flex",
      fkex: 1,
      borderWidth: 2,
      borderColor: Colors.border,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,

      // flexDirection: "row",
      gap: 10,
      justifyContent: "space-between",
      position: "absolute",
      // marginTop: 70,
      bottom: isFilter ? 0 : -1000,
      zIndex: 2,
    },
    searchContainer: {
      display: "flex",
      flexDirection: "row",
      width: "80%",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 1,
      borderRadius: 10,
      backgroundColor: Colors.card,
    },
    search: {
      paddingVertical: 10,
      width: "80%",
      color: Colors.textPrimary,
      outlineStyle: "none",
    },
    icon: {
      display: "flex",
      alignSelf: "center",
      justifyContent: "center",
      color: Colors.textPrimary,
      width: "10%",
    },
    filterBtn: {
      padding: 5,
      width: "100%",
      display: "flex",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 5,
      // backgroundColor: Colors.card,
    },
  });

  const { navigate } = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Dummy categories for the filter

  const list = [
    {
      name: "Business A",
      image: img,
      address: "Shshshshshshsh",
      category: "Business",
    },
    {
      name: "Business B",
      image: img,
      address: "Shshshshshshsh",
      category: "Health",
    },
    {
      name: "Business C",
      image: img,
      address: "Shshshshshshsh",
      category: "Education",
    },
    {
      name: "Business D",
      image: img,
      address: "Shshshshshshsh",
      category: "Business",
    },
    {
      name: "Business E",
      image: img,
      address: "Shshshshshshsh",
      category: "Health",
    },
    {
      name: "Business F",
      image: img,
      address: "Shshshshshshsh",
      category: "Education",
    },
  ];

  const handelNavigate = (businessId) => {
    navigate("productDetail", { id: businessId });
  };
  const handleFetch = async () => {
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
        setError(false);
        setLoading(false);

        // Here, extract businesses and set it to the state
        setBusinesses(resData.businesses);
        setFilteredResults(resData.businesses); // Update this line to get the 'businesses' array
        // Toast.success(resData.message);
      } else {
        setError(true);
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
    }
  };
  useEffect(() => {
    handleFetch();
  }, [focused]);
  useEffect(() => {
    let results = Businesses;

    if (searchText) {
      results = results.filter((biz) =>
        biz?.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (biz) => biz?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedLocation) {
      results = results.filter(
        (biz) => biz?.location?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    setFilteredResults(results);
  }, [searchText, selectedCategory, selectedLocation, Businesses]);

  const handleAddToFav = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};

    const formData = {
      userId: parsedUser._id,
      businessId: id,
    };
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  const tabsBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/3407237828";
  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: Colors.background,
          }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <>
          {error ? (
            <ErrorScreen
              header={"Server error"}
              message={"an error occurred,"}
              handleFetch={handleFetch}
            />
          ) : (
            <SafeAreaView style={styles.container}>
              {/* Category Filter Dropdown */}
              {/* Search Bar */}
              <View style={styles.holdSearch}>
                <View style={styles.searchContainer}>
                  <Ionicons size={20} style={styles.icon} name="search" />
                  <TextInput
                    style={styles.search}
                    placeholder={"search"}
                    placeholderTextColor={Colors.textSecondary}
                    // keyboardType={type}
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                  />
                  {searchText.length > 0 && (
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={24}
                      color={Colors.textPrimary}
                      onPress={() => setSearchText("")}
                    />
                  )}
                </View>
                {/* <TouchableOpacity style={styles.filterBtn}> */}
                <Ionicons
                  size={30}
                  style={{
                    display: "flex",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    color: Colors.card,
                    width: "12%",
                    // height:"100%",
                    // backgroundColor: Colors.card,
                  }}
                  name={isFilter ? "close" : "filter"}
                  onPress={() => setIsFilter((prev) => !prev)}
                />
                {/* </TouchableOpacity> */}
              </View>
              {adReady && (
                <BannerAd
                  unitId={tabsBannerId}
                  size={BannerAdSize.BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: isNonPersonalized,
                  }}
                />
              )}
              {/* FlatList with filtered data */}
              {filteredResults.length === 0 ? (
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: Colors.textPrimary,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  No result found
                </Text>
              ) : (
                // <EmptyScreen />
                <FlatList
                  contentContainerStyle={{ gap: 15 }}
                  style={styles.flatList}
                  data={filteredResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <SearchCard
                      address={
                        item.location == "others" ? item.address : item.location
                      }
                      name={item.name}
                      source={
                        item?.coverImage?.url
                          ? { uri: item.coverImage.url }
                          : null
                      }
                      onPress={() => handelNavigate(item._id)}
                      onAddFav={() => handleAddToFav(item._id)}
                    />
                  )}
                />
              )}

              <View style={styles.filterContainer}>
                <MaterialIcons
                  name="filter-list-off"
                  size={30}
                  color={Colors.textPrimary}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 5,
                  }}
                  onPress={() => {
                    setSelectedCategory("");
                    setSelectedLocation("");
                    setSearchText("");
                  }}
                />

                <ScrollView>
                  <View style={{ gap: 10, display: "flex" }}>
                    <DropDown
                      header={"Select Category"}
                      selected={selectedCategory}
                      setSelected={setSelectedCategory}
                      array={categories}
                      background={Colors.card}
                      textColor={Colors.textPrimary}
                    />
                    <DropDown
                      header={"Select Location"}
                      selected={selectedLocation}
                      setSelected={setSelectedLocation}
                      array={location}
                      background={Colors.card}
                      textColor={Colors.textPrimary}
                    />
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
          )}
        </>
      )}
      <ToastManager />
    </>
  );
}
