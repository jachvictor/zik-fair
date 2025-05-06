import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../../context/ThemeContext";
export default function Settings() {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
      padding: 10,
      backgroundColor: Colors.background,
      color: Colors.textPrimary,
    },
    card: {
      display: "flex",
      alignItems: "center",
      //   justifyContent: "center",
      flexDirection: "row",
      borderRadius: 5,
      padding: 10,
      gap: 15,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
    },
    text: {
      color: Colors.textPrimary,
    },
  });
  const { toggleTheme, mode } = useTheme(); // access toggleTheme and mode from context
  const handleToggle = () => {
    try {
      toggleTheme();
      console.log("ggggggg");
    } catch (error) {
      console.error("error theme:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color="blue"
          />
          <Text style={styles.text}>Theme</Text>
          <View>
            {mode === "light" ? (
              <Feather
                name="sun"
                size={24}
                color="yellow"
                onPress={handleToggle}
              />
            ) : (
              <Feather
                name="moon"
                size={24}
                color="gray"
                onPress={handleToggle}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Entypo name="share" size={24} color="green" />
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <AntDesign name="questioncircleo" size={24} color="yellow" />
          <Text style={styles.text}>About App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <AntDesign name="deleteuser" size={24} color={Colors.danger} />
          <Text onPress={() => console.log("wroking")} style={styles.text}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
