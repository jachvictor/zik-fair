import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const TermsOfUseScreen = () => {
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
      <Text style={styles.header}>📄 Terms of Use</Text>
      <Text style={styles.subText}>Effective Date: []</Text>

      <Text style={styles.paragraph}>
        These Terms of Use govern your access to and use of the{" "}
        <Text style={styles.boldItalic}>Zikfair Business Directory</Text> mobile
        application. By accessing or using the App, you agree to be bound by
        these Terms.
      </Text>

      <Text style={styles.sectionHeader}>1. Eligibility</Text>
      <Text style={styles.paragraph}>
        There is no age limit in accessing Zikfair. Only verified UNIZIK
        students are permitted to upload and manage business listings.
      </Text>

      <Text style={styles.sectionHeader}>2. User Accounts</Text>
      <Text style={styles.paragraph}>
        To access certain features, you may be required to create an account.
        You agree to provide accurate and complete information and to keep this
        information up to date.
      </Text>

      <Text style={styles.sectionHeader}>3. User-Generated Content</Text>
      <Text style={styles.paragraph}>
        By submitting business listings or other content:
      </Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • You retain ownership of your content.
        </Text>
        <Text style={styles.listItem}>
          • You grant us a non-exclusive, royalty-free license to use, display,
          and distribute your content within the App.
        </Text>
        <Text style={styles.listItem}>
          • You are responsible for ensuring that your content does not violate
          any laws or infringe on any third-party rights.
        </Text>
      </View>
      <Text style={styles.paragraph}>
        We reserve the right to remove any content that violates these Terms or
        is deemed inappropriate.
      </Text>

      <Text style={styles.sectionHeader}>4. Prohibited Conduct</Text>
      <Text style={styles.paragraph}>You agree not to:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>
          • Use the App for any unlawful purpose
        </Text>
        <Text style={styles.listItem}>• Impersonate any person or entity</Text>
        <Text style={styles.listItem}>
          • Upload false or misleading information
        </Text>
        <Text style={styles.listItem}>
          • Interfere with the operation of the App
        </Text>
      </View>

      <Text style={styles.sectionHeader}>5. Termination</Text>
      <Text style={styles.paragraph}>
        We reserve the right to suspend or terminate your access to the App at
        our discretion, without notice, for conduct that violates these Terms.
      </Text>

      <Text style={styles.sectionHeader}>6. Disclaimers</Text>
      <Text style={styles.paragraph}>
        The App is provided "as is" without warranties of any kind. We do not
        guarantee the accuracy or reliability of any content provided by users.
      </Text>

      <Text style={styles.sectionHeader}>7. Limitation of Liability</Text>
      <Text style={styles.paragraph}>
        We shall not be liable for any indirect, incidental, or consequential
        damages arising out of your use of the App.
      </Text>

      <Text style={styles.sectionHeader}>8. Governing Law</Text>
      <Text style={styles.paragraph}>
        These Terms shall be governed by and construed in accordance with the
        laws of [Insert Jurisdiction].
      </Text>
    </ScrollView>
  );
};

export default TermsOfUseScreen;
