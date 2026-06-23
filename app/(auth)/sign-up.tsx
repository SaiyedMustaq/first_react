import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();

  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [code, setCode] = useState("");
  const isLoading = fetchStatus === "fetching";

  if (signUp?.status === "complete" || isSignedIn) {
    return null;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      return;
    }
    if (!error) {
      await signUp?.verifications.sendEmailCode();
    }
  };
  const onVerifyPress = async () => {
    await signUp?.verifications.verifyEmailCode({
      code,
    });
    if (signUp?.status === "complete") {
      await signUp?.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  if (
    signUp?.status === "missing_requirements" &&
    signUp?.unverifiedFields.includes("email_address") &&
    signUp?.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">Sign Up</Text>
        <Text className="text-2xl text-gray-500 mb-2">
          We send a code on {email}.
        </Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
          placeholder="Please enter your code"
          placeholderTextColor="#9CA3AF"
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="w-full bg-blue-600 rounded-xl items-center mb-4 py-4"
        >
          {isLoading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Text className="text-white font-bold">Verify Code</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signUp?.verifications.sendEmailCode()}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <Text className="text-blue-500">I need a new Code</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 justify-center">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          <Image
            source={require("../../assets/images/kribb.png")}
            className="w-32 h-16 mb-8"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-gray-800 mb-2">Sign Up</Text>
          <Text className="text-2xl text-gray-500 mb-2">
            Find your dream home today.
          </Text>

          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
            placeholder="Please enter your name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
            placeholder="Please enter your last name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
            placeholder="Please enter your email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          {errors.fields.emailAddress && (
            <Text className="text-red-500 mb-4">
              {errors.fields.emailAddress.message}
            </Text>
          )}
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
            placeholder="Please enter your password"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            value={password}
            secureTextEntry
            onChangeText={setPasssword}
          />
          {errors.fields.password && (
            <Text className="text-red-500 mb-4">
              {errors.fields.password.message}
            </Text>
          )}
          <TouchableOpacity
            onPress={onSignUpPress}
            disabled={isLoading}
            className="w-full bg-blue-600 rounded-xl items-center mb-4 py-4"
          >
            {isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Text className="text-white font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text className="text-gray-500 px-2">Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </Link>
          </View>
          <View nativeID="clerk-captcha"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
