import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Container,
  Title,
  Description,
  BackButton,
  BackIcon,
  MapContainer,
  Map,
  ItemsContainer,
  Item,
  ItemTitle,
  ScrollableItems,
  MapMarker,
  MapMarkerContainer,
  MarkerImage,
  MarkerTitle,
} from "./styles";
import { SvgUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { Connection } from "../../services";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Points {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    Connection.fetchItems().then((response) => {
      setItems(response);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão de localização",
          "Precisamos de sua permissão para obter a localização"
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    Connection.getPoints({ city: routeParams.city, uf: routeParams.uf, items: selectedItems })
      .then((response) => setPoints(response));
  }, [selectedItems]);

  function handleSelectItem(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems((selectedItems) =>
        selectedItems.filter((item) => item !== id)
      );
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon name="arrow-left" size={20} color="#34CB79" />
        </BackButton>
        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta.</Description>
        <MapContainer>
          {initialPosition[0] !== 0 && (
            <Map
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <MapMarker
                  key={point.id}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => navigation.navigate("Detail", { point_id: point.id })}
                >
                  <MapMarkerContainer>
                    <MarkerImage source={{ uri: point.image_url }} />
                    <MarkerTitle>{point.name}</MarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </Map>
          )}
        </MapContainer>
      </Container>

      <ItemsContainer>
        <ScrollableItems
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <Item
              key={String(item.id)}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.id)}
              border={selectedItems.includes(item.id) ? "#34CB79" : "#EEEEEE"}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ScrollableItems>
      </ItemsContainer>
    </>
  );
};

export default Points;
