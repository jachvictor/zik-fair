import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LightColors, DarkColors } from "../styles/Color";
import { Typography } from "../styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // "light" or "dark"
  const [themeMode, setThemeMode] = useState(systemScheme); // default to system

  useEffect(() => {
    // Load stored theme preference on mount
    const loadTheme = async () => {
      try {
        const storedMode = await AsyncStorage.getItem("themeMode");
        if (storedMode) {
          setThemeMode(storedMode);
        }
      } catch (error) {
        console.error("Error loading theme preference:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newMode = themeMode === "light" ? "dark" : "light";
      setThemeMode(newMode);
      await AsyncStorage.setItem("themeMode", newMode); // persist it
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const theme = {
    Colors: themeMode === "dark" ? DarkColors : LightColors,
    Typography,
    mode: themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
