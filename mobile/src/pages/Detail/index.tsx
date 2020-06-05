import React, { useEffect, useState } from "react";
import { Linking } from 'react-native';

import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from 'expo-mail-composer';
import {
  MainContainer,
  Container,
  BackButton,
  FeatherIcon,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  ButtonText,
  FontIcon,
} from "./styles";

import { Connection } from '../../services';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: { title: string }[];
}

const Detail: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    Connection.getPoint(routeParams.point_id).then((response) => setData(response));
  }, []);

  if (!data.point) {
    return null;
  }

  function handleMailCompose() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre a coleta de resíduos`);
  }

  return (
    <MainContainer>
      <Container>
        <BackButton onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={20} color="#34CB79" />
        </BackButton>

        <PointImage
          source={{ uri: data.point.image_url }}
        />
        <PointName>{data.point.name}</PointName>
        <PointItems>{data.items.map((item) => item.title).join(', ')}</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>{data.point.city}, {data.point.uf}</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={handleWhatsApp}>
          <FontIcon name="whatsapp" size={20} color="#FFFFFF" />
          <ButtonText>whatsapp</ButtonText>
        </Button>
        <Button onPress={handleMailCompose}>
          <FeatherIcon name="mail" size={20} color="#FFFFFF" />
          <ButtonText>e-mail</ButtonText>
        </Button>
      </Footer>
    </MainContainer>
  );
};

export default Detail;
