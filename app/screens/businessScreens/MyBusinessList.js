import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import { SearchBar, SearchCard, FavoriteCard } from "../../components";
import img from "../../../assets/ece.png";
// import { Colors, Typography } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";

export default function MyBusinessList() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensures the SafeAreaView takes up the full screen height
      backgroundColor: Colors.background,
    },
    holdSearch: {
      padding: 10,
      width: "100%",
      paddingBottom: 30,
      backgroundColor: Colors.primary,
    },
    flatList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 10,
      padding: 10,
    },
  });

  const { navigate } = useNavigation();
  const list = [
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
  ];
  const handelNavigate = () => {
    navigate("productDetail");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 15 }}
        style={styles.flatList}
        data={list}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
        renderItem={({ item }) => (
          <FavoriteCard
            address={item.address}
            name={item.name}
            source={item.image}
            onPress={() => handelNavigate()}
          />
        )}
      />
    </SafeAreaView>
  );
}
