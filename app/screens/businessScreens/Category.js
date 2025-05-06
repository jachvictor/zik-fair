import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { Carousel, CategoryIcon, CategoryCard } from "../../components";
import { categories } from "../../data";
import pics from "../../../assets/ece.png";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

export default function Category() {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
  // const { setLoading } = useContext(AppContext);
  const handleFatch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  useEffect(() => {
    handleFatch();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the SafeAreaView takes up the full screen height
      backgroundColor: Colors.background,
      padding: 10,
    },
    flatList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 10,
      // padding: 10,
    },
  });
  const busList = [
    {
      address:
        "no. 4 akwaihedi street  fgfufudiidhjguhcvsgv jhv ischv fgfufudiidhjguhcvsgv jhv ischv fgfufudiidhjguhcvsgv jhv ischv",
      image: pics,
    },
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
    { address: "no. 4 akwaihedi street", image: pics },
  ];
  const renderCat = ({ item }) => {
    return <CategoryIcon name={item.name} icon={item.icon} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Carousel head={"Categories"} data={categories} renderItem={renderCat} />
      <FlatList
        style={styles.flatList}
        contentContainerStyle={{ gap: 10 }}
        data={busList}
        renderItem={({ item }) => (
          <CategoryCard
            address={item.address}
            name={item.address}
            image={item.image}
          />
        )}
      />
    </SafeAreaView>
  );
}
