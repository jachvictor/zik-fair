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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { location as locationList } from "../../data";
import { DropDown, Password } from "../../components";
import ToastManager, { Toast } from "toastify-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const { Colors, Typography } = useTheme();
  const { navigate } = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (name.length < 3)
      return Toast.warn("Name must be at least 3 characters");
    if (!email.includes("@")) return Toast.warn("Enter a valid email address");
    if (password.length < 8)
      return Toast.warn("Password must be at least 8 characters");
    if (password !== confirmPass) return Toast.warn("Passwords do not match");
    if (!address) return Toast.warn("Please enter your address");
    if (!location) return Toast.warn("Select a location");

    setLoading(true);

    const formData = { name, email, password, address, location };

    try {
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        // setLoading(false);
        Toast.success(resData.message);
        setTimeout(() => {
          navigate("VerifyEmail", { data: email });
        }, 3000);
      } else {
        // setLoading(false);
        Toast.error(resData.message || "Signup failed");
      }
    } catch (error) {
      // setLoading(false);
      Toast.error("Network error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
      // paddingVertical: 20,
    },
    logo: {
      width: 150,
      height: 45,
      alignSelf: "center",
      marginBottom: 20,
      marginTop: 10,
      resizeMode: "contain",
    },
    header: {
      fontSize: Typography.fontSize.xl,
      fontFamily: Typography.fontFamily.bold,
      color: Colors.textPrimary,
      textAlign: "center",
      marginBottom: 6,
    },
    subText: {
      fontSize: Typography.fontSize.sm,
      color: Colors.textSecondary,
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      backgroundColor: Colors.card,
      borderColor: Colors.border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 12,
      width: "100%",
      color: Colors.textPrimary,
    },
    buttonContainer: {
      marginTop: 20,
      width: "100%",
    },
    bottomLinks: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 25,
      paddingHorizontal: 5,
    },
    link: {
      color: Colors.primary,
      fontSize: Typography.fontSize.sm,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {loading ? (
          <ActivityIndicator
            style={{ flex: 1, backgroundColor: Colors.background }}
            color={Colors.primary}
            size="large"
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.header}>Create Your Account</Text>
            <Text style={styles.subText}>
              Join ZikFair and grow your hustle!
            </Text>

            <View style={{ gap: 12 }}>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                placeholderTextColor={Colors.textSecondary}
                value={name}
                onChangeText={setName}
              />
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
              <Password
                password={confirmPass}
                setPassword={setConfirmPass}
                placeholder="Confirm Password"
              />
              <TextInput
                style={styles.input}
                placeholder="Address (e.g. School Lodge)"
                placeholderTextColor={Colors.textSecondary}
                value={address}
                onChangeText={setAddress}
              />
              <DropDown
                array={locationList}
                header="Select Your Location"
                selected={location}
                setSelected={setLocation}
                background={Colors.card}
                textColor={Colors.textPrimary}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleRegister}
                style={[Button.button, { opacity: loading ? 0.6 : 1 }]}
                disabled={loading}
              >
                <Text style={Button.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomLinks}>
              <Text style={styles.link} onPress={() => navigate("Login")}>
                Already have an account?
              </Text>
              <Text
                style={styles.link}
                onPress={() => navigate("VerifyEmail", { data: "" })}
              >
                Verify Email
              </Text>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      <ToastManager />
    </SafeAreaView>
  );
}
