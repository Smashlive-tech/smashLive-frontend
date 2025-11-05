import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  status: "live" | "scheduled" | "completed";
};

// Static data for the tournaments
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

// Tournament Card Component
const TournamentCard = ({ item }: { item: CardItem }) => {
  let pillBg = "";
  let pillText = "";

  if (item.status === "live") {
    pillBg = "bg-red-100";
    pillText = "text-red-600";
  } else if (item.status === "scheduled") {
    pillBg = "bg-green-100";
    pillText = "text-green-700";
  } else {
    pillBg = "bg-zinc-200";
    pillText = "text-zinc-600";
  }

  return (
    <View
      className="mr-4 rounded-xl bg-white border border-zinc-200 shadow-sm"
      style={{ width: 280, height: 210 }}
    >
      <Image
        source={{ uri: "https://picsum.photos/600/400" }}
        style={{
          width: "100%",
          height: 120,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <View className="p-3">
        <Text className="text-base font-bold text-zinc-900 ">{item.title}</Text>
        <Text className="text-sm text-zinc-500  mb-1">{item.subtitle}</Text>

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
    </View>
  );
};

const TournamentSection = ({
  title,
  data,
}: {
  title: string;
  data: CardItem[];
}) => (
  <>
    <Text className="px-4 pt-6 pb-3 text-[22px] font-bold tracking-[-0.015em] text-zinc-900 dark:text-white ml-2">
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

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-[#101622]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Top */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-[32px] font-bold text-zinc-900 dark:text-white">
            Hi, Alex 👋
          </Text>

          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-sharp" size={18} color="#6b7280" />
            <Pressable className="flex-row items-center ml-1">
              <Text className="text-zinc-600 dark:text-zinc-400 mr-1">
                Hyderabad, India
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mt-4">
          <View className="flex-row justify-between gap-1">
            {/* History Button */}
            <Pressable
              className="w-[32%] rounded-xl bg-white dark:bg-white border border-zinc-200 dark:border-zinc-800 p-5 items-center shadow-sm"
              android_ripple={{
                color: Platform.OS === "android" ? "#00000022" : undefined,
              }}
            >
              <MaterialIcons name="history" size={30} color="#0047D4" />
              <Text className="text-sm font-semibold text-zinc-900 dark:text-black mt-2">
                History
              </Text>
            </Pressable>

            {/* Players Button */}
            <Pressable
              className="w-[32%] rounded-xl bg-white dark:bg-white border border-zinc-200 dark:border-zinc-800 p-5 items-center shadow-sm"
              android_ripple={{
                color: Platform.OS === "android" ? "#00000022" : undefined,
              }}
            >
              <MaterialIcons name="groups" size={30} color="#0047D4" />
              <Text className="text-sm font-semibold text-zinc-900 dark:text-black mt-2">
                Players
              </Text>
            </Pressable>

            {/* Schedule Button */}
            <Pressable
              className="w-[32%] rounded-xl bg-white dark:bg-white border border-zinc-200 dark:border-zinc-800 p-5 items-center shadow-sm"
              android_ripple={{
                color: Platform.OS === "android" ? "#00000022" : undefined,
              }}
            >
              <MaterialIcons name="event-available" size={30} color="#0047D4" />
              <Text className="text-sm font-semibold text-zinc-900 dark:text-black mt-2">
                Schedule
              </Text>
            </Pressable>
          </View>
        </View>

        <TournamentSection title="Ongoing" data={ongoingData} />
        <TournamentSection title="Upcoming" data={upcomingData} />
        <TournamentSection title="Finished" data={finishedData} />
      </ScrollView>
    </SafeAreaView>
  );
}
