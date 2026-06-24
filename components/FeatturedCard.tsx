import { formatPrice } from "@/app/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function FeaturedCard({property}:{property:Property}) {
  const router=useRouter();
  return (
    <TouchableOpacity
    className="bg-white rounded-3xl shadow-md overflow-hidden w-64"
    style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.88,
        shadowRadius: 12,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
     }}
     //onPress={() => router.push(`(root)/property/${property.id}`)}
    >
      <Image source={{uri:property.images[0]}} 
      className="w-full h-44"
      resizeMode="cover"
      />
      <View className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
        <Text
        className="text-xs font-semibold text-blue-600 capitalize"
        >
            {property.is_sold ? "Sold" : property.is_featured ? "Featured" : ""}
        </Text>
      </View>
      {
        property.is_sold && (
          <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
            <Text
            className="text-xs font-semibold text-white capitalize"
            >
            Sold
            </Text>
          </View>
        )
      }
      <View className="p-4">
        <Text className="text-lg font-semibold">{property.title}</Text>
        <View className="flex-row items-center gap-2 mt-1">
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text className="text-sm text-gray-500">{property.address},{property.city}</Text>
        </View>
        
      </View>
      <View className="flex-row items-center  px-4">
        <Text className="text-blue-600 font-bold mt-2">{formatPrice(property.price)}</Text>
        <View className="flex-row items-center gap-1 px-4">
          <Ionicons name="bed-outline" size={13} color="gray" />
          <Text className="text-tx text-gray-500">{property.bedrooms} Beds</Text>
        </View>
    
        <View className="flex-row items-center gap-1">
          <Ionicons name="water-outline" size={13} color="gray" />
          <Text className="text-tx text-gray-500">{property.bathrooms} Baths</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}