import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useAppContext } from "../../context/AppContext";

const AboutScreen = ({ navigation }) => {
  const { Colors, Typograghy } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();

  const inScreenBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/7738903496";

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.primary,
      marginBottom: 16,
    },
    paragraph: {
      fontSize: 16,
      color: Colors.textPrimary,
      marginBottom: 12,
    },
    list: {
      marginBottom: 16,
    },
    listItem: {
      fontSize: 16,
      color: Colors.textPrimary,
      marginLeft: 10,
      marginBottom: 6,
    },
    note: {
      fontStyle: "italic",
      color: Colors.textSecondary,
      fontSize: 15,
      marginBottom: 24,
    },
    boldItalic: {
      fontWeight: "bold",
      fontStyle: "italic",
    },
    italic: {
      fontStyle: "italic",
    },
    button: {
      backgroundColor: Colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 12,
    },
    buttonText: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 16,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>📘 About the App</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.boldItalic}>ZikFair Business Directory</Text> is a
        student-focused platform designed to showcase and support the
        entrepreneurial spirit within <Text style={styles.italic}>UNIZIK</Text>.
        It provides a curated directory of services and businesses run by
        students, making it easy to discover, connect, and support local talents
        around campus.
      </Text>

      <Text style={styles.paragraph}>
        Whether you're a student, staff, or visitor, you can:
      </Text>

      <View style={styles.list}>
        <Text style={styles.listItem}>
          • Browse and search verified campus-based businesses
        </Text>
        <Text style={styles.listItem}>
          • View business details and contact vendors directly
        </Text>
        <Text style={styles.listItem}>
          • Stay updated with services in and around UNIZIK
        </Text>
      </View>

      <Text style={styles.note}>
        Only verified UNIZIK students can list their businesses, but everyone
        can explore and connect.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.buttonText}>🔐 View Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TermsOfUse")}
      >
        <Text style={styles.buttonText}>📄 View Terms of Use</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ContactUs")}
      >
        <Text style={styles.buttonText}>📞 Contact Us</Text>
      </TouchableOpacity>
      {adReady && (
        <BannerAd
          unitId={inScreenBannerId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: isNonPersonalized,
          }}
        />
      )}
    </ScrollView>
  );
};

export default AboutScreen;
