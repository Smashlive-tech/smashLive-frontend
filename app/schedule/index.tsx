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
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const router = useRouter();
  const { tournamentId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState("Create");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["Create", "Configure", "Schedule", "Live", "Complete"];

  // ===== Mock Data =====
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
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-[#101622]">
      {/* ===== Header ===== */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDark ? "#f9fafb" : "#111827"}
          />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Events
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ===== Tabs ===== */}
      <View className="flex-row border-b border-gray-200 dark:border-gray-700 px-4 justify-between mb-4">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`items-center justify-center border-b-[3px] ${
              activeTab === tab ? "border-b-[#0d59f2]" : "border-b-transparent"
            } pb-[13px] pt-4 mx-2`}
          >
            <Text
              className={`text-m font-semibold leading-normal tracking-[0.015em] ${
                activeTab === tab
                  ? "text-[#0d59f2]"
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
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#0d59f2" />
          </View>
        ) : events.length > 0 ? (
          <>
            {events.map((event) => (
              <View
                key={event.id}
                className="flex flex-row items-center gap-5 bg-white dark:bg-[#1A2233] p-5 rounded-xl shadow-sm mb-3 border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <Image
                  source={{ uri: event.image }}
                  className="w-16 h-16 rounded-lg bg-center"
                  resizeMode="cover"
                />

                {/* Info */}
                <View className="flex-1 min-w-0">
                  <View className="flex-row justify-between items-start gap-2">
                    <Text className="text-[16px] font-semibold leading-normal text-gray-900 dark:text-gray-100 flex-1">
                      {event.name}
                    </Text>
                    <View
                      className={`rounded-full px-2.5 py-0.5 ${
                        event.status === "Live"
                          ? "bg-green-600"
                          : event.status === "Scheduled"
                            ? "bg-blue-500"
                            : event.status === "Completed"
                              ? "bg-orange-500"
                              : event.status === "Configuring"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                      }`}
                    >
                      <Text className="text-xs font-medium text-white">
                        {event.status}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-[14px] text-gray-600 dark:text-gray-400 mt-1">
                    {event.date}
                  </Text>
                </View>

                {/* Button */}
                {activeTab !== "Create" && (
                  <TouchableOpacity
                    onPress={() => console.log("Action on:", event.name)}
                    className="bg-[#0d59f2] rounded-lg h-10 px-5 items-center justify-center"
                  >
                    <Text className="text-white text-[15px] font-semibold">
                      {activeTab === "Configure" ? "Edit" : "Manage"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </>
        ) : (
          <View className="flex flex-col items-center justify-center text-center py-16 px-4">
            <Ionicons
              name="calendar-outline"
              size={48}
              color={isDark ? "#9ca3af" : "#6b7280"}
              style={{ marginBottom: 12 }}
            />
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              No {activeTab} Events
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Start by creating a new event for this tournament.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button (only in Create tab) */}
      {activeTab === "Create" && (
        <TouchableOpacity
          activeOpacity={0.85}
          className="absolute bottom-12 right-6 bg-[#0d59f2] rounded-full h-14 w-14 items-center justify-center shadow-lg active:scale-95"
          onPress={() => router.push("/schedule/create_event")}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
