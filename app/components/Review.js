import {
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
import { Input, Button } from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";

export default function Review({ onChange, setLoading, id, handleFetch }) {
  const { Colors, Typography } = useTheme();
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
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
      color: Colors.textPrimary,
      padding: 8,
      // display: "flex",
      textAlign: "left",
      textAlignVertical: "top",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  });

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

  const handleComment = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    console.log("Fetched User2:", parsedUser);
    if (comment === "") {
      return Toast.warn("write a comment");
    } else if (rate < 1) {
      return Toast.warn("please rate this busines");
    }
    setLoading(true);
    const formData = {
      userId: parsedUser._id,
      sender: parsedUser.name,
      rating: rate,
      text: comment,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/business/add-comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      console.log("response", resData);

      if (response.ok) {
        setLoading(false);
        handleFetch();
        Toast.success(resData.message);

        // Here, extract businesses and set it to the state
        // Update this line to get the 'businesses' array
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
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
          style={styles.commentbox}
          value={comment}
          numberOfLines={4}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={Button.button} onPress={handleComment}>
          <Text style={Button.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
