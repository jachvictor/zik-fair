import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-screens";
import logo from "../../../assets/logo2.png";
// import { Colors, Typography } from "../../styles";
import { useTheme } from "../../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeHeader() {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 5,
      paddingHorizontal: 10,
      paddingTop: 15,
      paddingBottom: 10,
      backgroundColor: Colors.primary,
    },
    profile: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      paddingTop: 16,
      justifyContent: "space-between",
    },
    image: { height: "auto", width: 100, borderRadius: 16 },
    profileIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 35,
      width: 35,
      borderRadius: 17.5,
      borderColor: "white",
      borderWidth: 2,
      backgroundColor: Colors.accent,
    },

    profileIconText: {
      display: "flex",
      fontSize: 20,
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
    },
  });
  const [user, setUser] = useState(null);

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
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={logo} style={styles.image} />
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>{user?.name[0] ?? "G"}</Text>
        </View>
      </View>
    </View>
  );
}
