import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Carousel, CategoryIcon, CategoryCard } from "../../components";
import { categories } from "../../data";
import { useTheme } from "../../context/ThemeContext";
import ToastManager, { Toast } from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Category({ route }) {
  const { cat } = route.params || "cat";
  // console.log("cat", cat);
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(cat);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  // Fetch businesses on mount
  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/get-all-businesses`
      );
      const resData = await response.json();

      if (response.ok) {
        setBusinesses(resData.businesses || []);
        setSelectedCategory(cat);
        const count = await AsyncStorage.getItem("adCountC");
        // console.log("adcount", count);
        await AsyncStorage.setItem(
          "adCountC",
          (parseInt(count) + 1).toString()
        );
        // Toast.success(resData.message || "Businesses loaded.");
      } else {
        Toast.error(resData.message || "Failed to load businesses.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter businesses by category (case-insensitive)
  const filteredBusinesses = selectedCategory
    ? businesses.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  // Category renderer
  const renderCategoryItem = ({ item }) => (
    <CategoryIcon
      onPress={() => setSelectedCategory(item.name)}
      name={item.name}
      icon={item.icon}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 10,
    },
    flatList: {
      width: "100%",
    },
    noResults: {
      marginTop: 40,
      alignItems: "center",
    },
    noResultsText: {
      color: Colors.textSecondary || "#666",
      fontSize: 16,
      fontStyle: "italic",
    },
  });
  const handelNavigate = (businessId) => {
    navigate("productDetail", { id: businessId });
  };
  const calculateAverageRating = (comments = []) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    return (total / comments.length).toFixed(1); // e.g., "4.3"
  };
  const inScreenInterstitialId = __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-7487058490506362/2604543614";

  const interstitial = InterstitialAd.createForAdRequest(
    inScreenInterstitialId,
    {
      requestNonPersonalizedAdsOnly: isNonPersonalized,
    }
  );

  useEffect(() => {
    handleFetch();

    // if (id) handleFetch();
  }, []);

  useEffect(() => {
    const showAdIfNeeded = async () => {
      try {
        const count = await AsyncStorage.getItem("adCountC");
        const newCount = parseInt(count);
        // console.log("adcount2", newCount);

        await AsyncStorage.setItem("adCountC", newCount.toString());

        // Show ad only every 5th time
        if (newCount % 3 === 0) {
          interstitial.load();
        }
      } catch (error) {
        console.error("Error checking ad count:", error);
      }
    };

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => interstitial.show()
    );

    showAdIfNeeded();

    return () => unsubscribe();
  }, []);

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
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <>
          <Carousel
            head="Categories"
            data={categories}
            renderItem={renderCategoryItem}
          />

          {filteredBusinesses.length === 0 ? (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                No businesses found in this category.
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              contentContainerStyle={{ gap: 10, paddingBottom: 40 }}
              data={filteredBusinesses}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={({ item }) => (
                <CategoryCard
                  onPress={() => handelNavigate(item._id)}
                  address={
                    item.location == "others" ? item.address : item.location
                  }
                  name={item.name}
                  image={
                    item?.coverImage?.url ? { uri: item.coverImage.url } : image // your local fallback image
                  }
                  rating={calculateAverageRating(item.comments)}
                  onAddFav={() => handleAddToFav(item._id)}
                />
              )}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
