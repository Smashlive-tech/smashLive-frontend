import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEventScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [eventName, setEventName] = useState("");
  const [eventFormat, setEventFormat] = useState("");
  const [matchType, setMatchType] = useState("");
  const [level, setLevel] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [bornAfter, setBornAfter] = useState("");

  // dropdown state
  const [openFormat, setOpenFormat] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);

  const [errors, setErrors] = useState<{
    eventName?: string;
    eventFormat?: string;
    matchType?: string;
    level?: string;
    maxParticipants?: string;
    bornAfter?: string;
  }>({});

  const validateAll = () => {
    const next: typeof errors = {};

    if (!eventName.trim()) next.eventName = "Event name is required.";
    if (!eventFormat) next.eventFormat = "Please select an event format.";
    if (!matchType) next.matchType = "Please select a match type.";
    if (!level) next.level = "Please select a level.";

    if (!maxParticipants.trim())
      next.maxParticipants = "Enter max participants.";
    else {
      const n = Number(maxParticipants);
      if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
        next.maxParticipants = "Enter a valid positive whole number.";
      }
    }

    if (bornAfter.trim()) {
      const yr = Number(bornAfter);
      const nowYr = new Date().getFullYear();
      if (!/^\d{4}$/.test(bornAfter) || yr < 1900 || yr > nowYr) {
        next.bornAfter = `Enter a valid year between 1900 and ${nowYr}.`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleCreateEvent = () => {
    if (!validateAll()) return;

    const payload = {
      eventName: eventName.trim(),
      eventFormat,
      matchType,
      level,
      maxParticipants: Number(maxParticipants),
      bornAfter: bornAfter.trim() ? bornAfter.trim() : null,
    };

    console.log("Create event payload:", payload);
    router.back();
  };

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const bgInput = isDark ? "#2a3245" : "#f3f4f6";
  const textColor = isDark ? "white" : "black";
  const placeholderColor = isDark ? "#9ca3af" : "#6b7280";

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
          Create New Event
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* ===== Keyboard-Aware Form ===== */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 40}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1 px-5"
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          >
            <View className="bg-white dark:bg-[#1A2233] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              {/* Event Name */}
              <View className="mb-5">
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Event Name
                </Text>
                <TextInput
                  value={eventName}
                  onChangeText={(t) => {
                    setEventName(t);
                    clearError("eventName");
                  }}
                  placeholder="Enter event name"
                  placeholderTextColor={placeholderColor}
                  style={{
                    backgroundColor: bgInput,
                    color: textColor,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: errors.eventName ? 1.5 : 0,
                    borderColor: errors.eventName ? "#ef4444" : "transparent",
                  }}
                />
                {errors.eventName && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.eventName}
                  </Text>
                )}
              </View>

              {/* Event Format */}
              <View className="mb-5 z-50">
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Event Format
                </Text>
                <DropDownPicker
                  open={openFormat}
                  value={eventFormat}
                  items={[
                    { label: "Knockout", value: "Knockout" },
                    { label: "Round Robin", value: "Round Robin" },
                    {
                      label: "Double Elimination",
                      value: "Double Elimination",
                    },
                    { label: "Group + Knockout", value: "Group + Knockout" },
                    { label: "Team Format", value: "Team Format" },
                    { label: "Ladder", value: "Ladder" },
                    { label: "Swiss Format", value: "Swiss Format" },
                  ]}
                  setOpen={setOpenFormat}
                  listMode="SCROLLVIEW"
                  setValue={setEventFormat}
                  placeholder="Select format"
                  placeholderStyle={{ color: placeholderColor }}
                  style={{
                    backgroundColor: bgInput,
                    borderColor: errors.eventFormat ? "#ef4444" : "transparent",
                  }}
                  textStyle={{ color: textColor }}
                  dropDownContainerStyle={{
                    backgroundColor: bgInput,
                    borderColor: "#4b5563",
                  }}
                  onChangeValue={() => clearError("eventFormat")}
                />
                {errors.eventFormat && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.eventFormat}
                  </Text>
                )}
              </View>

              {/* Match Type */}
              <View className="mb-5 z-40">
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Match Type
                </Text>
                <DropDownPicker
                  open={openMatch}
                  value={matchType}
                  items={[
                    { label: "Men's Singles", value: "Men's Singles" },
                    { label: "Men's Doubles", value: "Men's Doubles" },
                    { label: "Women's Singles", value: "Women's Singles" },
                    { label: "Women's Doubles", value: "Women's Doubles" },
                    { label: "Mixed Doubles", value: "Mixed Doubles" },
                  ]}
                  listMode="SCROLLVIEW"
                  setOpen={setOpenMatch}
                  setValue={setMatchType}
                  placeholder="Select match type"
                  placeholderStyle={{ color: placeholderColor }}
                  style={{
                    backgroundColor: bgInput,
                    borderColor: errors.matchType ? "#ef4444" : "transparent",
                  }}
                  textStyle={{ color: textColor }}
                  dropDownContainerStyle={{
                    backgroundColor: bgInput,
                    borderColor: "#4b5563",
                  }}
                  onChangeValue={() => clearError("matchType")}
                />
                {errors.matchType && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.matchType}
                  </Text>
                )}
              </View>

              {/* Level */}
              <View className="mb-5 z-30">
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Level
                </Text>
                <DropDownPicker
                  open={openLevel}
                  value={level}
                  items={[
                    { label: "Beginner", value: "Beginner" },
                    { label: "Intermediate", value: "Intermediate" },
                    { label: "Expert", value: "Expert" },
                    { label: "Professional", value: "Professional" },
                  ]}
                  listMode="SCROLLVIEW"
                  setOpen={setOpenLevel}
                  setValue={setLevel}
                  placeholder="Select level"
                  placeholderStyle={{ color: placeholderColor }}
                  style={{
                    backgroundColor: bgInput,
                    borderColor: errors.level ? "#ef4444" : "transparent",
                  }}
                  textStyle={{ color: textColor }}
                  dropDownContainerStyle={{
                    backgroundColor: bgInput,
                    borderColor: "#4b5563",
                  }}
                  onChangeValue={() => clearError("level")}
                />
                {errors.level && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.level}
                  </Text>
                )}
              </View>

              {/* Max Participants */}
              <View className="mb-5">
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Max Participants
                </Text>
                <TextInput
                  value={maxParticipants}
                  onChangeText={(t) => {
                    setMaxParticipants(t);
                    clearError("maxParticipants");
                  }}
                  placeholder="Enter max number of participants"
                  keyboardType="numeric"
                  placeholderTextColor={placeholderColor}
                  style={{
                    backgroundColor: bgInput,
                    color: textColor,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: errors.maxParticipants ? 1.5 : 0,
                    borderColor: errors.maxParticipants
                      ? "#ef4444"
                      : "transparent",
                  }}
                />
                {errors.maxParticipants && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.maxParticipants}
                  </Text>
                )}
              </View>

              {/* Players Born After */}
              <View>
                <Text className="text-[15px] font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Players Born After (Optional)
                </Text>
                <TextInput
                  value={bornAfter}
                  onChangeText={(t) => {
                    setBornAfter(t);
                    clearError("bornAfter");
                  }}
                  placeholder="e.g. 2005"
                  keyboardType="numeric"
                  placeholderTextColor={placeholderColor}
                  style={{
                    backgroundColor: bgInput,
                    color: textColor,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: errors.bornAfter ? 1.5 : 0,
                    borderColor: errors.bornAfter ? "#ef4444" : "transparent",
                  }}
                />
                {errors.bornAfter && (
                  <Text className="text-sm text-red-600 dark:text-red-400 mt-2">
                    {errors.bornAfter}
                  </Text>
                )}
              </View>
            </View>

            {/* Create Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleCreateEvent}
              className="bg-[#0d59f2] py-3 rounded-lg items-center justify-center mt-8 mb-8"
            >
              <Text className="text-white font-semibold text-[16px]">
                Create Event
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
