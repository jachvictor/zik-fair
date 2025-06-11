import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
// import { Colors, Typography, Spacing } from "../../styles";
import { useTheme } from "../../context/ThemeContext";

export default function Carousel({ data, renderItem, head }) {
  const { Colors, Typography } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      // backgroundColor: Colors.background,
    },
    flatList: { display: "flex", width: "100%" },
    header: {
      display: "flex",
      textAlign: "left",
      // fontSize: "large",
      padding: 5,
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{head}</Text>
      <FlatList
        style={styles.flatList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
