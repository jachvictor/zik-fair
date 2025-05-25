import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../../styles";

export default function PopUp({ message, handleNo, handleYes }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "absolute",
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    card: {
      display: "flex",
      justifyContent: "space-between",
      padding: 10,
      width: "80%",
      height: "auto",
      backgroundColor: Colors.card,
      gap: 30,
      zIndex: "10rem",
      borderWidth: 1,
      borderColor: Colors.border,
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    buttonDanger: {
      backgroundColor: Colors.danger,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      width: "fit",
      alignItems: "center",
      //   marginTop: 15,
    },
    buttonGood: {
      backgroundColor: Colors.secondary,
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      width: "fit",
      alignItems: "center",
      //   marginTop: 15,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text
          style={{
            color: Colors.textPrimary,
            display: "flex",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonDanger}
            onPress={() => handleNo()}
          >
            <Text style={Button.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGood}
            onPress={() => handleYes()}
          >
            <Text style={Button.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
