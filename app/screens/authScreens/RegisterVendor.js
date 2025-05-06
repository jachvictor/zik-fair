import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../styles";
import Loading from "../splashScreens/Loading";

export default function RegisterVendor({}) {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      width: "100%",
      padding: 10,
      gap: 10,
      backgroundColor: Colors.primary,
    },
    holdHeader: {
      display: "flex",
      gap: 5,
      width: "100%",
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.white,
      textAlign: "center",
    },
    meassage: {
      fontSize: Typography.fontSize.md,
      textAlign: "center",
      color: "silver",
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      backgroundColor: Colors.white,
      borderRadius: 10,
      borderWidth: 1,
    },
    form: {
      display: "flex",
      width: "100%",
      gap: 5,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      // backgroundColor: Colors.card,
    },
  });
  const { navigate } = useNavigation();
  // const { data } = route.params;
  const [token, setToken] = useState();
  const [vendorEmail, setVendorEmail] = useState("");
  const isUnizikEmail = (email) => {
    const unizikRegex = /^[^\s@]+@(students\.)?unizik\.edu\.ng$/i;
    // return unizikRegex.test(email);
    return email.endsWith("@stu.unizik.edu.ng");
  };
  const handleRegister = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const user = storedData !== undefined ? JSON.parse(storedData) : {};
    console.log("user", user);

    if (!user.email) {
      Toast.warn("An error occurred, please log out and login again");
      return;
    } else if (vendorEmail === "") {
      Toast.warn("please input your school email");

      return;
    } else if (!isUnizikEmail(vendorEmail)) {
      Toast.warn("this is not a UNIZIK email");
      return;
    }

    setLoading(true);
    const formData = {
      email: user.email,
      vendorEmail,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register-vendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      console.log("respone", resData);
      if (response.ok) {
        setLoading(false);
        Toast.success(resData.message);
        setTimeout(() => {
          navigate("VerifyVendor", { data: vendorEmail });
        }, 3000);
      } else {
        setLoading(false);
        Toast.error(resData.message);
        // throw new Error("Signup failed, server error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during sign up:", error);
      Toast.error("Error during sign up");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Loading/> */}
      <ScrollView style={styles.container}>
        <View style={styles.holdHeader}>
          <Text style={styles.header}>Vendor Verification</Text>
          <Text style={styles.meassage}>
            Only Nnamdi Azikiwe (Unizik) students are allowed to exhibit their
            products in this platform, please kindly provide your school email
            for Verification
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={vendorEmail}
            placeholder="UNIZIK School Email"
            onChangeText={(text) => setVendorEmail(text)}
          />

          <TouchableOpacity
            style={{
              backgroundColor: Colors.secondary,
              color: Colors.white,
              borderRadius: 5,
              padding: 10,
              width: "100%",
              textAlign: "center",
              marginVertical: 10,
            }}
            onPress={() => handleRegister()}
          >
            <Text style={Button.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
          onPress={() => navigate("VerifyVendor")}
        >
          <Text style={{ textAlign: "center" }}>Already gotten token?</Text>
          <Text style={{ textAlign: "center" }}>{">"}</Text>
        </Pressable>
      </ScrollView>
      <ToastManager />
    </SafeAreaView>
  );
}
