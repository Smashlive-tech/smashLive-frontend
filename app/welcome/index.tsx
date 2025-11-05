import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

const OrganizerOnboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Dots (Pagination) */}
      <View className="flex-row justify-center py-4">
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentIndex === index ? "bg-primary" : "bg-text-secondary/30"
            }`}
          />
        ))}
      </View>

      {/* Swiper Component */}
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop={false}
        onChangeIndex={({ index }) => setCurrentIndex(index)}
      >
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={{ width }}
            className="flex-1 justify-between p-4"
          >
            {/* Spacer */}
            <View className="h-12" />

            {/* Content */}
            <View className="flex-1 items-center justify-center px-4">
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
              <Text className="text-text-primary dark:text-white text-3xl font-semibold text-center leading-tight max-w-xs mb-3">
                {slide.title}
              </Text>

              {/* Description */}
              <Text className="text-text-secondary dark:text-gray-400 text-lg text-center max-w-md leading-relaxed px-4">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </SwiperFlatList>

      {/* Footer (Skip and Next/Start Button) */}
      <View className="pb-4">
        {/* Next or Get Started Button */}
        {currentIndex === slides.length - 1 && (
          <View className="px-4 py-3">
            <TouchableOpacity
              className="h-12 bg-primary rounded-xl items-center justify-center"
              onPress={() => {
                if (currentIndex === slides.length - 1) {
                  router.replace("/(auth)/signup");
                } else {
                  setCurrentIndex((prev) => prev + 1);
                }
              }}
            >
              <Text className="text-white text-base font-bold tracking-[0.015em]">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Skip Link */}
        <View className="pt-2 items-center">
          <TouchableOpacity onPress={() => router.replace("/(auth)/signup")}>
            <Text className="text-text-secondary dark:text-gray-400 text-sm font-medium">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrganizerOnboarding;
