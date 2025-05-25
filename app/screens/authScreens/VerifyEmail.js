import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import { Button, Input } from "../../styles";
import { useAppContext } from "../../context/AppContext";

export default function VerifyEmail({ route }) {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      paddingHorizontal: 10,
      paddingVertical: 30,
      // gap: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors.primary,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.white,
      margin: 10,
    },
    message: {
      fontSize: Typography.fontSize.md,
      color: "silver",
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      width: "100%",
      backgroundColor: Colors.white,
      borderRadius: 10,
      borderWidth: 1,
    },
    holdInputs: {
      display: "flex",
      width: "100%",
      gap: 10,
      marginTop: 5,
      // padding: 10,
      // backgroundColor: Colors.card,
      borderRadius: 5,
      alignItems: "center",
    },
    holdSamples: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 5,
      padding: 5,
      borderRadius: 5,
      backgroundColor: Colors.card,
    },
  });

  const { navigate } = useNavigation();
  const { data } = route.params;
  const [token, setToken] = useState();
  const [email, setEmail] = useState(data);
  const handleVerify = async () => {
    navigate("tabs", { data: email });
    if (email === "") {
      Toast.warn("please enter your email");
      return;
    } else if (token === "") {
      Toast.warn("please enter the token sent to you email");

      return;
    }
    setLoading(true);
    const formData = {
      email,
      token,
    };
    // console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();
      console.log("respone", resData);

      if (resData.success) {
        setLoading(false);
        Toast.success(resData.message);
        setTimeout(() => {
          navigate("tabs", { data: email });
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
      <Image
        style={{ display: "flex", width: 160, height: 50 }}
        source={logo}
      />

      <ScrollView
        style={{ width: "100%", flex: 1, display: "flex", gap: 5 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.holdInputs}>
          <Text style={styles.header}>Email Verification</Text>
          <Text style={styles.message}>
            Kindly provide the token sent to your school email
          </Text>
          <View style={styles.holdInputs}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={token}
              onChangeText={(text) => setToken(text)}
              placeholder="Token"
            />
            <TouchableOpacity
              style={Button.button}
              onPress={() => handleVerify()}
            >
              <Text style={Button.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ToastManager />
    </SafeAreaView>
  );
}
