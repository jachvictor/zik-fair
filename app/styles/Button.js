import Colors from "./Color";
import { LightColors, DarkColors } from "./Color";
import Typography from "./Typography";
export const Button = {
  button: {
    backgroundColor: LightColors.secondary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: LightColors.white,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
  },
};
