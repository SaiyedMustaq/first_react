import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

function AndroidTab() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  console.log("isAdmin", isAdmin);
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="search" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        ),
      }} />
      {
        isAdmin && (
          <Tabs.Screen name="create" options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add" color={color} size={size} />
            ),
          }} />
        )
      }
      <Tabs.Screen name="saved" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart" color={color} size={size} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }} />
    </Tabs>
  );
}
 function IosTab() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  console.log("isAdmin", isAdmin);
  return (
  <NativeTabs
    backgroundColor="#FFFFFF"
    tintColor="#2E0CA8"
    blurEffect="systemChromeMaterial"
    labelStyle={{
      fontSize: 12,
      fontWeight: '600',
    }}
  >
    <NativeTabs.Trigger name="index">
      <Icon sf="house.fill" drawable="custom_android_drawable" />
      <Label sf="house.fill">Home</Label>
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="search">
      <Icon sf="magnifyingglass" drawable="custom_search_drawable" />
      <Label>Search</Label>
    </NativeTabs.Trigger>

    {isAdmin && (
      <NativeTabs.Trigger name="create">
        <Icon sf="plus.circle.fill" drawable="custom_admin_drawable" />
        <Label>Create</Label>
      </NativeTabs.Trigger>
    )}

    <NativeTabs.Trigger name="saved">
      <Icon sf="heart.fill" drawable="custom_saved_drawable" />
      <Label>Saved</Label>
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="profile">
      <Icon sf="person.crop.circle.fill" drawable="custom_profile_drawable" />
      <Label>Profile</Label>
    </NativeTabs.Trigger>
  </NativeTabs>
);
}


export default function TabsLayout() {

  return Platform.OS === "android" ? <AndroidTab /> : <IosTab />;
}