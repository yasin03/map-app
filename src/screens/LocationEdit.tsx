import { Alert, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import {
  AlertDialog,
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  ScrollView,
  Stack,
  WarningOutlineIcon,
} from "native-base";
import ColorPicker from "react-native-wheel-color-picker";
import { Ionicons } from "@expo/vector-icons";
import useMarkerStore from "../store/marker-store";
import Loading from "../ui/Loading";
import { useNavigation } from "@react-navigation/native";

const LocationEdit = ({ route }: any) => {
  const { item } = route.params;
  console.log(item);

  const [latitude, setLatitude] = useState(item?.coordinate?.latitude);
  const [longitude, setLongitude] = useState(item?.coordinate?.longitude);
  const [name, setName] = useState(item?.name);
  const [showColorModal, setShowColorModal] = useState(false);
  const [markerColor, setMarkerColor] = useState(item.color);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const markerStore = useMarkerStore();
  const onClose = () => setIsOpen(false);
  const navigation = useNavigation();
  const cancelRef = useRef(null);

  const handleLatitudeChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    if (cleanedText.length <= 12) {
      setLatitude(parseFloat(cleanedText));
    }
  };

  const handleLongitudeChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, "");
    if (cleanedText.length <= 12) {
      setLongitude(parseFloat(cleanedText));
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await markerStore.removeMarker(item?.id);
      onClose();
      navigation.navigate("LocationList");
      Alert.alert("Başarılı", "Silme işlemi başarıyla tamamlandı");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const newMarker = {
      coordinate: {
        longitude: longitude,
        latitude: latitude,
      },
      name: name,
      color: markerColor,
    };

    try {
      setLoading(true);
      await markerStore.updateMarker(item?.id, newMarker);
      onClose();
      navigation.navigate("LocationList");
      Alert.alert("Başarılı", "Güncelleme işlemi başarıyla tamamlandı");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <ScrollView m="8" style={styles.container}>
        <Box w="100%">
          <FormControl isRequired>
            <Stack>
              <FormControl.Label>Latitude</FormControl.Label>
              <Input
                type="text"
                value={latitude.toString()}
                onChangeText={handleLatitudeChange}
                maxLength={12}
              />
              <FormControl.HelperText>
                Sadece koordinat giriniz
              </FormControl.HelperText>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Sadece koordinat giriniz
              </FormControl.ErrorMessage>
            </Stack>
            <Stack>
              <FormControl.Label>Longitude</FormControl.Label>
              <Input
                type="text"
                value={longitude.toString()}
                onChangeText={handleLongitudeChange}
                maxLength={12}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Sadece koordinat giriniz
              </FormControl.ErrorMessage>
            </Stack>
            <Stack>
              <FormControl.Label>Name</FormControl.Label>
              <Input type="text" defaultValue={name} onChangeText={setName} />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Sadece koordinat giriniz
              </FormControl.ErrorMessage>
            </Stack>
            <Stack>
              <FormControl.Label>Marker Rengi</FormControl.Label>
              <Button
                backgroundColor={markerColor}
                onPress={() => {
                  setShowColorModal(!showColorModal);
                }}
                leftIcon={
                  <Icon as={Ionicons} name="location-outline" size="sm" />
                }
              >
                Renk Seç
              </Button>
              {showColorModal && (
                <ColorPicker
                  color={markerColor}
                  onColorChange={(color) => setMarkerColor(color)}
                  thumbSize={40}
                  sliderSize={20}
                />
              )}
            </Stack>
          </FormControl>
        </Box>
        <Stack direction="row" mt={"6"} space={2}>
          <Button
            colorScheme="danger"
            onPress={() => setIsOpen(!isOpen)}
            w={"2/5"}
          >
            Sil
          </Button>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Delete Marker</AlertDialog.Header>
              <AlertDialog.Body>
                Marker'ı silmek istediğinize emin misiniz?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    İptal
                  </Button>
                  <Button colorScheme="danger" onPress={handleDelete}>
                    Marker Sil
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <Button colorScheme={"blue"} w={"3/5"} onPress={handleUpdate}>
            Güncelle
          </Button>
        </Stack>
      </ScrollView>
    </>
  );
};

export default LocationEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
