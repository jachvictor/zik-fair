import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { useTheme } from "../../context/ThemeContext";
import { Button, Input } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { location } from "../../data";
import { DropDown, Password } from "../../components";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";

export default function ResetPass({ route }) {
  const { data } = route.params || {};
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();

  const { navigate } = useNavigation();
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
      color: Colors.textSecondary,
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

  const [email, setEmail] = useState(data);
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleLogin = async () => {
    if (!email) {
      Toast.warn("please enter your email");
      return;
    } else if (password === "") {
      Toast.warn("please enter password");
      return;
    } else if (!(password === confirmPass)) {
      Toast.warn("confirm password does not match password");
      return;
    } else if (token === "") {
      Toast.warn("please enter token");

      return;
    }

    setLoading(true);
    const formData = {
      email,
      password,
      token,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
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
          navigate("Login", { data: email });
        }, 3000);
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during sign up", error);
      Toast.error("Error during sign up:", error);
    }
  };

  return (
    // <ScrollView style={{ width: "100%", flex: 1, height: "100vh" }}>
    <SafeAreaView style={styles.container}>
      <Image style={{ width: 160, height: 50 }} source={logo} />

      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View style={styles.holdInputs}>
          <Text style={styles.header}>Reset Password</Text>
          <Text style={styles.message}>
            Kindly provide the token sent to your email.
          </Text>
          <View style={styles.holdInputs}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="token"
              value={token}
              onChangeText={(text) => setToken(text)}
            />
            <Password
              placeholder={"New Password"}
              value={password}
              setPassword={setPassword}
            />{" "}
            <Password
              placeholder={"Confirm New Password"}
              value={confirmPass}
              setPassword={setConfirmPass}
            />
            <TouchableOpacity
              style={Button.button}
              onPress={() => handleLogin()}
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
