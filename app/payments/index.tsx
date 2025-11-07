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
  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );
  const [selectedTournament, setSelectedTournament] = useState<string>("All");

  // Date Picker States
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleDateConfirm = (date: Date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      setIsSelectingStartDate(false);
      setDatePickerVisible(false);

      setTimeout(() => {
        if (Platform.OS === "android") {
          ToastAndroid.show("Select End Date", ToastAndroid.SHORT);
        }
        setDatePickerVisible(true);
      }, 600);
    } else {
      setEndDate(date);
      setSelectedDateRange(
        `${startDate?.toLocaleDateString()} - ${date.toLocaleDateString()}`
      );
      setDatePickerVisible(false);
      setIsSelectingStartDate(true);
      setSelectedFilter(null);
    }
  };

  const filteredTransactions = transactions.filter((item) => {
    if (selectedTournament !== "All" && item.tournament !== selectedTournament)
      return false;
    return true;
  });

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

      {/* ===== Filters ===== */}
      <View className="flex flex-row flex-wrap gap-3 p-4">
        {filters.map((filter) => (
          <View key={filter}>
            <TouchableOpacity
              onPress={() =>
                setSelectedFilter(selectedFilter === filter ? null : filter)
              }
              className="flex h-8 flex-row items-center justify-center gap-x-2 rounded-full bg-gray-200/60 dark:bg-gray-700/50 pl-4 pr-3"
            >
              <Text className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {filter === "Date Range" && selectedDateRange
                  ? selectedDateRange
                  : filter === "Tournament" && selectedTournament !== "All"
                    ? selectedTournament
                    : filter}
              </Text>
              <MaterialIcons
                name={selectedFilter === filter ? "expand-less" : "expand-more"}
                size={18}
                color={isDark ? "#9ca3af" : "#4b5563"}
              />
            </TouchableOpacity>

            {/* Dropdown options */}
            {selectedFilter === filter && (
              <View className="mt-2 ml-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A2233] shadow-sm">
                {filter === "Date Range" ? (
                  <>
                    <TouchableOpacity
                      className="px-4 py-2"
                      onPress={() => {
                        setSelectedDateRange("Last 7 Days");
                        setSelectedFilter(null);
                      }}
                    >
                      <Text className="text-sm text-gray-700 dark:text-gray-200">
                        Last 7 Days
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-4 py-2"
                      onPress={() => {
                        setSelectedDateRange("Last 30 Days");
                        setSelectedFilter(null);
                      }}
                    >
                      <Text className="text-sm text-gray-700 dark:text-gray-200">
                        Last 30 Days
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-4 py-2"
                      onPress={() => {
                        if (Platform.OS === "android") {
                          ToastAndroid.show(
                            "Select Start Date",
                            ToastAndroid.SHORT
                          );
                        }
                        setDatePickerVisible(true);
                        setIsSelectingStartDate(true);
                      }}
                    >
                      <Text className="text-sm text-gray-700 dark:text-gray-200">
                        Custom Range
                      </Text>
                    </TouchableOpacity>
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
            )}
          </View>
        ))}
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

      {/* ===== Date Picker (outside scroll, safe) ===== */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={
          isSelectingStartDate ? startDate || new Date() : endDate || new Date()
        }
        onConfirm={handleDateConfirm}
        onCancel={() => {
          setDatePickerVisible(false);
          setIsSelectingStartDate(true);
        }}
        minimumDate={!isSelectingStartDate && startDate ? startDate : undefined}
        themeVariant={isDark ? "dark" : "light"}
        customHeaderIOS={() => (
          <View className="items-center py-2">
            <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {isSelectingStartDate ? "Select Start Date" : "Select End Date"}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
