import { useUserSyncs } from "@/hooks/useUserSyncs";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import React from "react";
export default function RootGroupLayout() {
  useUserSyncs();
  const { isSignedIn, isLoaded } = useAuth();
  console.log("auth state", { isSignedIn, isLoaded });
  if (!isLoaded) return null;
  
  if (!isSignedIn) return <Redirect href="/sign-in" />;
  

  return <Stack screenOptions={{ headerShown: false }} />;
}
