import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import ui from "../../../assets/interface.png";
import accurate1 from "../../../assets/accurate1.png";
import accurate2 from "../../../assets/accurate2.png";
import mobile1 from "../../../assets/mobile1.png";
import mobile2 from "../../../assets/mobile2.png";
import tool1 from "../../../assets/tools1.png";
import review from "../../../assets/review.png";
import options from "../../../assets/options.png";
import back from "../../../assets/back.gif";
import { useTheme } from "../../context/ThemeContext";

export default function HomeCarousel() {
  const { Colors, Typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 16,
      fontFamily: "outfit",
    },
    flatList: { display: "flex", width: "100%" },
    header: {
      display: "flex",
      textAlign: "center",
      // fontSize: "large",
      padding: 10,
    },
    imageBack: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 300,
      marginHorizontal: 10,
      padding: 5,
      backgroundColor: Colors.card,
      borderColor: Colors.border,
      borderRadius: 10,
    },
    calImg: { width: "50%", height: 160 },
    calDetail: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
      padding: 5,
      // backgroundColor: "red",
    },
    detailHead: {
      display: "flex",
      textAlign: "left",
      fontSize: 15,
      fontWeight: "bold",
      width: "100%",
      color: Colors.textPrimary,
    },
    detailQoute: {
      display: "flex",
      fontSize: 10,
      width: "100%",
      color: Colors.textSecondary,
      textAlign: "left",
    },
  });
  const data = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const CarouselImgR = ({ source, quote, head }) => {
    return (
      <ImageBackground style={styles.imageBack}>
        <View style={styles.calDetail}>
          <Text style={styles.detailHead}>{head}</Text>
          <Text style={styles.detailQoute}>{quote}</Text>
        </View>
        <Image style={styles.calImg} source={source} />
      </ImageBackground>
    );
  };
  const CarouselImgL = ({ source, quote, head }) => {
    return (
      <ImageBackground style={styles.imageBack}>
        <Image style={styles.calImg} source={source} />
        <View style={styles.calDetail}>
          <Text style={styles.detailHead}>{head}</Text>
          <Text style={styles.detailQoute}>{quote}</Text>
        </View>
      </ImageBackground>
    );
  };
  const renderItem = ({ item }) => {
    // Customize the structure based on item properties
    if (item === "1") {
      return (
        <CarouselImgL
          source={ui}
          head={"User-Friendly Interface"}
          quote={
            "A clean, intuitive design makes it easier for potential customers to navigate and find what they're looking for."
          }
        />
      );
    } else if (item === "2") {
      return (
        <CarouselImgR
          source={accurate1}
          head={"Accuracy"}
          quote={
            "Provide accurate and complete information about businesses, including contact information, location, and hours. "
          }
        />
      );
    } else if (item === "3") {
      return <CarouselImgL source={accurate2} />;
    } else if (item === "4") {
      return (
        <CarouselImgR
          source={review}
          head={"Review Management"}
          quote={
            "consumer decisions, so a directory that allows customers to leave feedback is invaluable."
          }
        />
      );
    } else if (item === "5") {
      return (
        <CarouselImgR
          source={mobile1}
          head={"Mobile Optimization"}
          quote={"Listing is accessible and looks good on any device,"}
        />
      );
    } else if (item === "6") {
      return <CarouselImgL source={mobile2} />;
    } else if (item === "8") {
      return (
        <CarouselImgR
          source={tool1}
          head={"Analytics Tools"}
          quote={
            "analytics tools are essential for tracking the performance of your listing."
          }
        />
      );
    } else {
      return (
        <View style={styles.defaultContainer}>
          <Text style={styles.defaultText}>{item.name}</Text>
          {/* Default styling/content */}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}></Text>
      <FlatList
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}
