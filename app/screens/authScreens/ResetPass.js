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
import { Password } from "../../components";
import ToastManager, { Toast } from "toastify-react-native";

export default function ResetPass({ route }) {
  const { data } = route.params || {};
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState(data || "");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 10,
      paddingVertical: 30,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
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
      backgroundColor: Colors.card,
      borderRadius: 10,
      borderWidth: 1,
      color: Colors.textPrimary,
    },
    holdInputs: {
      width: "100%",
      gap: 10,
      marginTop: 5,
      alignItems: "center",
    },
  });

  const handleResetPassword = async () => {
    if (!email) return Toast.warn("Please enter your email");
    if (!token) return Toast.warn("Please enter token");
    if (!password) return Toast.warn("Please enter password");
    if (password !== confirmPass) return Toast.warn("Passwords do not match");

    setLoading(true);

    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, token }),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        Toast.success(resData.message);
        setTimeout(() => navigate("Login", { data: email }), 3000);
      } else {
        Toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error during reset:", error);
      Toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastManager />
      {loading ? (
        <ActivityIndicator
          style={{ backgroundColor: Colors.background, flex: 1, width: "100%" }}
          color={Colors.primary}
          size={"large"}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <Image style={{ width: 160, height: 50 }} source={logo} />
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.holdInputs}>
              <Text style={styles.header}>Reset Password</Text>
              <Text style={styles.message}>
                Kindly provide the token sent to your email.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Token"
                value={token}
                onChangeText={setToken}
              />
              <Password
                placeholder="New Password"
                value={password}
                setPassword={setPassword}
              />
              <Password
                placeholder="Confirm New Password"
                value={confirmPass}
                setPassword={setConfirmPass}
              />
              <TouchableOpacity
                style={Button.button}
                onPress={handleResetPassword}
              >
                <Text style={Button.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
