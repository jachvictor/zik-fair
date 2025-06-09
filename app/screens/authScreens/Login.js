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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { Colors, Typography } = useTheme();
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 16,
      paddingTop: 40,
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      padding: 12,
      borderColor: Colors.border,
      width: "100%",
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
      borderRadius: 10,
      borderWidth: 1,
    },
    holdInputs: {
      gap: 12,
      marginTop: 20,
      width: "100%",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    linkText: {
      color: Colors.primary,
      fontWeight: "500",
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      Toast.warn("Please enter your email");
      return;
    }
    if (!password) {
      Toast.warn("Please enter your password");
      return;
    }

    setLoading(true);
    const formData = { email, password };

    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(resData.user));
        Toast.success(resData.message);
        setTimeout(() => {
          // setLoading(false);
          navigate("tabs", { data: email });
        }, 3000);
      } else {
        // setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      // setLoading(false);
      console.error("Login error:", error);
      Toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, backgroundColor: Colors.background }}
          color={Colors.primary}
          size="large"
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <Image
            source={logo}
            style={{
              width: 160,
              height: 50,
              alignSelf: "center",
              marginBottom: 10,
            }}
            resizeMode="contain"
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Log In</Text>
            <View style={styles.holdInputs}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textSecondary}
                value={email}
                onChangeText={setEmail}
              />
              <Password
                password={password}
                setPassword={setPassword}
                placeholder="Password"
              />
              <TouchableOpacity style={Button.button} onPress={handleLogin}>
                <Text style={Button.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footer}>
              <Text style={styles.linkText} onPress={() => navigate("Signup")}>
                Signup
              </Text>
              <Text style={styles.linkText} onPress={() => navigate("Forgot")}>
                Forgot Password
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <ToastManager />
    </>
  );
}
