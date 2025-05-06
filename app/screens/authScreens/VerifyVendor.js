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
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
export default function VerifyVendor({ route }) {
  const { data } = route.params || {};
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
  const [vendorEmail, setVendorEmail] = useState(data);
  const [token, setToken] = useState("");
  const isUnizikEmail = (email) => {
    const unizikRegex = /^[^\s@]+@(students\.)?unizik\.edu\.ng$/i;
    // return unizikRegex.test(email);
    return email.endsWith("@stu.unizik.edu.ng");
  };
  const handleVerify = async () => {
    if (vendorEmail === "") {
      Toast.warn("please enter your email");
      return;
    } else if (token === "") {
      Toast.warn("please enter the token sent to you email");

      return;
    } else if (!isUnizikEmail(vendorEmail)) {
      Toast.warn("this is not a UNIZIK email");
      return;
    }
    setLoading(true);
    const formData = {
      vendorEmail,
      token,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-vendor",
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

      if (resData.success) {
        setLoading(false);
        Toast.success(resData.message);
        setTimeout(() => {
          navigate("AddBusiness");
        }, 3000);
      } else {
        setLoading(false);
        Toast.error("Error during sign up", resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during sign up:", error);
      Toast.error("Error during sign up:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.holdHeader}>
          <Text style={styles.header}>Token Verification</Text>
          <Text style={styles.meassage}>
            Kindly provide the token sent to your school email
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="School Email"
            value={vendorEmail}
            onChangeText={(text) => setVendorEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="token"
            value={token}
            onChangeText={(text) => setToken(text)}
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
            onPress={() => handleVerify()}
          >
            Submit
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ToastManager />
    </SafeAreaView>
  );
}
