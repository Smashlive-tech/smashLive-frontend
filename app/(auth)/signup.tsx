import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpScreen() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const router = useRouter();

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear field error on typing
  };

  const handleSubmit = () => {
    let valid = true;
    let temp: FormData = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.fullName.trim()) {
      temp.fullName = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      temp.email = "Email or phone is required";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        temp.email = "Enter a valid email address";
        valid = false;
      }
    }

    if (!formData.password.trim()) {
      temp.password = "Password is required";
      valid = false;
    }

    if (!formData.confirmPassword.trim()) {
      temp.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(temp);

    if (!valid) return;

    // success
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pb-0">
          {/* Top Header */}
          <View className="flex-row items-center justify-center p-4 pb-2">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Account
            </Text>
          </View>

          {/* FORM INPUTS */}
          <View className="pt-4">
            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Full Name
              </Text>
              <TextInput
                value={formData.fullName}
                onChangeText={(t) => handleInputChange("fullName", t)}
                placeholder="Enter your full name"
                className={`h-14 w-full rounded-xl border ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-background-light dark:bg-background-dark p-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
              />
              {errors.fullName ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </Text>
              ) : null}
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Email
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(t) => handleInputChange("email", t)}
                placeholder="Enter your email"
                className={`h-14 w-full rounded-xl border ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-background-light dark:bg-background-dark p-[15px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
              />
              {errors.email ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Password
              </Text>

              <View className="relative justify-center">
                <TextInput
                  value={formData.password}
                  onChangeText={(t) => handleInputChange("password", t)}
                  placeholder="Enter your password"
                  secureTextEntry={!isPasswordVisible}
                  className={`h-14 w-full rounded-xl border ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-background-light dark:bg-background-dark p-[15px] pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-4"
                  style={{ top: 14 }}
                >
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={22}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              {errors.password ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password}
                </Text>
              ) : null}
            </View>

            {/* Confirm Password */}
            <View className="mb-4">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Confirm Password
              </Text>

              <View className="relative justify-center">
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(t) => handleInputChange("confirmPassword", t)}
                  placeholder="Confirm your password"
                  secureTextEntry={!isConfirmPasswordVisible}
                  className={`h-14 w-full rounded-xl border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-background-light dark:bg-background-dark p-[15px] pr-12 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                />

                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className="absolute right-4"
                  style={{ top: 14 }}
                >
                  <MaterialCommunityIcons
                    name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                    size={22}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              {errors.confirmPassword ? (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </View>
          </View>

          {/* bottom */}
          <View className="py-3 pb-4">
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex flex-row h-14 w-full items-center justify-center rounded-xl bg-primary"
            >
              <Text className="text-white font-bold text-base">Sign Up</Text>
            </TouchableOpacity>

            <View className="mt-3">
              <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Text
                  className="font-bold text-primary"
                  onPress={() => router.push("/(auth)/login")}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
