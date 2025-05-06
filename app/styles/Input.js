// import Colors from "./Color";
import { LightColors, DarkColors } from "./Color";
import Typography from "./Typography";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

const style = () => {
  // const [color, setColors] = useState("");

  const { Colors, Typography } = useTheme();
  return "ttttt";
};

// console.log("style", style().card);
export const Input = {
  padding: 10,
  borderColor: LightColors.border,
  width: "100%",
  outline: "none",
  backgroundColor: style.background,
  borderRadius: 10,
  borderWidth: 1,
};
