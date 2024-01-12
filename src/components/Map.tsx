import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, Modal, Icon, FormControl, Input } from "native-base";
import MapView, { Marker, Region } from "react-native-maps";
import ColorPicker from "react-native-wheel-color-picker";
import useMarkerStore from "../store/marker-store";

interface MarkerItem {
  coordinate: Region;
  name: string;
  color: string;
}

const Map = () => {
  const [showModal, setShowModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [markerName, setMarkerName] = useState("");
  const [markerColor, setMarkerColor] = useState("#FF5733");
  const [selectedCoordinate, setSelectedCoordinate] = useState<Region | null>(
    null
  );

  const markerStore = useMarkerStore();
  console.log("markers-> " + JSON.stringify(markerStore.markers));

  const INITIAL_REGION = {
    latitude: 41.042176010125175,
    longitude: 29.007133953273293,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;

    setSelectedCoordinate(coordinate);
    setShowModal(true);
    console.log(coordinate);
    
  };

  const handleSaveMarker = () => {
    if (selectedCoordinate && markerName.trim() !== "") {
      const newMarker = {
        coordinate: selectedCoordinate,
        name: markerName,
        color: markerColor,
      };

      markerStore.addMarker(newMarker);

      setShowModal(false);
      setMarkerName("");
      setMarkerColor("#FF5733");
      setSelectedCoordinate(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        onPress={handleMapPress}
      >
        {markerStore?.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.name}
            pinColor={marker.color}
          />
        ))}
      </MapView>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Marker</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Koordinat</FormControl.Label>
              {selectedCoordinate?.latitude +
                " - " +
                selectedCoordinate?.longitude}
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Marker İsmi</FormControl.Label>
              <Input
                value={markerName}
                onChangeText={(text) => setMarkerName(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Marker Rengi</FormControl.Label>
              <Button
                backgroundColor={markerColor}
                onPress={() => {
                  setShowColorModal(!showColorModal);
                }}
              >
                Renk Seç
              </Button>
              {showColorModal && (
                <ColorPicker
                  color={markerColor}
                  onColorChange={(color) => setMarkerColor(color)}
                />
              )}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                İptal
              </Button>
              <Button onPress={handleSaveMarker}>Kaydet</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  colorWheel: {
    width: 200,
    height: 200,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
