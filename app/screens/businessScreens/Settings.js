import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Share,
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
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../context/AppContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
export default function Settings() {
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const { navigate } = useNavigation();
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
    } catch (error) {
      console.error("error theme:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    if (!parsedUser._id)
      return Toast.warn("An error occurred, try logging in again");

    setIsPopup(false);
    const formData = { userId: parsedUser._id };
    try {
      setLoading(true);

      // Step 1: Delete all businesses by user
      const deleteBusinessesRes = await fetch(
        `https://zikfair.onrender.com/api/business/delete-businesses/${parsedUser._id}`,
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
          `https://zikfair.onrender.com/api/auth/delete-account`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (deleteUserRes.ok) {
          await AsyncStorage.removeItem("user");
          Toast.success("Account and all data deleted");
          setTimeout(() => {
            navigate("Signup");
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
  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        title: "Check out this app!",
        message:
          "Hey! Check out this awesome UNIZIK Business Directory app: https://play.google.com/store/apps/details?id=com.yourappname", // Replace with your app's link
        url: "https://play.google.com/store/apps/details?id=com.yourappname", // Optional for iOS
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("App shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing the app:", error.message);
    }
  };

  const inScreenBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/7738903496";

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              <TouchableOpacity style={styles.card} onPress={handleToggle}>
                <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={24}
                  color="blue"
                />
                <Text style={styles.text}>Theme</Text>
                <View>
                  {mode === "light" ? (
                    <Feather name="sun" size={24} color="yellow" />
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
              <TouchableOpacity style={styles.card} onPress={handleShareApp}>
                <Entypo name="share" size={24} color="green" />
                <Text style={styles.text}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigate("About")}
              >
                <AntDesign name="questioncircleo" size={24} color="yellow" />
                <Text style={styles.text}>About App</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => setIsPopup(true)}
              >
                <AntDesign name="deleteuser" size={24} color={Colors.danger} />
                <Text style={styles.text}>Delete Account</Text>
              </TouchableOpacity>

              <EditProfile loading={loading} setLoading={setLoading} />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      {isPopup && (
        <PopUp
          handleNo={() => setIsPopup(false)}
          handleYes={handleDeleteAccount}
          message={"Are you sure you want to delete your account and all data"}
        />
      )}
      {adReady && (
        <BannerAd
          unitId={inScreenBannerId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: isNonPersonalized,
          }}
        />
      )}
      <ToastManager />
    </>
  );
}
