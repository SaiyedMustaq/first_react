import { supabase } from "@/app/lib/supabase";
import FeaturedCard from "@/components/FeatturedCard";
import { Properties } from "@/types";
import { Show, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useUser();
  const router=useRouter();

  const [featured,setFeatured]=useState<Properties[]>([]);
  const [recommended,setRecommended]=useState<Properties[]>([]);
  const [loading,setLoading]=useState(true);

  const fetchProperties=async()=>{
    setLoading(true);
    try{
      const { data:featuredData } = await supabase.from("properties")
      .select("*")
      .eq("is_featured",true)
      .order("created_at", { ascending: false });
      setFeatured(featuredData as Properties[]);

      const { data:recommendedData } = await supabase.from("properties")
      .select("*")
      .eq("is_featured",false)
      .order("created_at", { ascending: false });
      setRecommended(recommendedData as Properties[]);      
    }catch(error){
      console.error("Error fetching properties:",error);
    }finally{
      setLoading(false);
    }
  }
  console.log("Featured Properties:",featured);
  console.log("Recommended Properties:",recommended);
  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  );



  return (
    <SafeAreaView style={styles.container}>
      <Show when="signed-in">
        <Text style={styles.greeting}>
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
        </Text>
      </Show>
    
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.container}>
            {/* header */}
           <View>
            <Image
            source={require("/Users/macmini/mustaq/react_native/first_react/assets/images/kribb.png")}
            //source={require("../assets/images/kribb.png")}
            style={{ width: 200, height: 50, resizeMode: "contain" }}
            />
           </View>

            {/* Search bar*/}
            <TouchableOpacity
            className="mb-6 flex-row items-center 
            gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
             }}
            onPress={() => router.push("/(root)/(tabs)/search")}
            >
              <Ionicons name="search-outline" size={24} color="black" />
              <Text>Search for properties...</Text>
              <TouchableOpacity
              className="w-8 h-8 bg-blue-600 rounded-xl item-center justify-center ml-auto" 
              onPress={() => router.push("/(root)/(tabs)/search?openFilter=true")}
              >
               <Ionicons name="options-outline" size={24} color="white" /> 
              </TouchableOpacity>
            </TouchableOpacity>
            {/* Featured Section*/}
                <View className="mb-6">
                  <Text style={styles.title}>Featured Properties</Text>
                  {loading ? (<ActivityIndicator 
                  size="small"
                  color="#0000ff"
                  style={{ marginTop: 20 }}
                  />):(
                  <FlatList
                    data={featured}
                    keyExtractor={(item) => item.id}
                    horizontal
                    contentContainerStyle={{ gap: 12 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <FeaturedCard
                    property={item}/>}                
                  />)}                  
                </View>
            {/* Recommended header*/}
             <Text style={styles.recommendedTitle}>Recommended Properties</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
         !loading?(
          <View>
            <Text style={styles.noPropertiesText}>No recommended properties available.</Text>
          </View>
         ) :null
        }    
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  greeting: {
    fontSize: 18,
    color: "#060606",
    fontWeight: "600",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  noPropertiesText: {
    fontSize: 16,
    color: "#7B7B7B",
    textAlign: "center",
    marginTop: 20,
  },
});
