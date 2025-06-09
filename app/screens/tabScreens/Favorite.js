import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  FavoriteCard,
  EmptyScreen,
  PopUp,
  ErrorScreen,
} from "../../components";
import img from "../../../assets/ece.png";
import { useTheme } from "../../context/ThemeContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function Favorite() {
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();

  const focused = useIsFocused();
  const { navigate } = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: Colors.background,
      position: "relative",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
      backgroundColor: Colors.background,
      padding: 15,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const [isPopup2, setIsPopup2] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [props, setProps] = useState({});

  const showConfirm = (businessId) => {
    setProps({ businessId });
    setIsPopup2(true);
  };
  const list = [
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
  ];
  const handleFetchFav = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    // console.log("Fetched User2:", parsedUser);

    setLoading(true);

    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/get-favorites/${parsedUser._id}`,
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
        Toast.success(resData.message);
        setFavorites(resData.favorites);

        // Here, extract businesses and set it to the state
        // Update this line to get the 'businesses' array
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
    handleFetchFav();
  }, [focused]);

  const handleRemoveToFav = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    setIsPopup2(false);
    setLoading(true);
    const formData = {
      userId: parsedUser._id,
      businessId: props.businessId,
    };
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/remove-favorite`,
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
        handleFetchFav();
        Toast.success(resData.message);

        // Here, extract businesses and set it to the state
        // Update this line to get the 'businesses' array
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFav = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    setIsPopUp(false);
    setLoading(true);
    const formData = {
      userId: parsedUser._id,
    };
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/clear-favorites`,
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
        setError(false);
        setLoading(false);
        handleFetchFav();
        Toast.success(resData.message);

        // Here, extract businesses and set it to the state
        // Update this line to get the 'businesses' array
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
    } finally {
      setLoading(false);
    }
  };
  const handleNavigete2 = (businessId) => {
    navigate("productDetail", { id: businessId });
  };

  const tabsBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/3407237828";
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text
          style={{
            fontSize: Typography.fontSize.lg,
            color: Colors.textPrimary,
          }}
        >
          Favorite
        </Text>
        {!favorites?.length < 1 && (
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
            <Text style={{ color: Colors.textPrimary }}>Clear All</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
      {!loading && adReady && (
        <BannerAd
          unitId={tabsBannerId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: isNonPersonalized,
          }}
        />
      )}
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <>
          {error ? (
            <ErrorScreen handleFetch={handleFetchFav} />
          ) : (
            <ScrollView>
              {favorites?.length < 1 ? (
                <EmptyScreen
                  header={"Favorite business is Empty"}
                  message={"Add businesses to favorite to view here"}
                />
              ) : (
                <FlatList
                  style={styles.flatList}
                  contentContainerStyle={{ gap: 15 }}
                  data={favorites}
                  scrollEnabled={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <FavoriteCard
                      address={
                        item.location == "others" ? item.address : item.location
                      }
                      name={item.name}
                      onDelete={() => showConfirm(item._id)}
                      source={
                        item?.coverImage?.url
                          ? { uri: item.coverImage.url }
                          : null
                      }
                      onPress={() => handleNavigete2(item._id)}
                    />
                  )}
                />
              )}
            </ScrollView>
          )}
        </>
      )}
      {isPopUp && (
        <PopUp
          handleNo={() => setIsPopUp(false)}
          message={"Remove all items?"}
          handleYes={handleClearFav}
        />
      )}
      {isPopup2 && (
        <PopUp
          handleNo={() => setIsPopup2(false)}
          handleYes={handleRemoveToFav}
          message={"Are you sure you want to remove Item from favorite?"}
        />
      )}

      <ToastManager />
    </SafeAreaView>
  );
}
