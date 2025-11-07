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
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // ====== Profile State ======
  const [profilePic, setProfilePic] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcPal7e2uimTdT480kyNt_HOBPeB0sX_KAHU61BgTBW9hFDv4ZlaB7m7zoVIrdIClVZTKpWUvlEXOl4t-gW2T29k7ueHBXpxJPGGaAzB9XEuFCOYQ88Q6gzYOAFRrI5qOVSosAkP_bw9c2Cb7HGR6wHRtpyI_O88ThSHI_YYuQHRq-XMQJikMWwpKlGwGfVYdhC4rgQsQ8d8ybuyh6gDAXFTr6Ez776140TOIHu9iwDvSihh-lHF4Z-BQKtyiBsfLA7qMOhoOLDiOe"
  );

  const [fullName, setFullName] = useState("Alex Martinez");
  const [email, setEmail] = useState("alex.martinez@smashlive.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [organization, setOrganization] = useState("SMASH LIVE Events");

  // ====== Image Picker ======
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

  // ====== Save Handler ======
  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your changes have been saved successfully!"
    );
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-[#101622]">
      {/* ===== Header ===== */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#f9fafb" : "#111827"}
          />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Edit Profile
        </Text>

        <View style={{ width: 24 }} />
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
          <View className="flex items-center pt-8 pb-8">
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.85}
              className="relative"
            >
              <Image
                source={{ uri: profilePic }}
                className="h-32 w-32 rounded-full bg-center bg-cover"
              />
              <View className="absolute bottom-0 right-0 bg-[#0d59f2] rounded-full p-2 shadow-md">
                <MaterialIcons name="photo-camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* ===== Input Fields ===== */}
          <View className="flex flex-col gap-5">
            {/* Full Name */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                Full Name
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100 focus:border-[#0d59f2] focus:ring-2 focus:ring-[#0d59f2]/20"
              />
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100 focus:border-[#0d59f2] focus:ring-2 focus:ring-[#0d59f2]/20"
              />
            </View>

            {/* Phone */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100 focus:border-[#0d59f2] focus:ring-2 focus:ring-[#0d59f2]/20"
              />
            </View>

            {/* Organization */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
                Organization Name
              </Text>
              <TextInput
                value={organization}
                onChangeText={setOrganization}
                placeholder="Enter organization name"
                placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                className="h-14 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-4 text-base text-gray-900 dark:text-gray-100 focus:border-[#0d59f2] focus:ring-2 focus:ring-[#0d59f2]/20"
              />
            </View>
          </View>
        </ScrollView>

        {/* ===== Action Buttons ===== */}
        <View className="border-t border-gray-200 dark:border-gray-800 px-5 py-4 bg-white/90 dark:bg-[#101622]/90 mb-6">
          <TouchableOpacity
            onPress={handleSave}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-[#0d59f2] flex-row gap-2 shadow-lg shadow-blue-500/20 mb-3 active:scale-95"
          >
            <Text className="text-white font-bold text-base">Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="flex h-14 w-full items-center justify-center rounded-xl flex-row gap-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/60 active:scale-95"
          >
            <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
