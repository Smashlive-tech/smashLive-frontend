import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBALEbqIVOyBbj_MSp30VwoHAO85ei29lp8jLEqOdwgkwZ1fal1v1DLwrhHg_q6-bJwNfitfgguH3Ijoz6XPevVYgqr5Bgd0DPvXitiqP1CGHeVS7i_eLYVZQQwDlIj8nioZd4u25mK8V58LTWb-R-F8Fh7XtK6yUM6_uRR255hnwZux-4wBbYu8N8brI93hpEZZHs-MANGSzFK8QHquRSx0y8MEMbMrs9zdZ6lEFlYHLrzygn9QBY2s9xjgLL_a-_eEd8kDhZaA6Zl"
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need access to your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };
  const mutedIconColor = isDark ? "#9CA3AF" : "#475569";
  return (
    <ScreenWrapper>
      {/* ===== Header ===== */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={mutedIconColor} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4 pb-8"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== Profile Section ===== */}
        <View className="items-center mb-8 mt-2">
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={{ uri: profilePic }}
              className="h-32 w-32 rounded-full"
            />
            <View className="absolute bottom-1 right-1 bg-primary rounded-full p-2">
              <MaterialIcons name="edit" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          <Text className="text-[22px] font-bold text-light-text dark:text-dark-text mt-4">
            Alex Martinez
          </Text>
          <Text className="text-base text-light-muted dark:text-dark-muted">
            alex.martinez@smashlive.com
          </Text>
        </View>

        {/* ===== Card 1 ===== */}
        <View className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm mb-5">
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="flex-row items-center justify-between px-4 min-h-[60px] border-b border-light-border dark:border-dark-border"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-primary/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="person" size={24} color={primary} />
              </View>
              <Text className="text-light-text dark:text-dark-text font-medium">
                Edit Profile
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={26} color={muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/payments")}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-primary/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="credit-card" size={22} color={primary} />
              </View>
              <Text className="text-light-text dark:text-dark-text font-medium">
                Payments
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={26} color={muted} />
          </TouchableOpacity>
        </View>

        {/* ===== Card 2 ===== */}
        <View className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm mb-5">
          <TouchableOpacity
            onPress={() => router.push("/profile/help_support")}
            className="flex-row items-center justify-between px-4 min-h-[60px] border-b border-light-border dark:border-dark-border"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-primary/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="help-outline" size={24} color={primary} />
              </View>
              <Text className="text-light-text dark:text-dark-text font-medium">
                Help & Support
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={26} color={muted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/terms-conditions")}
            className="flex-row items-center justify-between px-4 min-h-[60px]"
          >
            <View className="flex-row items-center gap-4">
              <View className="bg-primary/20 rounded-lg size-10 items-center justify-center">
                <MaterialIcons name="description" size={24} color={primary} />
              </View>
              <Text className="text-light-text dark:text-dark-text font-medium">
                Terms & Conditions
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={26} color={muted} />
          </TouchableOpacity>
        </View>

        {/* ===== Logout ===== */}
        <View className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm">
          <TouchableOpacity className="flex-row items-center px-4 min-h-[60px]">
            <View className="bg-red-500/20 rounded-lg size-10 items-center justify-center mr-4">
              <MaterialIcons name="logout" size={22} color="#ef4444" />
            </View>
            <Text className="text-base font-medium text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
