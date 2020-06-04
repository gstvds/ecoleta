import React, { useState, useEffect } from "react";
import { Platform } from 'react-native';
import { MainContainer, Container, Main, Ecoleta, Title, Description, Footer, Input, Button, ButtonIcon, ButtonText, Icon, TextContainer } from "./styles";
import { useNavigation } from '@react-navigation/native';
import PickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { GetLocations } from '../../services';

interface Picker {
  label: string;
  value: string;
}

interface UFResponse {
  sigla: string;
}

interface CityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const [ufs, setUFs] = useState<Picker[]>([]);
  const [cities, setCities] = useState<Picker[]>([]);
  const [selectedUF, setSelectedUF] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    GetLocations.searchUF().then((response) => {
      const arrAux: Picker[] = response.map((uf: UFResponse) => ({ label: uf.sigla, value: uf.sigla })).sort(sortUF);
      setUFs(arrAux);
    });
  }, []);

  function sortUF(a: Picker, b: Picker) {
    const labelA = a.label;
    const labelB = b.label;
    let comparison = 0;
    if (labelA > labelB) {
      comparison = 1;
    } else comparison = -1;
    return comparison;
  }

  useEffect(() => {
    GetLocations.searchCityByUF(selectedUF).then((response) => {
      const arrAux: Picker[] = response.map((city: CityResponse) => ({ label: city.nome, value: city.nome }));
      setCities(arrAux);
    });
  }, [selectedUF]);

  return (
    <MainContainer behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container
        source={require("../../assets/home-background.png")}
        imageStyle={{ width: 274, height: 368 }}
      >
        <Main>
          <Ecoleta source={require("../../assets/logo.png")} />
          <TextContainer>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
            </Description>
          </TextContainer>
        </Main>

        <Footer>
          <Input>
            <PickerSelect
              items={ufs}
              value={selectedUF}
              onValueChange={(value) => setSelectedUF(value)}
              placeholder={{ label: "escolha um estado", value: null }}
            />
          </Input>
          <Input>
            <PickerSelect
              disabled={selectedUF === ''}
              items={cities}
              value={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
              placeholder={{ label: selectedUF === '' ? "primeiro escolha um estado" : "escolha uma cidade", value: null }}
            />
          </Input>
          <Button onPress={() => navigation.navigate('Points', { city: selectedCity, uf: selectedUF })}>
            <ButtonIcon>
              <Icon name='arrow-right' color='#FFFFFF' size={24} />
            </ButtonIcon>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </MainContainer>
  );
};

export default Home;
