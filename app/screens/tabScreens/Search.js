import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import React, { useState } from "react";
import { SearchBar, SearchCard, DropDown } from "../../components";
import img from "../../../assets/ece.png";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";

export default function Search() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      position: "relative",
      display: "flex",
    },
    holdSearch: {
      padding: 10,
      width: "100%",
      backgroundColor: Colors.primary,
    },
    flatList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 10,
      padding: 10,
    },
    filterContainer: {
      padding: 10,
      width: "100%",
      backgroundColor: Colors.primary,
      display: "flex",
      fkex: 1,
      flexDirection: "row",
      gap: 5,
      justifyContent: "space-between",
      position: "absolute",
      marginTop: 70,
      zIndex: 2,
    },
  });

  const { navigate } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Dummy categories for the filter
  const categories = [
    { name: "All" },
    { name: "Business" },
    { name: "Education" },
    { name: "Health" },
  ];
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
  const [filteredList, setFilteredList] = useState(list);

  const handelNavigate = () => {
    navigate("productDetail");
  };

  // Function to filter businesses by selected category
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredList(list); // Show all if "All" is selected
    } else {
      setFilteredList(list.filter((item) => item.category === category)); // Filter by selected category
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Category Filter Dropdown */}
      {/* Search Bar */}
      <View style={styles.holdSearch}>
        <SearchBar placeholder={"Search"} type={"text"} />
      </View>
      {/* FlatList with filtered data */}
      <FlatList
        contentContainerStyle={{ gap: 15 }}
        style={styles.flatList}
        data={filteredList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <SearchCard
            address={item.address}
            name={item.name}
            source={item.image}
            onPress={() => handelNavigate()}
          />
        )}
      />{" "}
      <View style={styles.filterContainer}>
        <DropDown
          header={"Select Category"}
          selected={selectedCategory}
          setSelected={handleFilterChange}
          array={categories}
          background={Colors.card}
          textColor={Colors.textPrimary}
        />
        <DropDown
          header={"Select Category"}
          array={categories}
          background={Colors.card}
          textColor={Colors.textPrimary}
        />
      </View>
    </SafeAreaView>
  );
}
