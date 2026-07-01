import { PropertyType, useFilterStore } from '@/store/filterStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const TYPES: { label: string; value: PropertyType }[] = [
  { label: "All", value: null },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Studio", value: "studio" },
];

const BEDS = [
  { label: "Any", value: null },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: 4 },
];

const PRICE_PRESETS = [
  { label: "Under ₹50L", min: null, max: 5000000 },
  { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
  { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
  { label: "Above ₹2Cr", min: 20000000, max: null },
];

const chip = (active: boolean) =>
  `px-4 py-2 rounded-full border ${
    active ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
  }`;

const chipText = (active: boolean) =>
  `text-sm font-semibold ${active ? "text-white" : "text-gray-600"}`;

export default function FilterModel({
    visible,
    onClose,
}:{
    visible:boolean;
    onClose:()=>void;
}) {
     const {
        search,
        type,
        bedrooms,
        minPrice,
        maxPrice,
        setSearch,
        setType,
        setBedrooms,
        setMinPrice,
        setMaxPrice,
      } = useFilterStore();

      const [localMin,setLocalMin]=useState(minPrice?String(minPrice):"");
      const [localMax,setLocalMax]=useState(maxPrice?String(maxPrice):"");
      const handleReset = async () => {
        setMinPrice(null);
        setMaxPrice(null);
    
        resetFilter();
        onClose();
          
      }

      const activeCount=[type,bedrooms,localMin,localMax].filter(((v)=>v!==null)).length;

      const handleApply=()=>{
        setMinPrice(localMin?Number(localMin):null);
        setMaxPrice(localMax?Number(localMax):null);
        onClose();
      }

      
  const shadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  };
  return (
    <Modal visible={visible}
    animationType='slide'
    presentationClassName='formSheet'
    onRequestClose={onClose}
    >
    <View className="flex-1 bg-gray-50 mt-10">
      <View
      className='flex-row items-center justify-between px-5 pt-6
      pb-4 bg-white border-b border-gray-100'
      >
        <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.8}
        className='p-1'>
            <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text className='=text-lg font-bold text-gray-900'>Filter</Text>
        <TouchableOpacity
        onPress={handleReset}>
        <Text
        className='text-sm font-semibold text-blue-600'
        > Reset</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
      className='flex-1'
      contentContainerStyle={{
        padding:20,
        paddingBottom:40
      }}
      showsVerticalScrollIndicator={false}
      > 
        <Text
        className='text-base font-bold text-grey-800 mb-3'
        >Property Type</Text>
        <View
        className='flex-row flex-wrap gap-2 mb-6'
        >
            {
                TYPES.map((item)=>{
                    return(
                        <TouchableOpacity
                        key={item.value}
                        onPress={() => setType(item.value)}
                        className={chip(type===item.value)}
                        style={shadow}
                        >
                            <Text className={chipText(item.value === type)}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
        <Text
        className='text-base font-bold text-grey-800 mb-3'
        >Bedrooms</Text>
        <View
        className='flex-row flex-wrap gap-2 mb-6'
        >
            {
                BEDS.map((item)=>{
                    return(
                        <TouchableOpacity
                        key={String(item.value)}
                        onPress={() => setBedrooms(item.value)}
                        className={

                            `flex-1 items-center py-3 rounded-2xl border
                            ${chip(bedrooms===item.value)}`}
                        style={shadow}
                        >
                            <Text className={`
                                text-sm font-bold
                                ${chipText(item.value === bedrooms)}`}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
        <Text
        className='text-base font-bold text-grey-800 mb-3'
        >Price Range (₹) </Text>
        <View
        className='flex-row flex-wrap gap-2 mb-6'
        >
            <View className='flex-row gap-3 mb-3'>
                {[
                    {
                        label:"Min Price",
                        value:localMin,
                        onChange:(v:string)=>setLocalMin(v),
                        placeHolder="0"
                    },
                    {
                        label:"Min Price",
                        value:localMin,
                        onChange:(v:string)=>setLocalMin(v),
                        placeHolder="0"
                    }
                ]}
            </View>
            {/* {
                PRICE_PRESETS.map((item)=>{
                    return(
                        <TouchableOpacity
                        key={String(item.value)}
                        onPress={() => setBedrooms(item.value)}
                        className={

                            `flex-1 items-center py-3 rounded-2xl border
                            ${chip(bedrooms===item.value)}`}
                        style={shadow}
                        >
                            <Text className={`
                                text-sm font-bold
                                ${chipText(item.value === bedrooms)}`}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            } */}
        </View>
      </ScrollView>
    </View>
    </Modal>
  );
}

function resetFilter() {
    throw new Error('Function not implemented.');
}

