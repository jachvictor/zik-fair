import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather"; //phone
import FontAwesome from "@expo/vector-icons/FontAwesome"; //Whatsapp
//facbook
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"; //web
import AntDesign from "@expo/vector-icons/AntDesign"; //twitter
import image from "../../../assets/ece.png";
import {
  Carousel,
  Review,
  Comments,
  ErrorScreen,
  PopUp,
} from "../../components";
import { useTheme } from "../../context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { Linking } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const convertToInternational = (localNumber) => {
  if (localNumber.startsWith("0")) {
    return "234" + localNumber.slice(1);
  }
  return localNumber;
};

export default function ProductDetail({ route }) {
  const { id } = route.params || {};
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized, adReady } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [business, setBusiness] = useState({});
  const [userComment, setUserComment] = useState(null);
  const [comment, setComment] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [targetComment, setTargetComment] = useState({});
  const [rating, setRating] = useState(0);

  const showConfirm = (commentId, businessId) => {
    setTargetComment({ commentId, businessId });
    setIsPopup(true);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      // padding: 15,
      width: "100%",

      backgroundColor: Colors.card,

      color: Colors.textPrimary,
    },
    productImage: {
      width: "100%",
      height: 340,
      // flex: 1,
    },
    productContent: {
      height: "auto",
      borderRadius: 20,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
    },
    iconList: {
      display: "flex",
      flexDirection: "row",
      gap: 16,
    },
    icon: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      margin: 10,
    },
    scroll: {
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    name: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
    address: {
      fontSize: Typography.fontSize.md,
      color: Colors.textSecondary,
    },
    holdName: {
      display: "flex",
      padding: 16,
      gap: 10,
    },
    holdRating: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 16,
      // gap: 10,
    },
    about: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: 16,
    },
    sampleImage: {
      borderRadius: 10,
      height: 150,
      width: 150,
      margin: 10,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    rating: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
      fontSize: Typography.fontSize.lg,
    },
    header: {
      display: "flex",
      textAlign: "left",
      // fontSize: "large",
      padding: 5,
      fontSize: Typography.fontSize.xl,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
  });

  const data = [
    {
      id: "1",
      title: "Phone",
      icon: "phone",
      color: "green",
      data: business.phone,
    },
    {
      id: "2",
      title: "WhatsApp",
      icon: "whatsapp",
      color: "blue",
      data: business.whatsapp,
    },
    {
      id: "3",
      title: "Facebook",
      icon: "facebook",
      color: "yellow",
      data: business.facebook,
    },
    {
      id: "4",
      title: "Web",
      icon: "web",
      color: "red",
      data: business.website,
    },
    {
      id: "5",
      title: "X-Twitter",
      icon: "x-twitter",
      color: "orange",
      data: business.twitter,
    },
  ];

  const businessActionReducer = (state, action) => {
    const showError = (msg) => Toast.warn(msg);

    switch (action.type) {
      case "Phone":
        console.log("woeking", action.type);
        Toast.info("working");
        if (!action.payload) return showError("Phone number not available");
        Linking.openURL(`tel:${action.payload}`);
        return state;

      case "WhatsApp":
        if (!action.payload) return showError("WhatsApp number not available");
        const formatted = convertToInternational(action.payload);
        Linking.openURL(`https://wa.me/${formatted}`);
        return state;

      case "Facebook":
        if (!action.payload) return showError("Facebook link not available");
        Linking.openURL(action.payload);
        return state;

      case "X-Twitter":
        if (!action.payload) return showError("Twitter link not available");
        Linking.openURL(action.payload);
        return state;

      case "Web":
        if (!action.payload) return showError("Website link not available");
        Linking.openURL(action.payload);
        return state;

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(businessActionReducer, {});

  const data2 = [image, image, image, image];
  const renderIcon = (name, size = 24) => {
    switch (name) {
      case "phone":
        return <AntDesign name={name} size={size} color={"white"} />;
      case "whatsapp":
        return <FontAwesome name={name} size={size} color={"white"} />;
      case "facebook":
        return <FontAwesome name={name} size={size} color={"white"} />;
      case "web":
        return (
          <MaterialCommunityIcons size={size} name={name} color={"white"} />
        );
      case "x-twitter":
        return <FontAwesome6 name={name} size={size} color="white" />;
      // <AntDesign name={name} size={size} color={"white"} />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.icon}
        onPress={() => dispatch({ type: item.title, payload: item.data })}
      >
        <View
          style={{
            backgroundColor: item.color,
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        >
          {renderIcon(item.icon)}
        </View>
        <Text style={{ color: Colors.textPrimary }}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({ item }) => {
    return <Image style={styles.sampleImage} source={{ uri: item.url }} />;
  };

  const calculateAverageRating = (comments = []) => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    return (total / comments.length).toFixed(1); // e.g., "4.3"
  };

  const handleDeleteComment = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    // console.log("Fetched User2:", parsedUser);
    setIsPopup(false);
    setLoading(true);

    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/delete-comment`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...targetComment,
            userId: parsedUser._id,
          }),
        }
      );
      const resData = await response.json();
      // console.log("business", resData);

      if (response.ok) {
        Toast.success(resData.message);
        handleFetch();
      } else {
        Toast.error(resData.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
    } finally {
      setLoading(false);
    }
  };
  // const destroy = "";
  const handleFetch = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    // console.log("Fetched User2:", parsedUser);
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/${id}`
      );
      const resData = await response.json();
      // console.log("business", resData);

      if (response.ok) {
        setError(false);
        setBusiness(resData.business); // 👈 corrected here
        // setBusiness(processBusinesses(resData.business));
        const avgRating = calculateAverageRating(resData.business.comments);
        setRating(avgRating);
        const comm = resData.business.comments.filter(
          (item) => item.user !== parsedUser._id
        );
        const userComm = resData.business.comments.filter(
          (item) => item.user === parsedUser._id
        );

        setUserComment(userComm);
        setComment(comm);
        const count = await AsyncStorage.getItem("adCount");
        console.log("adcount", count);
        await AsyncStorage.setItem("adCount", (parseInt(count) + 1).toString());
        Toast.success(resData.message);
      } else {
        setError(true);
        Toast.error(resData.message);
      }
    } catch (error) {
      setError(true);
      console.error("Error during fetch:", error);
      Toast.error("Error during fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
    // if (id) handleFetch();
  }, []); // 👈 include id in dependencies

  const renderComments = ({ item }) => {
    return <Comments user={false} comments={item} />;
  };
  const renderUserComment = ({ item }) => {
    return (
      <View>
        <Comments user={true} comments={item} />
        <View style={{ paddingLeft: 40, paddingVertical: 10 }}>
          <AntDesign
            name="delete"
            size={20}
            color={Colors.textPrimary}
            onPress={() => showConfirm(item._id, business._id)}
          />
        </View>
      </View>
    );
  };
  const handleAddToFav = async (id) => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};

    setLoading(true);
    const formData = {
      userId: parsedUser._id,
      businessId: id,
    };
    try {
      const response = await fetch(
        `https://zikfair.onrender.com/api/business/add-favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      // console.log("response", resData);

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
    } finally {
      setLoading(false);
    }
  };
  const inScreenInterstitialId = __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-7487058490506362/2604543614";

  const inScreenBannerId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-7487058490506362/7738903496";

  const interstitial = InterstitialAd.createForAdRequest(
    inScreenInterstitialId,
    {
      requestNonPersonalizedAdsOnly: isNonPersonalized,
    }
  );

  useEffect(() => {
    const showAdIfNeeded = async () => {
      try {
        const count = await AsyncStorage.getItem("adCount");
        const newCount = parseInt(count);
        console.log("adcount2", newCount);

        await AsyncStorage.setItem("adCount", newCount.toString());

        // Show ad only every 5th time
        if (newCount % 3 === 0) {
          interstitial.load();
        }
      } catch (error) {
        console.error("Error checking ad count:", error);
      }
    };

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => interstitial.show()
    );

    showAdIfNeeded();

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          {error ? (
            <ErrorScreen handleFetch={handleFetch} />
          ) : (
            <ScrollView style={styles.scroll}>
              <Image
                style={styles.productImage}
                source={
                  business?.coverImage?.url
                    ? { uri: business.coverImage.url }
                    : image // your local fallback image
                }
              />
              <View
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginTop: -60,
                  padding: 10,
                }}
              >
                <Ionicons
                  size={24}
                  color={Colors.secondary}
                  onPress={() => handleAddToFav(business._id)}
                  name="heart"
                />
              </View>
              <View style={styles.productContent}>
                <View style={styles.holdName}>
                  <Text style={styles.name}>{business.name}</Text>
                  <Text style={styles.address}>
                    {business.location == "others"
                      ? business.address
                      : business.location}
                  </Text>
                </View>
                <View style={styles.holdRating}>
                  <View style={styles.rating}>
                    <AntDesign name="star" size={24} color="gold" />
                    <Text style={{ color: Colors.textPrimary }}>{rating}</Text>
                  </View>

                  <Text
                    style={{
                      fontSize: Typography.fontSize.lg,
                      color: Colors.textPrimary,
                    }}
                  >
                    {business.category}
                  </Text>
                </View>

                <Carousel
                  head={"Business Details >"}
                  data={data}
                  renderItem={renderItem}
                />
                <View style={styles.about}>
                  <Text
                    style={{
                      fontSize: Typography.fontSize.lg,
                      fontWeight: "bold",
                      textAlign: "left",
                      width: "100%",
                      color: Colors.textPrimary,
                    }}
                  >
                    About
                  </Text>
                  <Text
                    style={{
                      color: Colors.textPrimary,
                      fontFamily: Typography.fontFamily.regular,
                    }}
                  >
                    {business.about}
                  </Text>
                </View>

                <Carousel
                  data={
                    business?.sampleImages?.length > 0
                      ? business.sampleImages
                      : data2 // fallback data
                  }
                  renderItem={renderItem2}
                  head={"Samples"}
                />
                {adReady && (
                  <BannerAd
                    unitId={inScreenBannerId}
                    size={BannerAdSize.MEDIUM_RECTANGLE}
                    requestOptions={{
                      requestNonPersonalizedAdsOnly: isNonPersonalized,
                    }}
                  />
                )}
              </View>
              {userComment?.length < 1 && (
                <Review
                  setLoading={setLoading}
                  id={business._id}
                  handleFetch={handleFetch}
                />
              )}
              <View style={{ padding: 10 }}>
                <Text style={styles.header}>Comments</Text>
                {business.comments?.length < 1 ? (
                  <Text style={styles.address}>No reviewa yet</Text>
                ) : (
                  <View style={{ width: "100%", display: "flex" }}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      data={userComment?.length > 0 ? userComment : []}
                      renderItem={renderUserComment}
                      keyExtractor={(item, index) => index.toString()}
                    />
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      data={comment?.length > 0 ? comment : []}
                      renderItem={renderComments}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </>
      ) : (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      )}
      {isPopup && (
        <PopUp
          handleNo={() => setIsPopup(false)}
          handleYes={handleDeleteComment}
          message={"delete comment?"}
        />
      )}
      <ToastManager />
    </SafeAreaView>
  );
}
