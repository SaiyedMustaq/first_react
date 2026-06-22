import { Show, useUser } from "@clerk/expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <Show when="signed-in">
        <Text style={styles.greeting}>
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
        </Text>
      </Show>
      <View>
        <Text style={styles.title}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 8,
  },
  greeting: {
    fontSize: 18,
    color: "#0a7ea4",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
