import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ButtonComponent } from "../components";
import { useTheme } from "../context/ThemeContext";
import { Input } from "../styles";

export default function Review({ comment, submit, onChange }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      // flex: 1,
      width: "100%",
      height: "auto",
      padding: 10,
      gap: 10,
      backgroundColor: Colors.card,
      borderRadius: 10,
      marginVertical: 15,
    },
    header: {
      fontSize: 30,
      fontWeight: "500",
      color: Colors.textPrimary,
    },
    rate: {
      display: "flex",
      alignItems: "center",
      // justifyContent: "center",
      flexDirection: "row",
      padding: 8,
      gap: 8,
    },
    rateSection: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 5,
    },
    comment: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    commentbox: {
      width: "100%",
      // height: 100,
      borderRadius: 10,
      borderColor: "silver",
      borderWidth: 2,
      padding: 8,
      // display: "flex",
      textAlign: "left",
      textAlignVertical: "top",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  });

  const [rate, setRate] = useState(0);
  const handleIncrease = () => {
    if (rate <= 4) {
      setRate(rate + 1);
    }
  };

  const handleDecrease = () => {
    if (!(rate < 1)) {
      setRate(rate - 1);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: Typography.fontSize.lg,
          fontWeight: "bold",
          color: Colors.textPrimary,
        }}
      >
        Rate This Business
      </Text>
      <View style={styles.rate}>
        <AntDesign name="star" color={"gold"} size={24} />
        <View style={styles.rateSection}>
          <AntDesign
            onPress={() => handleDecrease()}
            name="leftcircleo"
            size={20}
            color={Colors.textPrimary}
          />

          <Text style={{ color: Colors.textPrimary }}>{rate}</Text>

          <AntDesign
            onPress={() => handleIncrease()}
            name="rightcircleo"
            size={20}
            color={Colors.textPrimary}
          />
        </View>
      </View>
      <View style={styles.comment}>
        <TextInput
          multiline
          style={Input}
          value={comment}
          numberOfLines={4}
          onChange={onChange}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.secondary,
            color: Colors.white,
            borderRadius: 5,
            padding: 10,
            width: "100%",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Submit
        </TouchableOpacity>
      </View>
    </View>
  );
}
