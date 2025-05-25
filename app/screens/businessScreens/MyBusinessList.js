import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  SearchBar,
  SearchCard,
  FavoriteCard,
  PopUp,
  EmptyScreen,
} from "../../components";
import img from "../../../assets/ece.png";
// import { Colors, Typography } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    header: {
      backgroundColor: "white",
      padding: 15,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: Typography.fontSize.lg,
    },
  });
  const [Businesses, setBusinesses] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  const list = [
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
    { name: "business", image: img, address: "shshshshshshsh" },
  ];
  const handelNavigate = (businessId) => {
    navigate("productDetail", { id: businessId });
  };

  useEffect(() => {
    const handleFetch = async () => {
      const storedData = await AsyncStorage.getItem("user");
      const parsedUser = storedData ? JSON.parse(storedData) : {};
      console.log("Fetched User2:", parsedUser);
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:5000/api/business/user/${parsedUser._id}`,
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
  const handleDelete = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    console.log("Fetched User2:", parsedUser);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/business/delete-business/${id}`,
        {
          method: "DELETE",
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
  const triggerDelete = (businessId) => {
    setSelectedBusinessId(businessId);
    setPopUp(true);
  };

  const confirmDelete = () => {
    if (selectedBusinessId) {
      handleDelete(selectedBusinessId); // Your actual delete logic
      setPopUp(false);
      setSelectedBusinessId(null);
    }
  };

  const cancelDelete = () => {
    setPopUp(false);
    setSelectedBusinessId(null);
  };
  const handleDeleteAll = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    console.log("Fetched User2:", parsedUser);
    setPopUp2(false);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/business/delete-businesses/${parsedUser._id}`,
        {
          method: "DELETE",
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
          style={{ height: "100%", width: "100%" }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <>
          <View style={styles.header}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              onPress={() => navigation.goBack()}
            />
            <Text
              style={{ fontSize: Typography.fontSize.lg, color: Colors.black }}
            >
              My Businesses
            </Text>
            <TouchableOpacity
              style={{
                display: "flex",
                gap: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setPopUp2(true)}
            >
              <AntDesign size={20} color={Colors.danger} name="delete" />
              <Text>Clear All</Text>
            </TouchableOpacity>
          </View>
          {Businesses.length < 1 ? (
            <EmptyScreen header={"You not Uploeded any business yet"} />
          ) : (
            <FlatList
              contentContainerStyle={{ gap: 15 }}
              style={styles.flatList}
              data={Businesses}
              keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
              renderItem={({ item }) => (
                <FavoriteCard
                  address={item.address}
                  name={item.name}
                  source={item.coverImage.url}
                  onPress={() => handelNavigate(item._id)}
                  onDelete={() => triggerDelete(item._id)}
                />
              )}
            />
          )}
          {popUp && (
            <PopUp
              handleYes={confirmDelete}
              handleNo={cancelDelete}
              message={"are you sure you want to delete this business"}
            />
          )}
          {popUp2 && (
            <PopUp
              handleYes={handleDeleteAll}
              handleNo={() => setPopUp2(false)}
              message={"are you sure you want to delete all your businesses"}
            />
          )}
        </>
      )}
      <ToastManager />
    </SafeAreaView>
  );
}
