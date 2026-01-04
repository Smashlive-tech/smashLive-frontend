import ScreenWrapper from "@/components/ScreenWrapper";
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

// Enable animation for Android expand/collapse
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

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
    <ScreenWrapper>
      {/* ===== Header ===== */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={muted} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          Help & Support
        </Text>
      </View>

      {/* ===== Content ===== */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ===== FAQ Section ===== */}
        <View className="mt-4 mb-8">
          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
            Frequently Asked Questions
          </Text>

          <View className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
            {faqs.map((faq) => (
              <View
                key={faq.id}
                className="border-b border-light-border dark:border-dark-border last:border-b-0"
              >
                <TouchableOpacity
                  onPress={() => handleToggle(faq.id)}
                  activeOpacity={0.85}
                  className="flex-row items-center justify-between px-5 py-4"
                >
                  <Text className="text-base font-medium text-light-text dark:text-dark-text flex-1 pr-4">
                    {faq.question}
                  </Text>
                  <MaterialIcons
                    name={openFAQ === faq.id ? "expand-less" : "expand-more"}
                    size={26}
                    color={muted}
                  />
                </TouchableOpacity>

                {openFAQ === faq.id && (
                  <View className="px-5 pb-4">
                    <Text className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* ===== Contact Support ===== */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
            Contact Support
          </Text>

          <View className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
            {/* Email Support */}
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@smashlive.com")}
              activeOpacity={0.85}
              className="flex-row items-center justify-between px-5 py-5 border-b border-light-border dark:border-dark-border"
            >
              <View className="flex-row items-center gap-4">
                <View className="size-11 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons name="mail" size={22} color={primary} />
                </View>
                <Text className="text-base font-medium text-light-text dark:text-dark-text">
                  Email Support
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={26} color={muted} />
            </TouchableOpacity>

            {/* Live Chat */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert("Live Chat", "Connecting you to support...")
              }
              activeOpacity={0.85}
              className="flex-row items-center justify-between px-5 py-5"
            >
              <View className="flex-row items-center gap-4">
                <View className="size-11 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons name="chat-bubble" size={22} color={primary} />
                </View>
                <Text className="text-base font-medium text-light-text dark:text-dark-text">
                  Live Chat
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={26} color={muted} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
