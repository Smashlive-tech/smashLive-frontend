import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  status: "live" | "scheduled" | "completed";
};

/* ================= DATA ================= */

const ongoingData: CardItem[] = [
  {
    id: "1",
    title: "Weekly Smashdown #42",
    subtitle: "Dec 15, 2023 • 8:00 PM",
    status: "live",
  },
  {
    id: "2",
    title: "Mario Kart Madness",
    subtitle: "Dec 16, 2023 • 6:00 PM",
    status: "live",
  },
];

const upcomingData: CardItem[] = [
  {
    id: "3",
    title: "Weekend Warriors Cup",
    subtitle: "Dec 22, 2023 • 7:00 PM",
    status: "scheduled",
  },
  {
    id: "4",
    title: "Holiday Qualifiers",
    subtitle: "Dec 23, 2023 • 5:00 PM",
    status: "scheduled",
  },
];

const finishedData: CardItem[] = [
  {
    id: "5",
    title: "Holiday Brawl 2023",
    subtitle: "Dec 10, 2023 • 2:00 PM",
    status: "completed",
  },
  {
    id: "6",
    title: "November Knockout",
    subtitle: "Nov 25, 2023 • 5:00 PM",
    status: "completed",
  },
];

/* ================= CARD ================= */

const TournamentCard = ({ item }: { item: CardItem }) => {
  let pillBg = "";
  let pillText = "";

  if (item.status === "live") {
    pillBg = "bg-red-100 dark:bg-red-900/30";
    pillText = "text-red-600 dark:text-red-400";
  } else if (item.status === "scheduled") {
    pillBg = "bg-green-100 dark:bg-green-900/30";
    pillText = "text-green-700 dark:text-green-400";
  } else {
    pillBg = "bg-light-border dark:bg-dark-border";
    pillText = "text-light-muted dark:text-dark-muted";
  }
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/events/${item.id}`)}
      className="mr-4 w-[280px] rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm"
    >
      <Image
        source={{ uri: "https://picsum.photos/600/400" }}
        className="w-full h-[120px] rounded-t-xl"
      />

      <View className="p-3">
        <Text className="text-base font-bold text-light-text dark:text-dark-text">
          {item.title}
        </Text>
        <Text className="text-sm text-light-muted dark:text-dark-muted mb-1">
          {item.subtitle}
        </Text>

        <View
          className={`self-start flex-row items-center rounded-full px-3 py-1 ${pillBg}`}
        >
          {item.status === "live" && (
            <View className="h-2 w-2 rounded-full bg-red-500 mr-2" />
          )}
          <Text className={`text-sm font-medium ${pillText}`}>
            {item.status === "live"
              ? "Live"
              : item.status === "scheduled"
                ? "Scheduled"
                : "Completed"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ================= SECTION ================= */

const TournamentSection = ({
  title,
  data,
}: {
  title: string;
  data: CardItem[];
}) => (
  <>
    <Text className="px-4 pt-6 pb-3 text-[22px] font-bold text-light-text dark:text-dark-text">
      {title}
    </Text>

    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TournamentCard item={item} />}
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
    />
  </>
);

/* ================= SCREEN ================= */

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[32px] font-bold text-light-text dark:text-dark-text">
            Hi, Alex 👋
          </Text>

          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-sharp" size={18} color="#9CA3AF" />
            <Pressable className="flex-row items-center ml-1">
              <Text className="text-light-muted dark:text-dark-muted mr-1">
                Hyderabad, India
              </Text>
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between gap-2">
            <Pressable
              className="w-[32%] rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5 items-center shadow-sm"
              onPress={() => router.push("/(tabs)/tournaments")}
              android_ripple={{
                color: Platform.OS === "android" ? "#00000022" : undefined,
              }}
            >
              <MaterialIcons name="history" size={30} color="#8AFF1A" />
              <Text className="text-sm font-semibold text-light-text dark:text-dark-text mt-2">
                History
              </Text>
            </Pressable>

            <Pressable
              className="w-[32%] rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5 items-center shadow-sm"
              onPress={() => router.push("/payments")}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={30}
                color="#8AFF1A"
              />
              <Text className="text-sm font-semibold text-light-text dark:text-dark-text mt-2">
                Payments
              </Text>
            </Pressable>

            <Pressable className="w-[32%] rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-5 items-center shadow-sm">
              <MaterialIcons name="event-available" size={30} color="#8AFF1A" />
              <Text className="text-sm font-semibold text-light-text dark:text-dark-text mt-2">
                Create
              </Text>
            </Pressable>
          </View>
        </View>

        <TournamentSection title="Ongoing" data={ongoingData} />
        <TournamentSection title="Upcoming" data={upcomingData} />
        <TournamentSection title="Finished" data={finishedData} />
      </ScrollView>
    </ScreenWrapper>
  );
}
