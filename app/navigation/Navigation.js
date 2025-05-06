import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Home, Search } from "../screens/tabScreens";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HomeHeader } from "../components";
import {
  Category,
  Favorite,
  Welcome,
  Profile,
  Search,
  Home,
  ProductDetail,
  AddBusiness,
  VerifyEmail,
  Settings,
  MyBusinessList,
  OnBoarding,
  Signup,
  Login,
  VerifyVendor,
  ForgotPass,
  ResetPass,
  RegisterVendor,
} from "../screens";
import Loading from "../screens/splashScreens/Loading";
// import { Colors, Typography } from "../styles";
import { useTheme } from "../context/ThemeContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppContext } from "../context/AppContext";

export default function Navigation() {
  const { Colors, Typography } = useTheme();
  const { loading, setLoading } = useAppContext();
  const stack = createNativeStackNavigator();
  const tabs = createBottomTabNavigator();
  const TabsGroup = () => {
    return (
      <tabs.Navigator
        screenOptions={({ route, navigation }) => ({
          // headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.border,
          tabBarLabelStyle: {
            fontSize: Typography.fontSize.md,
            fontWeight: "medium",
          },
          tabBarStyle: {
            // paddingVertical: 15,
            backgroundColor: Colors.white,
          },
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Favorite") {
              iconName = "heart";
            } else if (route.name === "Me") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <tabs.Screen
          name="Home"
          component={Home}
          options={{ header: () => <HomeHeader /> }}
        />
        <tabs.Screen name="Search" component={Search} />
        <tabs.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
        <tabs.Screen
          name="Me"
          component={Profile}
          options={{ headerShown: false }}
        />
      </tabs.Navigator>
    );
  };

  return (
    <>
      {loading && <Loading />}
      <stack.Navigator>
        <stack.Screen
          name="welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <stack.Screen name="Forgot" component={ForgotPass} />
        <stack.Screen name="Reset" component={ResetPass} />
        <stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <stack.Screen
          name="tabs"
          component={TabsGroup}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="VerifyVendor"
          component={VerifyVendor}
          options={{ headerTitle: "Verification" }}
        />
        <stack.Screen
          name="RegisterVendor"
          component={RegisterVendor}
          options={{ headerTitle: "Verification" }}
        />
        <stack.Screen name="Settings" component={Settings} />
        <stack.Screen
          options={{ header: () => <HomeHeader /> }}
          name="HomeScreen"
          component={Home}
        />
        <stack.Screen name="category" component={Category} />
        <stack.Screen
          name="productDetail"
          component={ProductDetail}
          options={({ navigation }) => ({
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 15,
                  backgroundColor: Colors.border,
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <FontAwesome
                  name="arrow-left"
                  size={20}
                  color={Colors.textPrimary}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <stack.Screen
          name="MyBusinessList"
          component={MyBusinessList}
          options={{ headerTitle: "My Business" }}
        />
        <stack.Screen
          name="AddBusiness"
          component={AddBusiness}
          options={{ headerTitle: "Add business" }}
        />
        {/* <stack.Screen name="category" component={Category} /> */}
      </stack.Navigator>
    </>
  );
}
