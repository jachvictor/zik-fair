import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
// import { ActivityIndicator } from "react-native-web";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from "react-native-google-mobile-ads";

const ContactUsScreen = () => {
  const { Colors } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: Colors.background,
      flexGrow: 1,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.primary,
      marginBottom: 20,
    },
    text: {
      fontSize: 16,
      color: Colors.textPrimary,
      marginBottom: 12,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginTop: 14,
      marginBottom: 4,
      color: Colors.textPrimary,
    },
    link: {
      fontSize: 16,
      color: Colors.textPrimary,
      textDecorationLine: "underline",
    },
    divider: {
      borderBottomColor: "#D1D5DB",
      borderBottomWidth: 1,
      marginVertical: 25,
    },
    formHeader: {
      fontSize: 20,
      fontWeight: "700",
      color: Colors.textPrimary,
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: "#D1D5DB",
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      marginBottom: 16,
      color: Colors.textPrimary,
    },
    textArea: {
      height: 120,
      color: Colors.textPrimary,
    },
    button: {
      backgroundColor: Colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
      marginBottom: 30,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  const handleEmailPress = () =>
    Linking.openURL("mailto:zikfair.project@gmail.com");
  const handlePhonePress = () => Linking.openURL("tel:+2347018647050");

  const formInterstitialId = __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-7487058490506362/3983621192";
  const interstitial = InterstitialAd.createForAdRequest(formInterstitialId, {
    requestNonPersonalizedAdsOnly: isNonPersonalized,
  });

  const inScreenBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/7738903496";

  const showInterstitialAd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );

    interstitial.load();

    // Optional: Handle ad errors
    interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.warn("Interstitial ad failed to load:", error);
    });

    return () => unsubscribe();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Toast.warn("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://zikfair.onrender.com/api/auth/contact-us",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        Toast.error("Error", data.error || "Something went wrong");
        showInterstitialAd(); // Show ad on failure
        return;
      }

      Toast.success("Success", data.message);
      setName("");
      setEmail("");
      setMessage("");
      showInterstitialAd(); // Show ad on success
    } catch (error) {
      Toast.error("Error", "Failed to send message.");
      showInterstitialAd(); // Show ad on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={100}
          >
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.header}>📬 Contact Us</Text>
              <Text style={styles.text}>
                Have questions, feedback, or issues? We'd love to hear from you!
              </Text>

              <Text style={styles.label}>Email:</Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.link}>unilink.support@zikfair.com</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Phone:</Text>
              <TouchableOpacity onPress={handlePhonePress}>
                <Text style={styles.link}>+234 800 123 4567</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Location:</Text>
              <Text style={styles.text}>
                Nnamdi Azikiwe University, Awka, Nigeria
              </Text>

              <View style={styles.divider} />

              <Text style={styles.formHeader}>Send us a message</Text>

              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor={Colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Write your message here..."
                placeholderTextColor={Colors.textSecondary}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Message</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>

          {adReady && (
            <BannerAd
              unitId={inScreenBannerId}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: isNonPersonalized,
              }}
            />
          )}
        </>
      )}

      <ToastManager />
    </View>
  );
};

export default ContactUsScreen;
