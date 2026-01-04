import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  // ===== Profile State =====
  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcPal7e2uimTdT480kyNt_HOBPeB0sX_KAHU61BgTBW9hFDv4ZlaB7m7zoVIrdIClVZTKpWUvlEXOl4t-gW2T29k7ueHBXpxJPGGaAzB9XEuFCOYQ88Q6gzYOAFRrI5qOVSosAkP_bw9c2Cb7HGR6wHRtpyI_O88ThSHI_YYuQHRq-XMQJikMWwpKlGwGfVYdhC4rgQsQ8d8ybuyh6gDAXFTr6Ez776140TOIHu9iwDvSihh-lHF4Z-BQKtyiBsfLA7qMOhoOLDiOe"
  );

  const [fullName, setFullName] = useState("Alex Martinez");
  const [email, setEmail] = useState("alex.martinez@smashlive.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [organization, setOrganization] = useState("SMASH LIVE Events");

  // ===== Image Picker =====
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

  // ===== Save Handler =====
  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your changes have been saved successfully!"
    );
  };

  return (
    <ScreenWrapper>
      {/* ===== Header ===== */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={muted} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          Edit Profile
        </Text>
      </View>

      {/* ===== Content ===== */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== Profile Picture ===== */}
          <View className="items-center pt-8 pb-8">
            <TouchableOpacity onPress={pickImage} activeOpacity={0.85}>
              <View>
                <Image
                  source={{ uri: profilePic }}
                  className="h-32 w-32 rounded-full"
                />
                <View className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
                  <MaterialIcons name="photo-camera" size={18} color="#000" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* ===== Inputs ===== */}
          <View className="gap-5">
            {/* Full Name */}
            <View>
              <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                Full Name
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor={muted}
                className="h-14 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 text-base text-light-text dark:text-dark-text"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor={muted}
                className="h-14 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 text-base text-light-text dark:text-dark-text"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                placeholderTextColor={muted}
                className="h-14 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 text-base text-light-text dark:text-dark-text"
              />
            </View>

            {/* Organization */}
            <View>
              <Text className="text-sm font-medium text-light-muted dark:text-dark-muted mb-2">
                Organization Name
              </Text>
              <TextInput
                value={organization}
                onChangeText={setOrganization}
                placeholder="Enter organization name"
                placeholderTextColor={muted}
                className="h-14 rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-4 text-base text-light-text dark:text-dark-text"
              />
            </View>
          </View>
        </ScrollView>

        {/* ===== Actions ===== */}
        <View className="border-t border-light-border dark:border-dark-border px-5 py-4 bg-light-bg dark:bg-dark-bg mb-6">
          <TouchableOpacity
            onPress={handleSave}
            className="h-14 rounded-xl bg-primary items-center justify-center mb-3"
          >
            <Text className="text-black font-bold text-base">Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="h-14 rounded-xl items-center justify-center bg-light-card dark:bg-dark-card"
          >
            <Text className="text-light-muted dark:text-dark-muted font-bold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
