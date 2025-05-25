import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { PopUp, EditProfile } from "../../components";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../context/ThemeContext";
import ToastManager, { Toast } from "toastify-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Settings() {
  const { Colors, Typography } = useTheme();
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      padding: 10,
      backgroundColor: Colors.background,
      color: Colors.textPrimary,
    },
    card: {
      display: "flex",
      alignItems: "center",
      //   justifyContent: "center",
      flexDirection: "row",
      borderRadius: 5,
      padding: 10,
      gap: 15,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
    },
    text: {
      color: Colors.textPrimary,
    },
  });
  const { toggleTheme, mode } = useTheme(); // access toggleTheme and mode from context
  const handleToggle = () => {
    try {
      toggleTheme();
      console.log("ggggggg");
    } catch (error) {
      console.error("error theme:", error);
    }
  };
  const handleDelete = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    console.log("Fetched User2:", parsedUser);
    setPopup(false);
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

  const handleDeleteAccount = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    if (!user?._id)
      return Toast.warn("An error occurred, try logging in again");

    const confirm = window.confirm(
      "Are you sure you want to delete your account and all data?"
    );
    if (!confirm) return;

    try {
      setLoading(true);

      // Step 1: Delete all businesses by user
      const deleteBusinessesRes = await fetch(
        `http://localhost:5000/api/business/delete-businesses/${parsedUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await deleteBusinessesRes.json();
      if (resData.success) {
        // Step 2: Delete user account
        const deleteUserRes = await fetch(
          `http://localhost:5000/api/business/delete-businesses/${parsedUser._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteUserRes.ok) {
          await AsyncStorage.removeItem("user");
          Toast.success("Account and all data deleted");
          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000); // or landing screen
        } else {
          Toast.error("Failed to delete user account");
        }
      } else {
        Toast.error("Failed to delete businesses");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ height: "100%", width: "100%" }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              <TouchableOpacity style={styles.card}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={24}
                  color="blue"
                />
                <Text style={styles.text}>Theme</Text>
                <View>
                  {mode === "light" ? (
                    <Feather
                      name="sun"
                      size={24}
                      color="yellow"
                      onPress={handleToggle}
                    />
                  ) : (
                    <Feather
                      name="moon"
                      size={24}
                      color="gray"
                      onPress={handleToggle}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <Entypo name="share" size={24} color="green" />
                <Text style={styles.text}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <AntDesign name="questioncircleo" size={24} color="yellow" />
                <Text style={styles.text}>About App</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card}>
                <AntDesign name="deleteuser" size={24} color={Colors.danger} />
                <Text style={styles.text}>Delete Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => setPopup(true)}
              >
                <MaterialCommunityIcons
                  name="google-my-business"
                  size={24}
                  color={Colors.danger}
                />
                <Text style={styles.text}>Delete My Businesses</Text>
              </TouchableOpacity>
              <EditProfile loading={loading} setLoading={setLoading} />
            </View>
            {popup && (
              <PopUp
                handleNo={() => setPopup(false)}
                handleYes={handleDelete}
              />
            )}
          </ScrollView>
        </SafeAreaView>
      )}{" "}
      <ToastManager />
    </>
  );
}
