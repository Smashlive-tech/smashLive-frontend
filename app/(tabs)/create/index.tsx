import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

type TournamentForm = {
  tournamentName: string;
  description: string;
  contactName: string;
  contactPhone: string;
  profilePic?: string;
  sponsorPic?: string;
  venue: string;
  address: string;
  city: string;
  timezone: string;
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  regEndDate: Date | null;
  entryFee: string;
  extraFee: string;
  payAtVenue: boolean;
};

const CreateTournament: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [errors, setErrors] = useState<{
    [key in keyof TournamentForm]?: string;
  }>({});

  const [formData, setFormData] = useState<TournamentForm>({
    tournamentName: "",
    description: "",
    contactName: "",
    contactPhone: "",
    profilePic: "",
    sponsorPic: "",
    venue: "",
    address: "",
    city: "",
    timezone: "",
    startDate: null,
    startTime: null,
    endDate: null,
    regEndDate: null,
    entryFee: "",
    extraFee: "",
    payAtVenue: false,
  });

  const [showPicker, setShowPicker] = useState<{
    field: keyof TournamentForm | null;
    mode: "date" | "time";
  }>({ field: null, mode: "date" });

  const handleInputChange = (key: keyof TournamentForm, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = () => {
    const newErrors: { [key in keyof TournamentForm]?: string } = {};

    if (currentStep === 1) {
      if (!formData.tournamentName)
        newErrors.tournamentName = "Tournament name is required";
      if (!formData.description)
        newErrors.description = "Description is required";
      if (!formData.profilePic)
        newErrors.profilePic = "Profile picture is required";
      if (!formData.sponsorPic)
        newErrors.sponsorPic = "Sponsor picture is required";
      if (!formData.contactName)
        newErrors.contactName = "Contact name is required";
      if (!formData.contactPhone)
        newErrors.contactPhone = "Contact phone is required";
    } else if (currentStep === 2) {
      if (!formData.venue) newErrors.venue = "Venue name is required";
      if (!formData.address) newErrors.address = "Venue address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.timezone) newErrors.timezone = "Timezone is required";
    } else if (currentStep === 3) {
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.startTime) newErrors.startTime = "Start time is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (!formData.regEndDate)
        newErrors.regEndDate = "Registration end date is required";
    } else if (currentStep === 4) {
      if (!formData.entryFee) newErrors.entryFee = "Entry fee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) setCurrentStep((p) => p + 1);
      else Alert.alert("Success", "Tournament created successfully!");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    else router.back();
  };

  const renderDateButton = (
    label: string,
    field: keyof TournamentForm,
    mode: "date" | "time"
  ) => (
    <React.Fragment key={field}>
      <TouchableOpacity
        onPress={() => setShowPicker({ field, mode })}
        className={`flex-row items-center justify-between w-full h-16 rounded-xl border ${
          errors[field]
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-700"
        } px-4 bg-white dark:bg-[#101622] mb-2`}
      >
        <View className="flex-row items-center">
          <Ionicons
            name={mode === "date" ? "calendar-outline" : "time-outline"}
            size={20}
            color={isDark ? "#9ca3af" : "#6b7280"}
          />
          <Text className="ml-3 text-base text-gray-900 dark:text-gray-100">
            {label}
          </Text>
        </View>

        <Text
          className={`text-base ${
            formData[field]
              ? "text-gray-800 dark:text-gray-200"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {formData[field]
            ? mode === "date"
              ? (formData[field] as Date).toLocaleDateString()
              : (formData[field] as Date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
            : "Select"}
        </Text>
      </TouchableOpacity>

      {errors[field] ? (
        <Text className="text-red-500 text-sm mb-5">{errors[field]}</Text>
      ) : (
        <View className="mb-5" />
      )}
    </React.Fragment>
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white dark:bg-[#101622]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center"
        >
          <Ionicons name="arrow-back" size={22} color={"#111827"} />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Create Tournament
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        className="flex-1 px-5 pt-2 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View className="flex-row justify-center items-center mb-8 mt-2">
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              className={`h-2 flex-1 rounded-full mr-2 ${
                currentStep >= step
                  ? "bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </View>

        <Text className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          Step {currentStep}/{totalSteps}
        </Text>

        <Text className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">
          {currentStep === 1
            ? "Basic Info"
            : currentStep === 2
              ? "Venue Details"
              : currentStep === 3
                ? "Timeline"
                : "Pricing"}
        </Text>

        {/* Step 1 */}
        {currentStep === 1 && (
          <>
            {/* Tournament Name */}
            <TextInput
              placeholder="Tournament Name"
              placeholderTextColor="#9ca3af"
              className={`h-16 border ${
                errors.tournamentName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
              value={formData.tournamentName}
              onChangeText={(t) => handleInputChange("tournamentName", t)}
            />
            {errors.tournamentName ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.tournamentName}
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Description */}
            <TextInput
              placeholder="Description"
              placeholderTextColor="#9ca3af"
              multiline
              className={`min-h-36 border ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 py-3 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
              value={formData.description}
              onChangeText={(t) => handleInputChange("description", t)}
            />
            {errors.description ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.description}
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Profile Picture Upload */}
            <TouchableOpacity
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ["images"],
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });
                if (!result.canceled) {
                  handleInputChange("profilePic", result.assets[0].uri);
                }
              }}
              className={`h-16 border ${
                errors.profilePic
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 flex-row items-center justify-between bg-white dark:bg-[#101622] mb-2`}
            >
              <Text
                className="text-lg dark:text-gray-100"
                style={{ color: "#9ca3af" }}
              >
                Upload Profile Picture
              </Text>
              {formData.profilePic ? (
                <Image
                  source={{ uri: formData.profilePic }}
                  className="w-10 h-10 rounded-lg"
                />
              ) : (
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color="#9ca3af"
                />
              )}
            </TouchableOpacity>
            {errors.profilePic ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.profilePic}
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Sponsor Picture Upload */}
            <TouchableOpacity
              onPress={async () => {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ["images"],
                  allowsEditing: true,
                  aspect: [1, 1],
                  quality: 0.8,
                });
                if (!result.canceled) {
                  handleInputChange("sponsorPic", result.assets[0].uri);
                }
              }}
              className={`h-16 border ${
                errors.sponsorPic
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 flex-row items-center justify-between bg-white dark:bg-[#101622] mb-2`}
            >
              <Text
                className="text-lg  dark:text-gray-100"
                style={{ color: "#9ca3af" }}
              >
                Upload Sponsor Picture
              </Text>
              {formData.sponsorPic ? (
                <Image
                  source={{ uri: formData.sponsorPic }}
                  className="w-10 h-10 rounded-lg"
                />
              ) : (
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color="#9ca3af"
                />
              )}
            </TouchableOpacity>
            {errors.sponsorPic ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.sponsorPic}
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Contact Name */}
            <TextInput
              placeholder="Contact Name"
              placeholderTextColor="#9ca3af"
              className={`h-16 border ${
                errors.contactName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
              value={formData.contactName}
              onChangeText={(t) => handleInputChange("contactName", t)}
            />
            {errors.contactName ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.contactName}
              </Text>
            ) : (
              <View className="mb-5" />
            )}

            {/* Contact Phone */}
            <TextInput
              placeholder="Contact Phone"
              keyboardType="phone-pad"
              placeholderTextColor="#9ca3af"
              className={`h-16 border ${
                errors.contactPhone
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-xl px-4 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
              value={formData.contactPhone}
              onChangeText={(t) => handleInputChange("contactPhone", t)}
            />
            {errors.contactPhone ? (
              <Text className="text-red-500 text-sm mb-5">
                {errors.contactPhone}
              </Text>
            ) : (
              <View className="mb-5" />
            )}
          </>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <>
            {["venue", "address", "city", "timezone"].map((f) => (
              <React.Fragment key={f}>
                <TextInput
                  placeholder={
                    f === "venue"
                      ? "Venue Name"
                      : f === "address"
                        ? "Venue Address"
                        : f === "city"
                          ? "City"
                          : "Timezone (e.g. GMT+5:30)"
                  }
                  placeholderTextColor="#9ca3af"
                  className={`h-16 border ${
                    errors[f as keyof TournamentForm]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-xl px-4 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
                  value={formData[f as keyof TournamentForm] as string}
                  onChangeText={(t) =>
                    handleInputChange(f as keyof TournamentForm, t)
                  }
                />
                {errors[f as keyof TournamentForm] ? (
                  <Text className="text-red-500 text-sm mb-5">
                    {errors[f as keyof TournamentForm]}
                  </Text>
                ) : (
                  <View className="mb-5" />
                )}
              </React.Fragment>
            ))}
          </>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <>
            {renderDateButton("Start Date", "startDate", "date")}
            {renderDateButton("Start Time", "startTime", "time")}
            {renderDateButton("End Date", "endDate", "date")}
            {renderDateButton("Registration End Date", "regEndDate", "date")}
          </>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <>
            {["entryFee", "extraFee"].map((f) => (
              <React.Fragment key={f}>
                <TextInput
                  placeholder={f === "entryFee" ? "Entry Fee" : "Extra Fee"}
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                  className={`h-16 border ${
                    errors[f as keyof TournamentForm]
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-xl px-4 text-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-[#101622] mb-2`}
                  value={formData[f as keyof TournamentForm] as string}
                  onChangeText={(t) =>
                    handleInputChange(f as keyof TournamentForm, t)
                  }
                />
                {errors[f as keyof TournamentForm] ? (
                  <Text className="text-red-500 text-sm mb-5">
                    {errors[f as keyof TournamentForm]}
                  </Text>
                ) : (
                  <View className="mb-5" />
                )}
              </React.Fragment>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-between h-16 border border-gray-300 dark:border-gray-700 rounded-xl px-4 bg-white dark:bg-[#101622] mb-7"
              onPress={() =>
                handleInputChange("payAtVenue", !formData.payAtVenue)
              }
            >
              <Text className="text-lg text-gray-900 dark:text-gray-100">
                Can Pay at Venue
              </Text>
              <Text className="font-semibold text-gray-800 dark:text-gray-200">
                {formData.payAtVenue ? "Yes" : "No"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Bottom Buttons */}
        <View className="flex-row mt-8">
          {currentStep > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              className="flex-1 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2232] mr-3"
            >
              <Text className="text-center text-gray-900 dark:text-gray-100 font-bold text-base">
                Back
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            className="flex-1 py-4 rounded-xl bg-blue-600"
          >
            <Text className="text-center text-white font-bold text-base">
              {currentStep === 4 ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Floating DateTime Picker Modal */}
        {showPicker.field && (
          <DateTimePickerModal
            isVisible={!!showPicker.field}
            mode={showPicker.mode}
            date={
              formData[showPicker.field] instanceof Date
                ? (formData[showPicker.field] as Date)
                : new Date()
            }
            onConfirm={(date) => {
              handleInputChange(showPicker.field!, date);
              setShowPicker({ field: null, mode: "date" });
            }}
            onCancel={() => setShowPicker({ field: null, mode: "date" })}
            themeVariant={isDark ? "dark" : "light"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTournament;
