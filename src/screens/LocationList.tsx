import { StyleSheet, View } from "react-native";
import React from "react";
import useMarkerStore from "../store/marker-store";
import {
  Avatar,
  Box,
  Text,
  FlatList,
  HStack,
  Heading,
  VStack,
  Spacer,
  Icon,
  IconButton,
  Tooltip,
  Popover,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LocationList = () => {
  const navigation = useNavigation();
  const markerStore = useMarkerStore();
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Marker Listesi
      </Heading>
      <FlatList
        data={markerStore.markers}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.400"
            pl={["4", "4"]}
            pr={["4", "5"]}
            py="2"
          >
            <HStack
              space={[2, 3]}
              justifyContent="space-between"
              alignItems="center"
            >
              <Popover
                placement="right top"
                trigger={(triggerProps) => {
                  return (
                    <IconButton
                      {...triggerProps}
                      _icon={{
                        as: MaterialCommunityIcons,
                        name: "map-marker",
                        color: item.color,
                        size: "2xl",
                      }}
                    />
                  );
                }}
              >
                <Popover.Content w="56">
                  <Popover.CloseButton />
                  <Popover.Header>Marker Koordinatları</Popover.Header>
                  <Popover.Body>
                    {item?.coordinate?.latitude +
                      " " +
                      item.coordinate?.longitude}
                  </Popover.Body>
                </Popover.Content>
              </Popover>

              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                fontSize="xl"
                bold
              >
                {item.name}
              </Text>

              <Spacer />
              <IconButton
                onPress={() => navigation.navigate("LocationEdit", { item })}
                _icon={{
                  as: MaterialCommunityIcons,
                  name: "chevron-right",
                  color: "coolGray.500",
                }}
              />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default LocationList;

const styles = StyleSheet.create({});
