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
import { Input } from "../../styles";
import { useAppContext } from "../../context/AppContext";

export default function VerifyEmail({ route }) {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      width: "100%",
      padding: 10,
      gap: 10,
    },
    holdHeader: {
      display: "flex",
      gap: 5,
      width: "100%",
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
      textAlign: "center",
    },
    meassage: {
      fontSize: Typography.fontSize.md,
      textAlign: "center",
      color: Colors.textSecondary,
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

      // if (resData.success) {
      if (true) {
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
      <ScrollView style={styles.container}>
        <View style={styles.holdHeader}>
          <Text style={styles.header}>Email Verification</Text>
          <Text style={styles.meassage}>
            Kindly provide the token sent to your school email
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
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
