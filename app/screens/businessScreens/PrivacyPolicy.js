import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const PrivacyPolicyScreen = () => {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.primary,
      marginBottom: 6,
    },
    subText: {
      fontSize: 14,
      color: Colors.textPrimary,
      marginBottom: 20,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors.textPrimary,
      marginTop: 18,
      marginBottom: 8,
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
    boldItalic: {
      fontWeight: "bold",
      fontStyle: "italic",
    },
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🔐 Privacy Policy</Text>
      <Text style={styles.subText}>Effective Date:[]</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.boldItalic}>Zikfair</Text> is committed to
        protecting your privacy. This Privacy Policy outlines how we collect,
        use, disclose, and safeguard your information when you use our mobile
        application.
      </Text>

      <Text style={styles.sectionHeader}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We may collect personal information that you voluntarily provide to us
        when registering or using the app, including:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Full Name</Text>
        <Text style={styles.listItem}>• Email Address</Text>
        <Text style={styles.listItem}>• Phone Number</Text>
        <Text style={styles.listItem}>• Physical Address</Text>
        <Text style={styles.listItem}>• Business Details (for vendors)</Text>
      </View>
      <Text style={styles.paragraph}>
        We may also collect non-personal information such as device information,
        usage data, and location data to improve our services.
      </Text>

      <Text style={styles.sectionHeader}>2. Use of Your Information</Text>
      <Text style={styles.paragraph}>We use the collected information to:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Create and manage user accounts</Text>
        <Text style={styles.listItem}>
          • Verify UNIZIK student status for vendors
        </Text>
        <Text style={styles.listItem}>• Display business listings</Text>
        <Text style={styles.listItem}>
          • Facilitate communication between users and vendors
        </Text>
        <Text style={styles.listItem}>
          • Improve app functionality and user experience
        </Text>
        <Text style={styles.listItem}>
          • Send administrative information and updates
        </Text>
      </View>

      <Text style={styles.sectionHeader}>3. Sharing Your Information</Text>
      <Text style={styles.paragraph}>
        We do not sell or rent your personal information to third parties. We
        may share your information with:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • Service providers who perform services on our behalf
        </Text>
        <Text style={styles.listItem}>
          • Law enforcement or regulatory agencies if required by law
        </Text>
      </View>

      <Text style={styles.sectionHeader}>4. Data Security</Text>
      <Text style={styles.paragraph}>
        We implement appropriate technical and organizational measures to
        protect your personal information. However, no electronic transmission
        or storage is completely secure.
      </Text>

      <Text style={styles.sectionHeader}>5. Your Rights</Text>
      <Text style={styles.paragraph}>You have the right to:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • Access the personal information we hold about you
        </Text>
        <Text style={styles.listItem}>
          • Request correction of any inaccuracies
        </Text>
        <Text style={styles.listItem}>
          • Request deletion of your personal information
        </Text>
        <Text style={styles.listItem}>
          • Withdraw consent for data processing
        </Text>
      </View>
      <Text style={styles.paragraph}>
        To exercise these rights, please contact us at [zikhub@gmail.com].
      </Text>

      <Text style={styles.sectionHeader}>6. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by updating the "Effective Date" at the top of this
        policy.
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
