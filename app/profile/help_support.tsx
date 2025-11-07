import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable animation for Android expand/collapse
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create an event?",
      answer:
        "To create an event, navigate to the 'Events' tab and tap the '+' icon. Follow the on-screen instructions to fill in your event details, set ticket prices, and publish your event.",
    },
    {
      id: 2,
      question: "Managing ticket sales?",
      answer:
        "You can track your ticket sales in real-time from the event dashboard. View sales data, revenue, and attendee information all in one place.",
    },
    {
      id: 3,
      question: "How to check in attendees?",
      answer:
        "Use the built-in scanner in the app to scan QR codes on tickets. You can also manually search for attendees by name or email to check them in.",
    },
    {
      id: 4,
      question: "Payment and payout information?",
      answer:
        "Payouts are processed 3-5 business days after your event concludes. You can set up and manage your payout details in the 'Settings' → 'Payout' section of the app.",
    },
  ];

  const handleToggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-[#101622]">
      {/* ===== Header ===== */}
      <View className="flex-row items-center justify-between px-5 py-5">
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
          Help & Support
        </Text>

        <View style={{ width: 28 }} />
      </View>

      {/* ===== Content ===== */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* ===== Search Bar ===== */}
        <View className="mt-3 mb-8">
          <View className="flex-row items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 shadow-sm h-14">
            <View className="pl-5 pr-3">
              <MaterialIcons
                name="search"
                size={24}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </View>
            <Text className="text-gray-500 dark:text-gray-400 text-base">
              Search for help
            </Text>
          </View>
        </View>

        {/* ===== FAQ Section ===== */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </Text>

          <View className="bg-white dark:bg-gray-800/60 rounded-xl shadow-sm">
            {faqs.map((faq) => (
              <View
                key={faq.id}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                <TouchableOpacity
                  onPress={() => handleToggle(faq.id)}
                  activeOpacity={0.8}
                  className="flex-row justify-between items-center px-5 py-4"
                >
                  <Text className="text-base font-medium text-gray-800 dark:text-gray-200 flex-1 pr-4">
                    {faq.question}
                  </Text>
                  <MaterialIcons
                    name={openFAQ === faq.id ? "expand-less" : "expand-more"}
                    size={26}
                    color={isDark ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>

                {openFAQ === faq.id && (
                  <View className="px-5 pb-4">
                    <Text className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ===== Contact Support Card ===== */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Support
          </Text>

          <View className="bg-white dark:bg-gray-800/60 rounded-xl shadow-sm">
            {/* Email */}
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@smashlive.com")}
              className="flex-row items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-700 active:bg-gray-100/60 dark:active:bg-gray-700/50"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-4">
                <View className="size-11 rounded-full bg-[#0d59f2]/20 items-center justify-center">
                  <MaterialIcons name="mail" size={24} color="#0d59f2" />
                </View>
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Email Support
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>

            {/* Live Chat */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Live Chat", "Connecting you to support...")
              }
              className="flex-row items-center justify-between px-5 py-5 active:bg-gray-100/60 dark:active:bg-gray-700/50"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-4">
                <View className="size-11 rounded-full bg-[#0d59f2]/20 items-center justify-center">
                  <MaterialIcons name="chat-bubble" size={22} color="#0d59f2" />
                </View>
                <Text className="text-base font-medium text-gray-900 dark:text-white">
                  Live Chat
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={26}
                color={isDark ? "#9ca3af" : "#6b7280"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
