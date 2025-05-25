import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Password, DropDown } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "../../styles";
import { location as locationList } from "../../data";
import ToastManager, { Toast } from "toastify-react-native";
import { useAppContext } from "../../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function EditProfile({ loading, setLoading }) {
  const { Colors, Typography } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  // const Colors.textPrimary="black"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { navigate } = useNavigation();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      //   padding: 10,
      backgroundColor: Colors.card,
      borderRadius: 5,

      gap: 10,
    },
    holdHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // borderColor: Colors.border,
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
    },
    item: {
      width: "100%",
      padding: 10,
      color: Colors.textPrimary,
    },
    input: {
      padding: 10,
      borderColor: Colors.border,
      width: "100%",
      color: Colors.textPrimary,
      backgroundColor: Colors.background,
      borderRadius: 10,
      borderWidth: 1,
    },
    holdInputs: {
      display: "flex",
      width: "100%",
      gap: 10,
      marginTop: 5,
      // padding: 10,
      // backgroundColor: Colors.card,
      borderRadius: 5,
      alignItems: "center",
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
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };
  const handleRegister = async () => {
    const storedData = await AsyncStorage.getItem("user");
    const parsedUser = storedData ? JSON.parse(storedData) : {};
    // console.log("Fetched User2:", parsedUser);
    setId(parsedUser._id);

    if (name.length < 5) {
      Toast.warn("user name must be up to 3 characters");
      return;
    } else if (address === "") {
      Toast.warn("please select your level");

      return;
    } else if (id === "") {
      Toast.warn("An error occurred, please login again");

      return;
    }
    setLoading(true);
    const formData = {
      id,
      name,
      address,
      location,
    };
    // console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/update-account",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();
      console.log("respone", resData);
      if (response.ok) {
        setLoading(false);
        Toast.success(resData.message);
        await AsyncStorage.setItem("user", JSON.stringify(resData.user));
        setTimeout(() => {
          navigate("Login", { data: email });
        }, 3000);
      } else {
        setLoading(false);
        Toast.error(resData.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during sign up:", error);
      Toast.error("Error during sign up:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.holdHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={{ color: Colors.textPrimary }}>Edit Profile</Text>

        <FontAwesome
          name={isOpen ? "sort-up" : "sort-down"}
          size={20}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>
      {isOpen && (
        <View>
          <View style={styles.holdInputs}>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="User Name"
            />

            <TextInput
              style={styles.input}
              placeholder="Address e.g; lodge"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <DropDown
              array={locationList}
              header={"Select your Location"}
              selected={location}
              setSelected={setLocation}
              background={Colors.background}
              textColor={Colors.textPrimary}
            />
            <TouchableOpacity
              style={Button.button}
              onPress={() => handleRegister()}
            >
              <Text style={Button.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
