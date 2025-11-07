import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [activeTab, setActiveTab] = useState("Income");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Date range state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<string>("All");

  // Date pickers (separate controls to avoid Android crash from rapid reopen)
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const tabs = ["Income", "Refunds", "Payouts"];
  const filters = ["Date Range", "Tournament"];

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: "+$50.00",
      desc: "Ticket Sale: John D.",
      date: "Oct 26, 2023, 3:45 PM",
      status: "Paid",
      tournament: "Summer Smash Fest 2024",
    },
    {
      id: 2,
      amount: "+$120.00",
      desc: "Ticket Sale: Ultimate Melee Weekly",
      date: "Oct 25, 2023, 11:10 AM",
      status: "Paid",
      tournament: "Apex Arena Championship",
    },
    {
      id: 3,
      amount: "+$25.00",
      desc: "Ticket Sale: Jane S.",
      date: "Oct 24, 2023, 9:02 PM",
      status: "Pending",
      tournament: "Summer Smash Fest 2024",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return {
          bg: "bg-green-100 dark:bg-green-900/50",
          text: "text-green-700 dark:text-green-300",
        };
      case "Pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/50",
          text: "text-yellow-700 dark:text-yellow-300",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-700/50",
          text: "text-gray-700 dark:text-gray-300",
        };
    }
  };

  // Helpers for presets
  const applyLastDays = (days: number) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (days - 1));
    // Normalize time to start of day for start and end of day for end
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    setStartDate(start);
    setEndDate(end);
    setSelectedFilter(null);
  };

  // Date picker confirm handlers
  const handleConfirmStart = (date: Date) => {
    setStartDate(date);
    setStartPickerVisible(false);
    // if end exists and end < start, clear end
    if (endDate && endDate < date) {
      setEndDate(null);
    }
  };

  const handleConfirmEnd = (date: Date) => {
    // if start exists and end < start, show toast and ignore
    if (startDate && date < startDate) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "End date cannot be before start date",
          ToastAndroid.SHORT
        );
      }
      setEndPickerVisible(false);
      return;
    }
    setEndDate(date);
    setEndPickerVisible(false);
    setSelectedFilter(null);
  };

  // Filtering: tournament + date range if both start & end set
  const filteredTransactions = transactions.filter((item) => {
    if (
      selectedTournament !== "All" &&
      item.tournament !== selectedTournament
    ) {
      return false;
    }

    if (startDate && endDate) {
      // Try to parse the transaction date safely
      const txnDate = new Date(item.date);
      if (isNaN(txnDate.getTime())) {
        // If parsing fails, keep the item (or you may choose to drop)
        return true;
      }
      // Compare inclusive. Normalize txn time to be comparable.
      const txnTime = txnDate.getTime();
      const startTime = new Date(startDate);
      startTime.setHours(0, 0, 0, 0);
      const endTime = new Date(endDate);
      endTime.setHours(23, 59, 59, 999);
      return txnTime >= startTime.getTime() && txnTime <= endTime.getTime();
    }

    return true;
  });

  // Format helper for header pill
  const dateRangeLabel = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    if (startDate && !endDate) return `From ${startDate.toLocaleDateString()}`;
    return null;
  };

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
          Payments
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ===== Tabs ===== */}
      <View className="flex-row border-b border-gray-200 dark:border-gray-700 px-4 justify-between mx-3">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`items-center justify-center border-b-[3px] ${
              activeTab === tab ? "border-b-blue-600" : "border-b-transparent"
            } pb-[13px] pt-4 mx-2`}
          >
            <Text
              className={`text-m font-semibold tracking-[0.015em] ${
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

      {/* ===== Filters (container position: relative so dropdown absolute can anchor) ===== */}
      <View className="px-4 pt-3 pb-1">
        <View className="flex flex-row flex-wrap gap-3">
          {filters.map((filter) => (
            <View key={filter} style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedFilter(selectedFilter === filter ? null : filter)
                }
                className="flex h-8 flex-row items-center justify-center gap-x-2 rounded-full bg-gray-200/60 dark:bg-gray-700/50 pl-4 pr-3"
              >
                <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {filter === "Date Range" && dateRangeLabel()
                    ? dateRangeLabel()
                    : filter === "Tournament" && selectedTournament !== "All"
                      ? selectedTournament
                      : filter}
                </Text>
                <MaterialIcons
                  name={
                    selectedFilter === filter ? "expand-less" : "expand-more"
                  }
                  size={18}
                  color={isDark ? "#9ca3af" : "#4b5563"}
                />
              </TouchableOpacity>

              {/* Absolute dropdown to overlay cards (not push layout) */}
              {selectedFilter === filter && (
                <View
                  style={{
                    position: "absolute",
                    top: 44,
                    left: 0,
                    // keep width contained or stretch if you prefer
                    minWidth: 220,
                    zIndex: 1000,
                    elevation: 20,
                  }}
                >
                  <View className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A2233] shadow-sm">
                    {filter === "Date Range" ? (
                      <>
                        <TouchableOpacity
                          className="px-4 py-2"
                          onPress={() => {
                            applyLastDays(7);
                          }}
                        >
                          <Text className="text-sm text-gray-700 dark:text-gray-200">
                            Last 7 Days
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="px-4 py-2"
                          onPress={() => {
                            applyLastDays(30);
                          }}
                        >
                          <Text className="text-sm text-gray-700 dark:text-gray-200">
                            Last 30 Days
                          </Text>
                        </TouchableOpacity>

                        {/* Custom Range: show two buttons which open separate pickers */}
                        <View className="px-2 py-2 border-t border-gray-100 dark:border-gray-700">
                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => {
                              if (Platform.OS === "android") {
                                ToastAndroid.show(
                                  "Choose Start Date",
                                  ToastAndroid.SHORT
                                );
                              }
                              setStartPickerVisible(true);
                            }}
                          >
                            <Text className="text-sm text-gray-700 dark:text-gray-200">
                              Choose Start Date
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => {
                              if (!startDate) {
                                if (Platform.OS === "android") {
                                  ToastAndroid.show(
                                    "Please choose a start date first",
                                    ToastAndroid.SHORT
                                  );
                                }
                                return;
                              }
                              if (Platform.OS === "android") {
                                ToastAndroid.show(
                                  "Choose End Date",
                                  ToastAndroid.SHORT
                                );
                              }
                              setEndPickerVisible(true);
                            }}
                          >
                            <Text className="text-sm text-gray-700 dark:text-gray-200">
                              Choose End Date
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => {
                              // clear range
                              setStartDate(null);
                              setEndDate(null);
                              setSelectedFilter(null);
                            }}
                          >
                            <Text className="text-sm text-red-600 dark:text-red-400">
                              Clear Range
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        {[
                          "All",
                          "Summer Smash Fest 2024",
                          "Apex Arena Championship",
                        ].map((tournament) => (
                          <TouchableOpacity
                            key={tournament}
                            className="px-4 py-2"
                            onPress={() => {
                              setSelectedTournament(tournament);
                              setSelectedFilter(null);
                            }}
                          >
                            <Text className="text-sm text-gray-700 dark:text-gray-200">
                              {tournament}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* ===== Transactions ===== */}
      <ScrollView
        className="flex-1 space-y-4 px-4"
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        )}

        {!loading &&
          filteredTransactions.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <View
                key={item.id}
                className="flex flex-row items-center gap-4 bg-white dark:bg-[#1A2233] p-4 rounded-xl shadow-sm mb-3"
              >
                <View
                  className={`flex size-12 items-center justify-center rounded-full ${
                    item.status === "Paid"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : "bg-yellow-100 dark:bg-yellow-900/50"
                  }`}
                >
                  <MaterialIcons
                    name={item.status === "Paid" ? "north-east" : "schedule"}
                    size={24}
                    color={
                      item.status === "Paid"
                        ? isDark
                          ? "#4ade80"
                          : "#16a34a"
                        : isDark
                          ? "#facc15"
                          : "#ca8a04"
                    }
                  />
                </View>

                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900 dark:text-white">
                    {item.amount}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </Text>
                  <Text className="text-xs text-gray-400 dark:text-gray-500">
                    {item.date}
                  </Text>
                </View>

                <View
                  className={`flex items-center justify-center rounded-full px-3 py-1 ${colors.bg}`}
                >
                  <Text className={`text-xs font-medium ${colors.text}`}>
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {/* ===== Bottom Button ===== */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white/90 dark:bg-[#101622]/90 mb-8">
          <TouchableOpacity className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 flex-row gap-2">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="#fff"
            />
            <Text className="text-white font-bold text-base">Withdraw</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* ===== Separate Date Pickers (no auto-reopen) ===== */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        date={startDate ?? new Date()}
        onConfirm={handleConfirmStart}
        onCancel={() => setStartPickerVisible(false)}
        maximumDate={new Date(2100, 0, 1)}
        themeVariant={isDark ? "dark" : "light"}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        date={endDate ?? startDate ?? new Date()}
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndPickerVisible(false)}
        // ensure end can't be before start (UI hint)
        minimumDate={startDate ?? undefined}
        maximumDate={new Date(2100, 0, 1)}
        themeVariant={isDark ? "dark" : "light"}
      />
    </SafeAreaView>
  );
}
