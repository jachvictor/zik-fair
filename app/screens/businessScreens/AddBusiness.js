import {
  Button,
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
import { categories, location as locationList } from "../../data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddBusiness() {
  const { Colors, Typography } = useTheme();
  const { setLoading } = useAppContext();
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
      padding: 10,
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
  });
  const { navigate } = useNavigation();
  const [businessImage, setBusinessImage] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedData = await AsyncStorage.getItem("user");
        const parsedUser = storedData ? JSON.parse(storedData) : {};
        console.log("Fetched User2:", parsedUser);
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
    if (sampleImages.length > 3 && isMultiple) {
      Toast.warn("4 images only");
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
      let maxSize = 2 * 1024 * 1024; // 2MB limit

      if (isMultiple) {
        setter((prev) => {
          let newImages = result.assets
            .filter((asset) => asset.fileSize && asset.fileSize <= maxSize) // Filter valid images
            .map((asset) => asset.uri);

          if (newImages.length < result.assets.length) {
            Toast.warn("Some images exceed 2MB and were skipped.");
          }

          return [...prev, ...newImages].slice(0, 5); // Limit to 5 images
        });
      } else {
        let fileSize = result.assets[0].fileSize || 0;
        if (fileSize > maxSize) {
          Toast.warn("File too large! Please upload an image under 2MB.");
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
      console.log("form", form);
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
        "http://localhost:5000/api/business/create-business",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        Toast.success("Business added successfully!");
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
      }
    } catch (err) {
      setLoading(false);
      Toast.warn("Submission failed. Try again.");
      console.error(err);
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
  const normalizeURL = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  // Example
  // const cleanFacebook = normalizeURL(facebook);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.header}>Add Business</Text>
          <Text style={styles.message}>
            Fill Out This Details In Order TO Add business
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
            value={form.address}
            onChangeText={(val) => setForm({ ...form, address: val })}
          />
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            placeholder="phone"
            value={form.phone}
            onChangeText={(val) => setForm({ ...form, phone: val })}
          />
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="WhatsApp number (nigeria)"
            value={form.whatsapp}
            onChangeText={(val) => setForm({ ...form, whatsapp: val })}
          />
          <TextInput
            style={styles.input}
            keyboardType="url"
            placeholder="FaceBook"
            value={form.facebook}
            onChangeText={(val) => setForm({ ...form, facebook: val })}
            onBlur={() => {
              if (form.facebook && !/^https?:\/\//i.test(form.facebook)) {
                setForm({ ...form, facebook: `https://${form.facebook}` });
              }
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Businness Web site"
            keyboardType="url"
            value={form.website}
            onChangeText={(val) =>
              setForm({ ...form, website: normalizeURL(val) })
            }
          />
          <TextInput
            style={styles.input}
            keyboardType="twitter"
            placeholder="Twiiter/X Handle"
            value={form.twitter}
            onChangeText={(val) => setForm({ ...form, twitter: val })}
          />
          <TextInput
            multiline
            style={styles.input}
            placeholder="About Business"
            value={form.about}
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
          Add Product Samples
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

        {/* <Button  title="Submit" /> */}
        <Pressable onPress={handleSubmit}>
          <Text
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
          </Text>
        </Pressable>
      </ScrollView>
      <ToastManager />
    </SafeAreaView>
  );
}
