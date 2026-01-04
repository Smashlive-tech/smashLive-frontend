import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export default function MyTournamentsScreen() {
  const [activeTab, setActiveTab] = useState("Running");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  const tabs = ["Running", "Upcoming", "Past"];

  const fetchTournaments = async (status: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const allTournaments = [
      {
        id: 1,
        title: "Summer Smash Fest 2024",
        date: "Aug 15 - Aug 18, 2024",
        category: "Running",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBOjG2Dm456BaRaJc8scsloNW00wkdFO2Jvy_AINM_72HZn_9Wlv-MoOCJEORtUB3UVhVbchhulhg-lvD-LYgOPjdY4ZVffK5TvQYkrdzgb9Wyk6cpLiH7K__jEYq4kL7Hw6X9G1uupJ6jJfjn-75ebGxHjvWq18P2tiFApyd4jLDnDYfrIT7zNXxkB6KmVxctsDKme8cAy3XYFH98L-IOZBv26EhnNn6X9Z3pM7CVMgmahHYkH_UnwHShonn1GmH5lpyyXN-hsVmdB",
      },
      {
        id: 2,
        title: "Apex Arena Championship",
        date: "Sep 01 - Sep 03, 2024",
        category: "Upcoming",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgIP5TMU9ep-Czp5tmnng1sgWN6d8lVE2dq039uQXvXXBO4-b9ySkMa3hFiqI8mUj28UajA_l67z7owBE0nL1Q0nmNOPcdMhs2L5_1Vd3R9jczzFYNPp4TijfkeGi3Cay_hG4-vlu8Yk86-xzXQ4l9N8K6FeLR0NnLhCPgxSiWAaBhXsqSbJw5rL97adol8mMcO1k5oI-yxwucjMI1RCcrWWbdpbY8GjG7W0hyB63dEuu7gHoI6NauXsl3E13uccIYbgIWVm6P2ZC",
      },
      {
        id: 3,
        title: "Valorant Vanguard League",
        date: "Jun 10 - Jun 15, 2024",
        category: "Past",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Y8JQnBGHQpKoK6dM397KSxy3vBfxT5VI8yKO3Q-trKwBnw4PRCQ1Xn8DsD5QXBKKUhGcu9Q_i9zfXLfxVv2bIEfHxCHGJUeqCaD5L_uVoY1SSEYpN0daXVLCa8MMf4iFQ78S8Oist19ieCIpgLGT2R27xiSw3h0OUhdFQQE8vomb8oRKO0hN3BN8gvKc-2iDluUI7v36V7q0C8JCYPAWyiUSz74MyYHVy3I4fx8J81ULJzlmS9_iDF_F67PPE8_Zouaw8As",
      },
    ];

    setTournaments(allTournaments.filter((t) => t.category === status));
    setLoading(false);
  };

  useEffect(() => {
    fetchTournaments(activeTab);
  }, [activeTab]);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={muted} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          My Tournaments
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 border-b border-light-border dark:border-dark-border">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center pb-3 pt-4 border-b-[3px] ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
          >
            <Text
              className={`font-semibold ${
                activeTab === tab
                  ? "text-light-text dark:text-primary"
                  : "text-light-muted dark:text-dark-muted"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {loading && (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color={primary} />
          </View>
        )}

        {!loading &&
          tournaments.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center gap-4 bg-light-card dark:bg-dark-card p-4 rounded-2xl mb-4 border border-light-border dark:border-dark-border"
            >
              {/* Image */}
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-xl"
              />

              {/* Info */}
              <View className="flex-1">
                <Text className="text-base font-semibold text-light-text dark:text-dark-text">
                  {item.title}
                </Text>

                <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                  {item.date}
                </Text>
              </View>

              {/* Action */}
              <TouchableOpacity
                onPress={() => router.push(`/events/${item.id}`)}
                className="bg-primary h-10 px-6 rounded-full items-center justify-center"
              >
                <Text className="text-black font-semibold">Open</Text>
              </TouchableOpacity>
            </View>
          ))}

        {!loading && tournaments.length === 0 && (
          <View className="items-center py-16">
            <Ionicons
              name="trophy-outline"
              size={48}
              color={muted}
              style={{ marginBottom: 12 }}
            />
            <Text className="font-semibold text-light-text dark:text-dark-text">
              No {activeTab} Tournaments
            </Text>
            <Text className="text-light-muted dark:text-dark-muted mt-1 text-center">
              When tournaments are available, they’ll appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
