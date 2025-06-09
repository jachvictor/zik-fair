import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

export default function ForgotPass() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 30,
      alignItems: "center",
      backgroundColor: Colors.background, // fallback
    },
    scrollView: {
      width: "100%",
      flex: 1,
    },
    logo: {
      width: 160,
      height: 50,
      resizeMode: "contain",
      marginBottom: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.textPrimary,
      marginBottom: 10,
    },
    message: {
      fontSize: 14,
      color: Colors.textSecondary,
      marginBottom: 20,
    },
    holdInputs: {
      width: "100%",
      gap: 10,
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: Colors.card,

      borderColor: Colors.border,
      color: Colors.textPrimary,
    },
    resetLink: {
      marginTop: 30,
      alignItems: "center",
      color: Colors.primary,
    },
    resetText: {
      // borderBottomWidth: 1,
      // borderColor: "#000",
      // color: "#000",
      fontSize: 14,
      color: Colors.primary,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.background,
    },
  });

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    if (!email) {
      Toast.warn("Please enter your email");
      return;
    }
    if (!email.includes("@")) {
      Toast.warn("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const resData = await response.json();

      if (response.ok) {
        Toast.success(resData.message);
        setTimeout(() => navigate("Reset", { data: email }), 3000);
      } else {
        Toast.error(resData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator style={styles.loader} color={Colors.primary} />
      ) : (
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={logo} />

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.holdInputs}>
              <Text style={styles.header}>Forgot Password</Text>
              <Text style={styles.message}>
                A token will be sent to your email to proceed with resetting
                your password.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textSecondary}
                value={email}
                onChangeText={setEmail}
              />

              <TouchableOpacity style={Button.button} onPress={handleForgot}>
                <Text style={Button.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.resetLink}>
              <Text style={styles.resetText} onPress={() => navigate("Reset")}>
                Already have a token? Reset password
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <ToastManager />
    </>
  );
}
