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

export default function Category({ route }) {
  const { cat } = route.params || "cat";
  console.log("cat", cat);
  const { Colors, Typography } = useTheme();
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(cat);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  // Fetch businesses on mount
  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/business/get-all-businesses`
        );
        const resData = await response.json();

        if (response.ok) {
          setBusinesses(resData.businesses || []);
          setSelectedCategory(cat);
          Toast.success(resData.message || "Businesses loaded.");
        } else {
          Toast.error(resData.message || "Failed to load businesses.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Toast.error("Network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{ height: "100%", width: "100%" }}
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
                  address={item.address}
                  name={item.name || item.address}
                  image={
                    item?.coverImage?.url ? { uri: item.coverImage.url } : image // your local fallback image
                  }
                  rating={calculateAverageRating(item.comments)}
                />
              )}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
