import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import ToastManager, { Toast } from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyVendor({ route }) {
  const { data } = route.params || {};
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();

  const [vendorEmail, setVendorEmail] = useState(data || "");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: Colors.background,
    },
    holdHeader: {
      gap: 5,
      width: "100%",
      marginBottom: 10,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
      textAlign: "center",
    },
    message: {
      fontSize: Typography.fontSize.md,
      textAlign: "center",
      color: Colors.textSecondary,
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 10,
      color: Colors.textPrimary,
    },
    form: {
      marginTop: 20,
    },
    button: {
      backgroundColor: Colors.secondary,
      borderRadius: 5,
      padding: 12,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: Colors.white,
      fontWeight: "bold",
    },
  });

  const isUnizikEmail = (email) => {
    return email.endsWith("@stu.unizik.edu.ng");
  };

  const handleVerify = async () => {
    if (!vendorEmail) {
      return Toast.warn("Please enter your email");
    }
    if (!token) {
      return Toast.warn("Please enter the token sent to your email");
    }
    if (!isUnizikEmail(vendorEmail)) {
      return Toast.warn("This is not a valid UNIZIK email");
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/verify-vendor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vendorEmail, token }),
        }
      );

      const resData = await response.json();
      console.log("response", resData);

      if (resData.success) {
        Toast.success(resData.message);
        await AsyncStorage.setItem("user", JSON.stringify(resData.user));
        setTimeout(() => {
          navigate("AddBusiness");
        }, 3000);
      } else {
        Toast.error(resData.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      Toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastManager />

      {loading ? (
        <ActivityIndicator
          style={{
            backgroundColor: Colors.background,
            height: "100%",
            width: "100%",
          }}
          color={Colors.primary}
          size={"large"}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.holdHeader}>
              <Text style={styles.header}>Token Verification</Text>
              <Text style={styles.message}>
                Kindly provide the token sent to your school email
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="School Email"
                placeholderTextColor={Colors.textSecondary}
                value={vendorEmail}
                autoCapitalize="none"
                onChangeText={setVendorEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Token"
                placeholderTextColor={Colors.textSecondary}
                value={token}
                onChangeText={setToken}
              />

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
