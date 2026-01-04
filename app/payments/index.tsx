import ScreenWrapper from "@/components/ScreenWrapper";
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

export default function PaymentsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const primary = "#8AFF1A";
  const muted = isDark ? "#9CA3AF" : "#475569";

  const [activeTab, setActiveTab] = useState("Income");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Date range state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedTournament, setSelectedTournament] = useState("All");

  // Date pickers
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const tabs = ["Income", "Refunds", "Payouts"];
  const filters = ["Date Range", "Tournament"];

  const [transactions] = useState([
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

  // Preset helpers
  const applyLastDays = (days: number) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    setStartDate(start);
    setEndDate(end);
    setSelectedFilter(null);
  };

  // Date confirm handlers
  const handleConfirmStart = (date: Date) => {
    setStartDate(date);
    setStartPickerVisible(false);
    if (endDate && endDate < date) setEndDate(null);
  };

  const handleConfirmEnd = (date: Date) => {
    if (startDate && date < startDate) {
      Platform.OS === "android" &&
        ToastAndroid.show(
          "End date cannot be before start date",
          ToastAndroid.SHORT
        );
      setEndPickerVisible(false);
      return;
    }
    setEndDate(date);
    setEndPickerVisible(false);
    setSelectedFilter(null);
  };

  // Filtering logic
  const filteredTransactions = transactions.filter((item) => {
    if (selectedTournament !== "All" && item.tournament !== selectedTournament)
      return false;

    if (startDate && endDate) {
      const txnDate = new Date(item.date);
      if (isNaN(txnDate.getTime())) return true;
      return txnDate >= startDate && txnDate <= endDate;
    }
    return true;
  });

  const dateRangeLabel = () => {
    if (startDate && endDate)
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    if (startDate) return `From ${startDate.toLocaleDateString()}`;
    return null;
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={22} color={muted} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-light-text dark:text-dark-text">
          Payments
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-4 border-b border-light-border dark:border-dark-border">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center pt-4 pb-3 border-b-[3px] ${
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

      {/* Filters */}
      <View className="px-4 pt-3 mb-3">
        <View className="flex-row gap-3 flex-wrap">
          {filters.map((filter) => (
            <View key={filter} style={{ position: "relative" }}>
              <TouchableOpacity
                onPress={() =>
                  setSelectedFilter(selectedFilter === filter ? null : filter)
                }
                className="h-8 px-4 rounded-full bg-light-card dark:bg-dark-card flex-row items-center"
              >
                <Text className="text-sm text-light-text dark:text-dark-text mr-1">
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
                  color={muted}
                />
              </TouchableOpacity>

              {selectedFilter === filter && (
                <View
                  style={{
                    position: "absolute",
                    top: 44,
                    left: 0,
                    minWidth: 220,
                    zIndex: 1000,
                    elevation: 20,
                  }}
                >
                  <View className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
                    {filter === "Date Range" ? (
                      <>
                        <TouchableOpacity
                          className="px-4 py-2"
                          onPress={() => applyLastDays(7)}
                        >
                          <Text className="text-sm text-light-text dark:text-dark-text">
                            Last 7 Days
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="px-4 py-2"
                          onPress={() => applyLastDays(30)}
                        >
                          <Text className="text-sm text-light-text dark:text-dark-text">
                            Last 30 Days
                          </Text>
                        </TouchableOpacity>

                        <View className="border-t border-light-border dark:border-dark-border">
                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => setStartPickerVisible(true)}
                          >
                            <Text className="text-sm text-light-text dark:text-dark-text">
                              Choose Start Date
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => {
                              if (!startDate) {
                                Platform.OS === "android" &&
                                  ToastAndroid.show(
                                    "Choose start date first",
                                    ToastAndroid.SHORT
                                  );
                                return;
                              }
                              setEndPickerVisible(true);
                            }}
                          >
                            <Text className="text-sm text-light-text dark:text-dark-text">
                              Choose End Date
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            className="px-4 py-2"
                            onPress={() => {
                              setStartDate(null);
                              setEndDate(null);
                              setSelectedFilter(null);
                            }}
                          >
                            <Text className="text-sm text-red-500">
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
                        ].map((t) => (
                          <TouchableOpacity
                            key={t}
                            className="px-4 py-2"
                            onPress={() => {
                              setSelectedTournament(t);
                              setSelectedFilter(null);
                            }}
                          >
                            <Text className="text-sm text-light-text dark:text-dark-text">
                              {t}
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

      {/* Transactions */}
      <ScrollView className="flex-1 px-4">
        {loading && (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color={primary} />
          </View>
        )}

        {!loading &&
          filteredTransactions.map((item) => {
            const colors = getStatusColor(item.status);
            return (
              <View
                key={item.id}
                className="flex-row items-center gap-4 bg-light-card dark:bg-dark-card p-4 rounded-2xl mb-3 border border-light-border dark:border-dark-border"
              >
                <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
                  <MaterialIcons
                    name={item.status === "Paid" ? "north-east" : "schedule"}
                    size={22}
                    color={primary}
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-semibold text-light-text dark:text-dark-text">
                    {item.amount}
                  </Text>
                  <Text className="text-sm text-light-muted dark:text-dark-muted">
                    {item.desc}
                  </Text>
                  <Text className="text-xs text-light-muted dark:text-dark-muted">
                    {item.date}
                  </Text>
                </View>

                <View className={`px-3 py-1 rounded-full ${colors.bg}`}>
                  <Text className={`text-xs font-medium ${colors.text}`}>
                    {item.status}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {/* Bottom Button */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="p-4 border-t border-light-border dark:border-dark-border mb-10">
          <TouchableOpacity className="h-12 rounded-xl bg-primary flex-row items-center justify-center gap-2">
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="#000"
            />
            <Text className="font-semibold text-black">Withdraw</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        date={startDate ?? new Date()}
        onConfirm={handleConfirmStart}
        onCancel={() => setStartPickerVisible(false)}
        themeVariant={isDark ? "dark" : "light"}
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        date={endDate ?? startDate ?? new Date()}
        onConfirm={handleConfirmEnd}
        onCancel={() => setEndPickerVisible(false)}
        minimumDate={startDate ?? undefined}
        themeVariant={isDark ? "dark" : "light"}
      />
    </ScreenWrapper>
  );
}
