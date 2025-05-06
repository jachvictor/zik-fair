import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { LightColors, DarkColors } from "../styles/Color";
import { Typography } from "../styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // "light" or "dark"
  const [themeMode, setThemeMode] = useState("dark"); // Default to dark theme

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
