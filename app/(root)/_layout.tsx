import { useUserSyncs } from "@/hooks/useUserSyncs";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import React from "react";
export default function RootGroupLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  console.log("auth state", { isSignedIn, isLoaded });

  useUserSyncs();

  if (!isLoaded) return null;
  
  if (!isSignedIn) return <Redirect href="/sign-in" />;
  

  return <Stack screenOptions={{ headerShown: false }} />;
}
