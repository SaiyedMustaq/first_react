import { formatPrice } from "@/app/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PropertyCard({
    property,
    onUnSave,
    showSAve=false
}:{
    property:Property,
    onUnSave?:()=>void,
    showSAve?:boolean
}) {
  const router=useRouter();
    const isSave=true;
  return (
   <TouchableOpacity
   className="flex-row bg-white rounded-2xl shadow-md overflow-hidden"
    style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.88,
        shadowRadius: 12,
        elevation: 4,
        opacity: property.is_sold ? 0.5 : 1,
     }}
   >
  <Image source={{uri:property.images[0]}} 
      className="w-28 h-28"
      resizeMode="cover"/>
      {
                     property.is_sold && (
                       <View className="absolute top-3 left-2 bg-red-500 px-3 py-1 rounded-full">
                         <Text
                         className="text-xs font-semibold text-white capitalize"
                         >
                         Sold
                         </Text>
                       </View>
                     )
                   }
    <View className="flex-1 p-3 ">
        <View>
        <Text 
        className="text-sm font-bold text-gray-800 mb-2"
        numberOfLines={1}
        >
            {property.title}
        </Text>
        <View className="flex-row items-center gap-1 mb-4">
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text className="text-sm text-gray-500">{property.address},{property.city}</Text>
            </View>
        </View>
        <View className="flex-row items-center justify-between" >
             <Text className="text-blue-600 font-bold mt-2">{formatPrice(property.price)}</Text>
              
            <View className="flex-row gap-3 mr-16 mt-2">
                <View className="flex-row items-center gap-1">
                        <Ionicons name="bed-outline" size={11} color="gray" />
                        <Text className="text-tx text-gray-500">{property.bedrooms} Beds</Text>
                </View>
                <View className="flex-row items-center gap-1">
                        <Ionicons name="expand-outline" size={11} color="gray" />
                        <Text className="text-tx text-gray-500">{property.area_sqft} FT</Text>
                </View>
            </View>
        </View>
    </View>
    <TouchableOpacity >
    <Ionicons 
    name={isSave? "heart-outline":"heart"} 
    onPress={onUnSave} 
    size={20} 
    color={isSave? "gray":"red"} />
    </TouchableOpacity>
   </TouchableOpacity>   
  )
}