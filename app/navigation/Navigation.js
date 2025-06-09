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
  AboutScreen,
  PrivacyPolicyScreen,
  TermsOfUseScreen,
  ContactUsScreen,
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
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <tabs.Navigator
          screenOptions={({ route, navigation }) => ({
            // headerShown: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textPrimary,
            tabBarLabelStyle: {
              fontSize: Typography.fontSize.md,
              fontWeight: "medium",
            },

            // tabBarShowLabel: false,
            tabBarStyle: {
              elevation: 0,
              backgroundColor: Colors.card, // or Colors.card from your theme
              borderRadius: 16,
              height: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0,
              shadowRadius: 10,

              margin: 5,
              padding: 5,
              borderWidth: 0,
              borderColor: "transparent",
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
          <tabs.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />
          <tabs.Screen
            name="Favorite"
            component={Favorite}
            options={{ headerShown: false }}
          />
          <tabs.Screen
            name="Me"
            component={Profile}
            options={{
              headerStyle: { backgroundColor: Colors.card },
              headerTitleStyle: { color: Colors.textPrimary },
            }}
          />
        </tabs.Navigator>
      </View>
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
        <stack.Screen
          name="Forgot"
          component={ForgotPass}
          options={{
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="Reset"
          component={ResetPass}
          options={{
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="VerifyEmail"
          component={VerifyEmail}
          options={{
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="tabs"
          component={TabsGroup}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="VerifyVendor"
          component={VerifyVendor}
          options={{
            headerTitle: "Verification",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="RegisterVendor"
          component={RegisterVendor}
          options={{
            headerTitle: "Verification",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          options={{ header: () => <HomeHeader /> }}
          name="HomeScreen"
          component={Home}
        />
        <stack.Screen
          name="category"
          component={Category}
          options={{
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
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
                  // marginLeft: 15,
                  backgroundColor: Colors.card,
                  padding: 10,
                  borderRadius: 20,
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
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="AddBusiness"
          component={AddBusiness}
          options={{
            headerTitle: "Add business",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerTitle: "About App",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            headerTitle: "Privacy Policy",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="TermsOfUse"
          component={TermsOfUseScreen}
          options={{
            headerTitle: "Terms Of Use",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{
            headerTitle: "Contact Us",
            headerStyle: { backgroundColor: Colors.card },
            headerTitleStyle: { color: Colors.textPrimary },
            headerTintColor: Colors.textPrimary,
          }}
        />
        {/* <stack.Screen name="category" component={Category} /> */}
      </stack.Navigator>
    </>
  );
}
