import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../context/AppContext";
import ToastManager, { Toast } from "toastify-react-native";
import { useTheme } from "../../context/ThemeContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function Profile() {
  const { Colors, Typography } = useTheme();
  // const { setLoading } = useAppContext();\
  const { isNonPersonalized, adReady } = useAppContext();
  const focused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const [user, setUser] = useState(null);
  const tabsBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/3407237828";

  const styles = StyleSheet.create({
    constainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // padding: 16,
      paddingTop: 30,
      // paddingHorizontal: 10,
      gap: 10,
      backgroundColor: Colors.background,
      // marginStart: 16,
      // justifyContent: "center",
    },
    accountInfo: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    icon: {
      display: "flex",
      width: 100,
      textAlign: "center",
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: 50,
      borderRadius: 50,
      backgroundColor: Colors.accent,
      borderColor: "white",
      borderWidth: 4,
    },
    name: {
      fontSize: 30,
      color: Colors.textPrimary,
    },
    card: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      width: "100%",
      margin: 5,
      alignItems: "center",
      backgroundColor: Colors.card,
      padding: 10,
      borderRadius: 10,
      elevation: 3,
    },
    cardIcon: {
      width: "40%",
    },
    text: {
      width: "60%",
      color: Colors.textPrimary,
    },
    row: {
      justifyContent: "space-between", // Evenly spaces items in a row
      marginBottom: 10,
    },
    profileIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      width: 100,
      borderRadius: 50,
      borderColor: "white",
      borderWidth: 2,
      backgroundColor: Colors.accent,
    },

    profileIconText: {
      display: "flex",
      fontSize: 50,
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
    },
  });

  const data = [
    { id: "1", title: "Add Business", name: "add-business", color: "blue" },
    {
      id: "2",
      title: "My Business",
      name: "google-my-business",
      color: "yellow",
    },
    { id: "3", title: "Settings", name: "manage-accounts", color: "green" },
    { id: "4", title: "Logout", name: "log-out", color: "red" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    const formData = {
      email: user.email,
      id: user._id,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      // console.log("respone", resData);
      if (response.ok) {
        setLoading(false);
        setUser(null);
        await AsyncStorage.removeItem("user");
        Toast.success(resData.message);

        setTimeout(() => {
          navigate("Login");
        }, 2000);
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      Toast.error("Error during log out");
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (name, title, color, size = 24) => {
    switch (name) {
      case "add-business":
        return (
          <MaterialIcons
            style={styles.cardIcon}
            name={name}
            size={size}
            color={color}
          />
        );
      case "google-my-business":
        return (
          <MaterialCommunityIcons
            style={styles.cardIcon}
            name={name}
            size={size}
            color={color}
          />
        );
      case "manage-accounts":
        return (
          <MaterialIcons
            style={styles.cardIcon}
            name={name}
            size={size}
            color={color}
          />
        );
      case "log-out":
        return (
          <Feather
            style={styles.cardIcon}
            name={name}
            size={size}
            color={color}
          />
        );
      default:
        return null;
    }
  };
  const handleNavigete = async (type) => {
    const storedData = await AsyncStorage.getItem("user");
    const user = storedData ? JSON.parse(storedData) : {};
    // await AsyncStorage.removeItem("user");
    // const user = JSON.parse(await AsyncStorage.getItem("user"));
    // const user = {};
    // console.log("user", user);

    if (type === "add-business") {
      if (user.vendor) {
        // if (true) {
        navigate("AddBusiness");
      } else {
        navigate("RegisterVendor");
      }
    } else if (type === "manage-accounts") {
      navigate("Settings");
    } else if (type === "google-my-business") {
      navigate("MyBusinessList");
    } else if (type === "log-out") {
      handleLogout();
    } else {
      // You can leave this empty or add a fallback if needed
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleNavigete(item.name)}
      style={styles.card}
    >
      {renderIcon(item.name, item.name, item.color)}
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedData = await AsyncStorage.getItem("user");
        const parsedUser = storedData ? JSON.parse(storedData) : null;
        // console.log("Fetched User:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [focused]);
  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.constainer}>
          <View style={styles.accountInfo}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>{user?.name[0] ?? ""}</Text>
            </View>
            <Text style={styles.name}>{user?.name ?? ""}</Text>
            <Text style={{ color: Colors.textSecondary }}>
              {user?.email ?? ""}
            </Text>
          </View>
          <FlatList
            style={{ width: "100%", padding: 16 }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2} // Specifies 2 columns
            columnWrapperStyle={styles.row} // Styles each row
          />
          {/* <ToastManager /> */}
        </SafeAreaView>
      )}
      {adReady && (
        <BannerAd
          unitId={tabsBannerId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: isNonPersonalized, // use from context
          }}
        />
      )}
      <ToastManager />
    </>
  );
}
