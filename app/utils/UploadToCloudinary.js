import * as FileSystem from "expo-file-system";
import axios from "axios";
import { Platform } from "react-native";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfvuogutj/image/upload";
const UPLOAD_PRESET = "ml_default";

export const UploadImageToCloudinary = async (imageUri) => {
  try {
    const formData = new FormData();

    if (Platform.OS === "web") {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      formData.append("file", blob);
    } else {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      formData.append("file", `data:image/jpeg;base64,${base64}`);
    }

    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url && data.public_id) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      console.error("Cloudinary error:", data);
      return null;
    }
  } catch (err) {
    console.error("Cloudinary upload failed", err);
    return null;
  }
};
