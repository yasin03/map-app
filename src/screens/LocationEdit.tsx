import { View, Text } from "react-native";
import React from "react";

const LocationEdit = ({ route }: any) => {
  const { item } = route.params;

  return (
    <View>
      <Text>LocationEdit</Text>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  );
};

export default LocationEdit;
