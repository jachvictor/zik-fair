import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import { Button } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyEmail({ route }) {
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();
  const { data } = route.params;
  const [token, setToken] = useState("");
  const [email, setEmail] = useState(data || "");
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    logo: {
      width: 160,
      height: 50,
      alignSelf: "center",
      marginBottom: 20,
    },
    scroll: {
      flex: 1,
      width: "100%",
    },
    header: {
      fontSize: Typography.fontSize.xl,
      fontWeight: "bold",
      color: Colors.textPrimary,
      textAlign: "center",
      marginBottom: 10,
    },
    message: {
      fontSize: Typography.fontSize.md,
      color: Colors.textSecondary,
      textAlign: "center",
      marginBottom: 25,
    },
    input: {
      padding: 12,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 15,
    },
    buttonWrapper: {
      marginTop: 10,
      alignItems: "center",
    },
  });

  const handleVerify = async () => {
    // navigate("tabs", { data: email });

    if (!email) {
      Toast.warn("Please enter your email");
      return;
    } else if (!token) {
      Toast.warn("Please enter the token sent to your email");
      return;
    }

    setLoading(true);

    const formData = { email, token };

    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      console.log("response", resData);

      if (resData.success) {
        await AsyncStorage.setItem("user", JSON.stringify(resData.user));
        Toast.success(resData.message);
        setTimeout(() => {
          navigate("tabs", { data: email });
        }, 3000);
      } else {
        Toast.error(resData.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      Toast.error("An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{
            flex: 1,
            backgroundColor: Colors.background,
            justifyContent: "center",
          }}
          color={Colors.primary}
          size="large"
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Email Verification</Text>
            <Text style={styles.message}>
              Kindly enter the token sent to your email.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Token"
              placeholderTextColor={Colors.textSecondary}
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
            />

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={Button.button} onPress={handleVerify}>
                <Text style={Button.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <ToastManager />
    </>
  );
}
