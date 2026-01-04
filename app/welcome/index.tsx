import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Organize Tournaments, Seamlessly.",
    description:
      "Simplify everything from player registration to live bracket updates and results.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX8Jl9ihk37ZjsTntW50m9s2N3I149_NBt0ycC1tuajRLacGTa_B1KIqxrsAzLa24E9l_pgPWWAksdDatghFlxYyR7TDeCyOj4ipW5qBMYa7JNFuZYCsstSEkMKR6eWvymWpUqKeVTih3IFhcHIDUEoedirp3Q5gicieFG44vTvJZb-dW3HTZk5OB-HMTp3NAxNLPlNcmzQzv6DIThgmMYRsuqsBSHNoc9mNB-ikmN8IIzNX3NC18PHxCu-R8fa8EpJfOfHbEAfrCr",
  },
  {
    id: 2,
    title: "Track Matches in Real-Time.",
    description:
      "Monitor live brackets, player stats, and leaderboards — all in one place.",
    image: require("../../assets/images/icon.png"),
  },
  {
    id: 3,
    title: "Engage Your Community.",
    description:
      "Share results instantly and keep your audience updated effortlessly.",
    image: require("../../assets/images/favicon.png"),
  },
];

export default function OrganizerOnboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  return (
    <ScreenWrapper>
      {/* ===== Pagination Dots ===== */}
      <View className="flex-row justify-center py-4">
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            className="h-2 w-2 rounded-full mx-1"
            style={{
              backgroundColor:
                currentIndex === index
                  ? primary
                  : isDark
                    ? "#374151"
                    : "#CBD5E1",
            }}
          />
        ))}
      </View>

      {/* ===== Swiper ===== */}
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop={false}
        onChangeIndex={({ index }) => setCurrentIndex(index)}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={{ width }}
            className="flex-1 justify-between px-6"
          >
            {/* Spacer */}
            <View className="h-10" />

            {/* Content */}
            <View className="flex-1 items-center justify-center">
              <ImageBackground
                source={
                  typeof slide.image === "string"
                    ? { uri: slide.image }
                    : slide.image
                }
                resizeMode="contain"
                className="w-full max-w-sm min-h-64 rounded-xl mb-8"
              />

              {/* Title */}
              <Text className="text-light-text dark:text-dark-text text-3xl font-bold text-center leading-tight mb-3">
                {slide.title}
              </Text>

              {/* Description */}
              <Text className="text-light-muted dark:text-dark-muted text-lg text-center leading-relaxed px-4">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </SwiperFlatList>

      {/* ===== Footer ===== */}
      <View className="pb-6">
        {/* Get Started Button */}
        {currentIndex === slides.length - 1 && (
          <View className="px-6 py-3">
            <TouchableOpacity
              className="h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: primary }}
              onPress={() => router.replace("/(auth)/signup")}
              activeOpacity={0.9}
            >
              <Text className="text-black font-bold text-base">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Skip */}
        <View className="pt-2 items-center mb-10">
          <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
            <Text className="text-sm font-medium" style={{ color: muted }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
