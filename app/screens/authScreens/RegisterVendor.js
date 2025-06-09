import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../styles";

export default function RegisterVendor() {
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [vendorEmail, setVendorEmail] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      padding: 10,
      gap: 10,
      backgroundColor: Colors.background,
    },
    holdHeader: {
      gap: 5,
      width: "100%",
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
      color: "silver",
      color: Colors.textSecondary,
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
      borderRadius: 10,
      borderWidth: 1,
      color: Colors.textPrimary,
    },
    form: {
      width: "100%",
      gap: 5,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    submitButton: {
      backgroundColor: Colors.secondary,
      borderRadius: 5,
      padding: 10,
      width: "100%",
      marginVertical: 10,
      alignItems: "center",
    },
    tokenRedirect: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
  });

  const isUnizikEmail = (email) => {
    return email.endsWith("@stu.unizik.edu.ng");
  };

  const handleRegister = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const user = storedData ? JSON.parse(storedData) : {};

    if (!user.email) {
      Toast.warn("An error occurred, please log out and login again");
      return;
    } else if (!vendorEmail) {
      Toast.warn("Please input your school email");
      return;
    } else if (!isUnizikEmail(vendorEmail)) {
      Toast.warn("This is not a UNIZIK email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/register-vendor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, vendorEmail }),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        Toast.success(resData.message);
        setTimeout(() => {
          // setLoading(false);
          navigate("VerifyVendor", { data: vendorEmail });
        }, 3000);
      } else {
        // setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      // setLoading(false);
      console.error("Error:", error);
      Toast.error("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{
            backgroundColor: Colors.background,
            height: "100%",
            width: "100%",
          }}
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.holdHeader}>
              <Text style={styles.header}>Vendor Verification</Text>
              <Text style={styles.message}>
                Only Nnamdi Azikiwe (UNIZIK) students are allowed to exhibit
                their products on this platform. Kindly provide your school
                email for verification.
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={vendorEmail}
                placeholder="UNIZIK School Email"
                placeholderTextColor={Colors.textSecondary}
                onChangeText={setVendorEmail}
              />

              <TouchableOpacity style={Button.button} onPress={handleRegister}>
                <Text style={Button.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            <Pressable
              style={styles.tokenRedirect}
              onPress={() => navigate("VerifyVendor")}
            >
              <Text style={{ color: Colors.primary }}>
                Already gotten token?
              </Text>
              <Text style={{ color: Colors.primary }}>{">"}</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      )}
      <ToastManager />
    </>
  );
}
