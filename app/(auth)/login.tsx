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

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    let temp = { email: "", password: "" };

    if (!email.trim()) {
      temp.email = "Email or phone is required";
      valid = false;
    } else {
      // check email or phone
      const isNumber = /^[0-9]+$/.test(email);
      if (isNumber) {
        if (email.length !== 10) {
          temp.email = "Enter valid 10 digit phone number";
          valid = false;
        }
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          temp.email = "Enter valid email address";
          valid = false;
        }
      }
    }

    if (!password.trim()) {
      temp.password = "Password is required";
      valid = false;
    }

    setErrors(temp);
    if (!valid) return;

    // success
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1 bg-background-light dark:bg-background-dark"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pb-0">
          {/* Top Title */}
          <View className="flex-row items-center justify-center p-4 pb-2">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign In
            </Text>
          </View>

          {/* Form Inputs */}
          <View className="pt-4">
            {/* Email */}
            <View className="mb-4">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Email or Phone
              </Text>

              <TextInput
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setErrors({ ...errors, email: "" });
                }}
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
            <View className="mb-2">
              <Text className="text-base font-medium pb-2 text-gray-800 dark:text-gray-200">
                Password
              </Text>

              <View className="relative justify-center">
                <TextInput
                  value={password}
                  onChangeText={(v) => {
                    setPassword(v);
                    setErrors({ ...errors, password: "" });
                  }}
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
          </View>

          {/* Forgot Password */}
          <View className="flex-row justify-end mb-6">
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword/email")}
            >
              <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="pb-4">
            <TouchableOpacity
              onPress={validate}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-primary mb-4"
            >
              <Text className="text-white font-bold text-base">Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push("/(auth)/otp_login/mobile");
              }}
              className="flex h-14 w-full items-center justify-center rounded-xl border border-[#D1D1D6] bg-transparent"
            >
              <Text className="text-text-primary dark:text-white font-bold text-base">
                Login with OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom redirect */}
          <View className="mt-3">
            <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
              New Here?{" "}
              <Text
                className="font-bold text-primary"
                onPress={() => router.push("/(auth)/signup")}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
