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
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyTournamentsScreen() {
  const [activeTab, setActiveTab] = useState("Running");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const tabs = ["Running", "Upcoming", "Past"];

  // ===== Mock API simulation with filtering logic =====
  const fetchTournaments = async (status: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate delay

    // All tournaments
    const allTournaments = [
      {
        id: 1,
        title: "Summer Smash Fest 2024",
        date: "Aug 15 - Aug 18, 2024",
        status: "Live",
        category: "Running",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBOjG2Dm456BaRaJc8scsloNW00wkdFO2Jvy_AINM_72HZn_9Wlv-MoOCJEORtUB3UVhVbchhulhg-lvD-LYgOPjdY4ZVffK5TvQYkrdzgb9Wyk6cpLiH7K__jEYq4kL7Hw6X9G1uupJ6jJfjn-75ebGxHjvWq18P2tiFApyd4jLDnDYfrIT7zNXxkB6KmVxctsDKme8cAy3XYFH98L-IOZBv26EhnNn6X9Z3pM7CVMgmahHYkH_UnwHShonn1GmH5lpyyXN-hsVmdB",
      },
      {
        id: 2,
        title: "Apex Arena Championship",
        date: "Sep 01 - Sep 03, 2024",
        status: "Scheduled",
        category: "Upcoming",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgIP5TMU9ep-Czp5tmnng1sgWN6d8lVE2dq039uQXvXXBO4-b9ySkMa3hFiqI8mUj28UajA_l67z7owBE0nL1Q0nmNOPcdMhs2L5_1Vd3R9jczzFYNPp4TijfkeGi3Cay_hG4-vlu8Yk86-xzXQ4l9N8K6FeLR0NnLhCPgxSiWAaBhXsqSbJw5rL97adol8mMcO1k5oI-yxwucjMI1RCcrWWbdpbY8GjG7W0hyB63dEuu7gHoI6NauXsl3E13uccIYbgIWVm6P2ZC",
      },
      {
        id: 3,
        title: "Valorant Vanguard League",
        date: "Jun 10 - Jun 15, 2024",
        status: "Completed",
        category: "Past",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Y8JQnBGHQpKoK6dM397KSxy3vBfxT5VI8yKO3Q-trKwBnw4PRCQ1Xn8DsD5QXBKKUhGcu9Q_i9zfXLfxVv2bIEfHxCHGJUeqCaD5L_uVoY1SSEYpN0daXVLCa8MMf4iFQ78S8Oist19ieCIpgLGT2R27xiSw3h0OUhdFQQE8vomb8oRKO0hN3BN8gvKc-2iDluUI7v36V7q0C8JCYPAWyiUSz74MyYHVy3I4fx8J81ULJzlmS9_iDF_F67PPE8_Zouaw8As",
      },
    ];

    const filtered = allTournaments.filter((t) => t.category === status);
    setTournaments(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchTournaments(activeTab);
  }, [activeTab]);

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
          My Tournaments
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ===== Tabs (same styling) ===== */}
      <View className="flex-row border-b border-gray-200 dark:border-gray-700 px-4 justify-between">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`items-center justify-center border-b-[3px] ${
              activeTab === tab ? "border-b-blue-600" : "border-b-transparent"
            } pb-[13px] pt-4 mx-2`}
          >
            <Text
              className={`text-m font-semibold leading-normal tracking-[0.015em] ${
                activeTab === tab
                  ? "text-gray-900 dark:text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== Main Content ===== */}
      <ScrollView
        className="flex-1 space-y-4 p-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Loading */}
        {loading && (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        )}

        {/* Tournament Cards */}
        {!loading && tournaments.length > 0 && (
          <>
            {tournaments.map((item) => (
              <View
                key={item.id}
                className="flex flex-row items-center gap-5 bg-white dark:bg-[#1A2233] p-5 rounded-xl shadow-sm mb-3"
              >
                {/* Image */}
                <Image
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("../../../assets/images/android-icon-foreground.png")
                  }
                  className="w-16 h-16 rounded-lg bg-center"
                  resizeMode="cover"
                />

                {/* Tournament Info */}
                <View className="flex-1 min-w-0">
                  <View className="flex-row justify-between items-start gap-2">
                    <Text className="text-[14px] font-semibold leading-normal text-gray-900 dark:text-gray-100 flex-1">
                      {item.title}
                    </Text>
                    <View
                      className={`rounded-full px-2.5 py-0.5 ${
                        item.status === "Live"
                          ? "bg-green-600"
                          : item.status === "Scheduled"
                            ? "bg-blue-500"
                            : item.status === "Completed"
                              ? "bg-orange-500"
                              : "bg-gray-500"
                      }`}
                    >
                      <Text className="text-xs font-medium text-white">
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[15px] text-gray-600 dark:text-gray-400 mt-1">
                    {item.date}
                  </Text>
                </View>

                {/* Button */}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/schedule",
                      params: {
                        tournamentId: item.id,
                      },
                    })
                  }
                  className="bg-blue-600 rounded-lg h-10 px-5 items-center justify-center"
                >
                  <Text className="text-white text-[15px] font-semibold">
                    Open
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        {/* Empty State */}
        {!loading && tournaments.length === 0 && (
          <View className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-[#101622]">
            <Ionicons
              name="trophy-outline"
              size={48}
              color={isDark ? "#9ca3af" : "#6b7280"}
              style={{ marginBottom: 12 }}
            />
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              No {activeTab} Tournaments
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              When {activeTab.toLowerCase()} tournaments are available, they’ll
              appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
