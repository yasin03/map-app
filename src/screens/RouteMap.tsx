import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import useMarkerStore, { Marker as MarkerType } from "../store/marker-store";
import { calculateDistance } from "../utils/CalculateDistance";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const RouteMap = () => {
  const markerStore = useMarkerStore();
  const [location, setLocation] = useState<Coordinate>();
  const [errorMsg, setErrorMsg] = useState("");
  const [destination, setDestination] = useState<Coordinate>();
  const [distance, setDistance] = useState<number>();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const loc: Coordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(loc);
    })();
  }, []);

  const INITIAL_REGION = {
    latitude: 41.042176010125175,
    longitude: 29.007133953273293,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  const handleMarkerPress = (marker: any) => {
    setDestination(marker?.coordinate);
    const dist = calculateDistance(location, destination);
    setDistance(dist);
    console.log(`İki koordinat arasındaki mesafe: ${dist} km`);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {location && (
          <Marker coordinate={location} title="Your Location" pinColor="blue" />
        )}

        {markerStore?.markers.map((marker: MarkerType, index: number) => (
          <Marker
            key={index}
            coordinate={marker?.coordinate}
            title={marker?.name}
            description={` ${
              marker?.coordinate?.latitude +
              " - " +
              marker?.coordinate?.longitude
            }`}
            pinColor={marker?.color}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}

        {destination && (
          <MapViewDirections
            origin={location}
            destination={destination}
            apikey={"AIzaSyB45mpop1RNjhyiIMMG9Zq12dluiWHut7o"} // Google Maps API Key ekleyin
            strokeWidth={5}
            strokeColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

export default RouteMap;
