import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { Input } from "../../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import { UploadImageToCloudinary } from "../../utils";
import { DropDown } from "../../components";
import { Button } from "../../styles";
import { categories, location as locationList } from "../../data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { ActivityIndicator } from "react-native-web";

export default function AddBusiness() {
  const { Colors, Typography } = useTheme();
  const { isNonPersonalized } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      padding: 10,
      gap: 20,
      display: "flex",
      backgroundColor: Colors.background,
    },
    header: {
      fontSize: Typography.fontSize.lg,
      fontWeight: "bold",
      color: Colors.textPrimary,
    },
    message: {
      fontSize: Typography.fontSize.md,
      color: Colors.textSecondary,
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      backgroundColor: Colors.card,
      color: Colors.textPrimary,
      borderRadius: 10,
      borderWidth: 1,

      outlineStyle: "none",
    },
    holdInputs: {
      display: "flex",
      width: "100%",
      gap: 10,
      marginTop: 5,
      // padding: 10,
      backgroundColor: Colors.background,
      borderRadius: 5,
    },
    holdSamples: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 5,
      padding: 5,
      borderRadius: 5,
      backgroundColor: Colors.card,
    },
    aboutBox: {
      width: "100%",
      // height: 100,
      borderRadius: 10,
      borderColor: Colors.border,
      borderWidth: 1,
      color: Colors.textPrimary,
      padding: 8,
      // display: "flex",
      textAlign: "left",
      textAlignVertical: "top",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
  });
  const { navigate } = useNavigation();
  const [businessImage, setBusinessImage] = useState(null);
  const [user, setUser] = useState(null);
  const [imageNo, setImageNo] = useState(1);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedData = await AsyncStorage.getItem("user");
        const parsedUser = storedData ? JSON.parse(storedData) : {};
        // console.log("Fetched User2:", parsedUser);
        setUser(parsedUser);
        setForm({ ...form, owner: parsedUser._id });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  const [sampleImages, setSampleImages] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    name: "",
    category: selectedCat,
    address: "",
    location: selectedLocation,
    phone: "",
    whatsapp: "",
    facebook: "",
    website: "",
    twitter: "",
    about: "",
  });

  const pickImage = async (setter, isMultiple = false) => {
    if (sampleImages.length > imageNo && imageNo == 1 && isMultiple) {
      Toast.warn("limit reached (watched ads to iincresae)");
      return;
    }
    if (sampleImages.length > imageNo && isMultiple) {
      Toast.warn("You can only add 4 image sample");
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      Toast.warn("Permission denied!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: isMultiple,
      quality: 1,
    });

    if (!result.canceled) {
      let maxSize = 1 * 1024 * 1024; // 1MB limit

      if (isMultiple) {
        setter((prev) => {
          let newImages = result.assets
            .filter((asset) => asset.fileSize && asset.fileSize <= maxSize) // Filter valid images
            .map((asset) => asset.uri);

          if (newImages.length < result.assets.length) {
            Toast.warn("Some images exceed 1MB and were skipped.");
          }

          return [...prev, ...newImages].slice(0, 5); // Limit to 5 images
        });
      } else {
        let fileSize = result.assets[0].fileSize || 0;
        if (fileSize > maxSize) {
          Toast.warn("File too large! Please upload an image under 1MB.");
        } else {
          setter(result.assets[0].uri);
        }
      }
    }
  };

  const removeSampleImage = (indexToRemove) => {
    setSampleImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    // console.log("form", form);

    if (
      !form.name ||
      !form.phone ||
      !form.about ||
      !form.address ||
      !form.category ||
      !form.location ||
      !businessImage ||
      sampleImages.length === 0
    ) {
      Toast.warn("Please fill out all required fields and add images.");
      // console.log("form", form);
      return;
    } else if (form.phone.length !== 11) {
      return Toast.warn("Invalid phone number, must a nigerian phone number");
    }
    setLoading(true);

    try {
      const cover = await UploadImageToCloudinary(businessImage);
      if (!cover) {
        setLoading(false);
        Toast.error("image upload failed");
        throw new Error("image upload failed");
      }

      const samples = await Promise.all(
        sampleImages.map((img) => UploadImageToCloudinary(img))
      );

      const sampleData = samples.filter(Boolean); // Remove failed uploads
      if (sampleData.length === 0) {
        setLoading(false);
        Toast.error("No sample images uploaded");

        throw new Error("No sample images uploaded");
      }
      const payload = {
        ...form,
        coverImage: cover,
        sampleImages: sampleData, // Array of { url, publicId }
      };

      const res = await axios.post(
        "https://zikfair.onrender.com/api/business/create-business",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setForm({
          name: "",
          address: "",
          category: "",
          location: "",
          phone: "",
          whatsapp: "",
          facebook: "",
          website: "",
          twitter: "",
          about: "",
        });
        setBusinessImage(null);
        setSampleImages([]);
        Toast.success("Business added successfully!");
      }
    } catch (err) {
      setLoading(false);
      Toast.warn("Submission failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCat(value);
    setForm((prev) => ({ ...prev, category: value }));
  };
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    setForm((prev) => ({ ...prev, location: value }));
  };

  const [isReward, setIsReward] = useState(false);
  const rewardedId = __DEV__
    ? TestIds.REWARDED
    : "ca-app-pub-7487058490506362/6665624851";
  const rewarded = RewardedAd.createForAdRequest(rewardedId, {
    requestNonPersonalizedAdsOnly: isNonPersonalized, 
    keywords: ["fashion", "clothing"],
  });
  // rewarded ad
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        // Ad loaded, you can show it now or wait for user action
        setIsReward(true);
        rewarded.show();

        console.log("Rewarded ad loaded");
      }
    );

    // Show rewarded ad when it is closed or when user earns reward
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
        setImageNo(3);

        setTimeout(() => {
          Toast.success("Reward earned!, you can add up to 4 sample images");
        }, 5000);

        // Give the reward to user here
      }
    );

    rewarded.load();

    // Clean up listeners on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const handleWatchAd = () => {
    // rewarded.show();
    if (isReward && rewarded.loaded) {
      rewarded.show();
    } else {
      console.log("Rewarded ad not loaded yet,try again");
      Toast.info("Rewarded ad not loaded yet, please try again");
    }
  };

  const formatLinkOnBlur = (key, form, setForm) => {
    if (form[key] && !/^https?:\/\//i.test(form[key])) {
      setForm({ ...form, [key]: `https://${form[key]}` });
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          size="large"
          color={Colors.primary}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.header}>Add Business</Text>
              <Text style={styles.message}>
                Fill Out This Details In Order To Add business
              </Text>
            </View>
            <TouchableOpacity onPress={() => pickImage(setBusinessImage)}>
              {businessImage ? (
                <Image
                  source={{ uri: businessImage }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <AntDesign name="camera" size={100} color={Colors.border} />
              )}
            </TouchableOpacity>
            <View style={styles.holdInputs}>
              <TextInput
                keyboardType="name-phone-pad"
                style={styles.input}
                placeholder="Name Of Business"
                placeholderTextColor={Colors.textPrimary}
                value={form.name}
                onChangeText={(val) => setForm({ ...form, name: val })}
              />
              <DropDown
                header={"Select categeory"}
                selected={selectedCat}
                setSelected={handleCategoryChange}
                array={categories}
                background={Colors.card}
                textColor={Colors.textPrimary}
              />
              <DropDown
                header={"Select Location"}
                selected={selectedLocation}
                setSelected={handleLocationChange}
                array={locationList}
                background={Colors.card}
                textColor={Colors.textPrimary}
              />
              <TextInput
                style={styles.input}
                placeholder="Business Address"
                placeholderTextColor={Colors.textPrimary}
                value={form.address}
                onChangeText={(val) => setForm({ ...form, address: val })}
              />
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor={Colors.textPrimary}
                value={form.phone}
                onChangeText={(val) => setForm({ ...form, phone: val })}
              />
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="WhatsApp number - Nigeria (optional)"
                placeholderTextColor={Colors.textPrimary}
                value={form.whatsapp}
                onChangeText={(val) => setForm({ ...form, whatsapp: val })}
              />
              <TextInput
                style={styles.input}
                keyboardType="url"
                placeholder="FaceBook (optional)"
                placeholderTextColor={Colors.textPrimary}
                value={form.facebook}
                onChangeText={(val) => setForm({ ...form, facebook: val })}
                onBlur={() => formatLinkOnBlur("facebook", form, setForm)}
              />
              <TextInput
                style={styles.input}
                placeholder="Businness Web site (optional)"
                placeholderTextColor={Colors.textPrimary}
                keyboardType="url"
                value={form.website}
                onChangeText={(val) => setForm({ ...form, website: val })}
                onBlur={() => formatLinkOnBlur("website", form, setForm)}
              />
              <TextInput
                style={styles.input}
                keyboardType="twitter"
                placeholder="Twiiter/X Handle (optional)"
                placeholderTextColor={Colors.textPrimary}
                value={form.twitter}
                onChangeText={(val) => setForm({ ...form, twitter: val })}
                onBlur={() => formatLinkOnBlur("twitter", form, setForm)}
              />
              <TextInput
                multiline
                style={styles.aboutBox}
                placeholder="About Business"
                placeholderTextColor={Colors.textPrimary}
                value={form.about}
                numberOfLines={4}
                onChangeText={(val) => setForm({ ...form, about: val })}
              />
            </View>
            <Text
              style={{
                fontSize: Typography.fontSize.lg,
                fontWeight: "bold",
                color: Colors.textPrimary,
                paddingVertical: 10,
              }}
            >
              Add Business Image Samples
            </Text>
            <TouchableOpacity onPress={() => pickImage(setSampleImages, true)}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={60}
                color={Colors.border}
              />
            </TouchableOpacity>
            <View style={styles.holdSamples}>
              {sampleImages.map((uri, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <Image
                    source={{ uri }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                  <Pressable
                    onPress={() => removeSampleImage(index)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: -5,
                      right: -5,
                      backgroundColor: "red",
                      borderRadius: 10,
                      padding: 2,
                      height: 20,
                      width: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        textAlign: "center",
                      }}
                    >
                      X
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <TouchableOpacity style={Button.button} onPress={handleSubmit}>
              <Text style={Button.buttonText}>Submit</Text>
            </TouchableOpacity>
            {!isReward && (
              <TouchableOpacity style={Button.button} onPress={handleWatchAd}>
                <Text style={Button.buttonText}>
                  🎁 Watch Ad for Reward 🎁 (add up 4 sample images)
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
          <ToastManager />
        </SafeAreaView>
      )}
    </>
  );
}
