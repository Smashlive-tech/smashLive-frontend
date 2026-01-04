import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function EventsScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();
  const isDark = useColorScheme() === "dark";

  const PRIMARY = "#8AFF1A";
  const MUTED = isDark ? "#9CA3AF" : "#6B7280";

  const [activeTab, setActiveTab] = useState("Create");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["Create", "Configure", "Schedule", "Live", "Complete"];

  // ===== Mock Data (UNCHANGED) =====
  const fetchEvents = async (status: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    if (status === "Create") {
      setEvents([
        {
          id: 1,
          name: "Men's Singles",
          date: "Nov 12 - Nov 15, 2025",
          status: "Pending",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgIP5TMU9ep-Czp5tmnng1sgWN6d8lVE2dq039uQXvXXBO4-b9ySkMa3hFiqI8mUj28UajA_l67z7owBE0nL1Q0nmNOPcdMhs2L5_1Vd3R9jczzFYNPp4TijfkeGi3Cay_hG4-vlu8Yk86-xzXQ4l9N8K6FeLR0NnLhCPgxSiWAaBhXsqSbJw5rL97adol8mMcO1k5oI-yxwucjMI1RCcrWWbdpbY8GjG7W0hyB63dEuu7gHoI6NauXsl3E13uccIYbgIWVm6P2ZC",
        },
        {
          id: 2,
          name: "Women's Doubles",
          date: "Nov 14 - Nov 17, 2025",
          status: "Pending",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgIP5TMU9ep-Czp5tmnng1sgWN6d8lVE2dq039uQXvXXBO4-b9ySkMa3hFiqI8mUj28UajA_l67z7owBE0nL1Q0nmNOPcdMhs2L5_1Vd3R9jczzFYNPp4TijfkeGi3Cay_hG4-vlu8Yk86-xzXQ4l9N8K6FeLR0NnLhCPgxSiWAaBhXsqSbJw5rL97adol8mMcO1k5oI-yxwucjMI1RCcrWWbdpbY8GjG7W0hyB63dEuu7gHoI6NauXsl3E13uccIYbgIWVm6P2ZC",
        },
      ]);
    } else if (status === "Configure") {
      setEvents([
        {
          id: 3,
          name: "Under 19 Singles",
          date: "Nov 10 - Nov 12, 2025",
          status: "Configuring",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBOjG2Dm456BaRaJc8scsloNW00wkdFO2Jvy_AINM_72HZn_9Wlv-MoOCJEORtUB3UVhVbchhulhg-lvD-LYgOPjdY4ZVffK5TvQYkrdzgb9Wyk6cpLiH7K__jEYq4kL7Hw6X9G1uupJ6jJfjn-75ebGxHjvWq18P2tiFApyd4jLDnDYfrIT7zNXxkB6KmVxctsDKme8cAy3XYFH98L-IOZBv26EhnNn6X9Z3pM7CVMgmahHYkH_UnwHShonn1GmH5lpyyXN-hsVmdB",
        },
      ]);
    } else if (status === "Schedule") {
      setEvents([
        {
          id: 4,
          name: "Junior Championship",
          date: "Nov 18 - Nov 20, 2025",
          status: "Scheduled",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAAAFcIe4mrHYMIrzuddMcoV52lFn0ZlCyXyETyiHosthqNG3taU3E8cBl1R6EzFOqh7SIuRFXjq-X1mecVVONa6CZ3aDTvahP-gtYyd3aW78x8eREz5frZTPwchkqO8YzgZy6lFeNqNXLXutJZoVPYaSiFII0poE3xGEjjTtb_mj70uayt-EdFE8TY8OfFdQz2FQj7fuCCaj0Qnmm6Ch8sLpMXGJnlnPjgQX0gJ5UiuXFRrX7lrShh7qYQa2vlpohi5wYLqNsFYmWo",
        },
      ]);
    } else if (status === "Live") {
      setEvents([
        {
          id: 5,
          name: "Men’s Division Finals",
          date: "Nov 21 - Nov 22, 2025",
          status: "Live",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Y8JQnBGHQpKoK6dM397KSxy3vBfxT5VI8yKO3Q-trKwBnw4PRCQ1Xn8DsD5QXBKKUhGcu9Q_i9zfXLfxVv2bIEfHxCHGJUeqCaD5L_uVoY1SSEYpN0daXVLCa8MMf4iFQ78S8Oist19ieCIpgLGT2R27xiSw3h0OUhdFQQE8vomb8oRKO0hN3BN8gvKc-2iDluUI7v36V7q0C8JCYPAWyiUSz74MyYHVy3I4fx8J81ULJzlmS9_iDF_F67PPE8_Zouaw8As",
        },
      ]);
    } else if (status === "Complete") {
      setEvents([
        {
          id: 6,
          name: "Veterans League",
          date: "Nov 01 - Nov 03, 2025",
          status: "Completed",
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Y8JQnBGHQpKoK6dM397KSxy3vBfxT5VI8yKO3Q-trKwBnw4PRCQ1Xn8DsD5QXBKKUhGcu9Q_i9zfXLfxVv2bIEfHxCHGJUeqCaD5L_uVoY1SSEYpN0daXVLCa8MMf4iFQ78S8Oist19ieCIpgLGT2R27xiSw3h0OUhdFQQE8vomb8oRKO0hN3BN8gvKc-2iDluUI7v36V7q0C8JCYPAWyiUSz74MyYHVy3I4fx8J81ULJzlmS9_iDF_F67PPE8_Zouaw8As",
        },
      ]);
    } else setEvents([]);

    setLoading(false);
  };

  useEffect(() => {
    fetchEvents(activeTab);
  }, [activeTab]);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={MUTED} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          Events
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-between border-b border-light-border dark:border-dark-border px-4 mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`pb-3 pt-4 border-b-[3px] ${
              activeTab === tab ? "border-primary" : "border-transparent"
            }`}
          >
            <Text
              className={`font-semibold ${
                activeTab === tab
                  ? "text-primary"
                  : "text-light-muted dark:text-dark-muted"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="items-center py-20">
            <ActivityIndicator size="large" color={PRIMARY} />
          </View>
        ) : (
          events.map((event) => (
            <View
              key={event.id}
              className="bg-light-card dark:bg-dark-card rounded-2xl mb-4 border border-light-border dark:border-dark-border"
            >
              <View className="flex-row gap-4 p-4 items-center">
                <Image
                  source={{ uri: event.image }}
                  className="w-20 h-20 rounded-xl"
                />

                <View className="flex-1">
                  <Text className="font-semibold text-light-text dark:text-dark-text">
                    {event.name}
                  </Text>
                  <Text className="text-sm text-light-muted dark:text-dark-muted mt-1">
                    {event.date}
                  </Text>
                </View>

                {activeTab !== "Create" && (
                  <TouchableOpacity className="bg-primary px-5 h-9 rounded-lg items-center justify-center">
                    <Text className="text-black font-semibold text-sm">
                      {activeTab === "Configure" ? "Edit" : "Manage"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Add */}
      {activeTab === "Create" && (
        <TouchableOpacity
          className="absolute bottom-12 right-6 h-14 w-14 rounded-full items-center justify-center shadow-lg"
          style={{ backgroundColor: PRIMARY }}
          onPress={() => router.push("/events/create_event")}
        >
          <Ionicons name="add" size={30} color="#000" />
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
}
