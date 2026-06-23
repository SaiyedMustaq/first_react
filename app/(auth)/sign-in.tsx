import { useSignIn } from "@clerk/expo";
import { Link, router } from "expo-router";
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

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [code, setCode] = useState("");
  const isLoading = fetchStatus === "fetching";

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });
    if (error) {
      alert(error);
      return;
    }
    if (signIn?.status === "complete") {
      await signIn?.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else if (signIn?.status === "needs_second_factor") {
      await signIn?.mfa.sendPhoneCode();
    } else if (signIn?.status === "needs_client_trust") {
      const emailController = signIn?.supportedFirstFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailController) {
        await signIn?.mfa.sendEmailCode();
      }
    } else {
      console.log("Sign In attempt not complete:", signIn);
    }
  };
  const onVerifyPress = async () => {
    const { error } = await signIn?.mfa.verifyEmailCode({
      code,
    });
    console.log("Sign In attempt:", signIn);
    if (error) {
      alert(error);
      return;
    }
    if (signIn?.status === "complete") {
      await signIn?.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
    console.log("Sign In attempt not complete:", signIn);
  };
  if (signIn?.status === "needs_client_trust") {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">Sign In</Text>
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
          onPress={() => signIn.mfa.sendEmailCode()}
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
          <Text className="text-3xl font-bold text-gray-800 mb-2">Sign In</Text>
          <Text className="text-2xl text-gray-500 mb-2">
            Find your dream home today.
          </Text>
          <TextInput
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3"
            placeholder="Please enter your email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          {errors.fields.identifier && (
            <Text className="text-red-500 mb-4">
              {errors.fields.identifier.message}
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
          {/* {errors.fields.password && (
            <Text className="text-red-500 mb-4">
              {errors.fields.password.message}
            </Text>
          )} */}
          <TouchableOpacity
            onPress={onSignInPress}
            disabled={isLoading}
            className="w-full bg-blue-600 rounded-xl items-center mb-4 py-4"
          >
            {isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Text className="text-white font-bold">Sign In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500 px-2">
              Don&apos;t have an account?
            </Text>
            <Link href="/sign-up">
              <Text className="text-blue-500 font-semibold">Sign Up</Text>
            </Link>
          </View>

          <View nativeID="clerk-captcha"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
