import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import loading from "../../../assets/loading.gif";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={loading} /> */}

      <LottieView
        source={require("../../../assets/Animation - 1745700896382.json")} // Use your downloaded animation
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
});
