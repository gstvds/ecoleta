import React, { useEffect, useState, ChangeEvent } from "react";
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent} from 'leaflet';

import { GetLocations, Connection } from "../../services";

import "./styles.css";

import Header from "../../components/Header";
import Alert from "./Alert";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>(['selecione um estado']);
  const [citiesDisabled, setCitiesDisabled] = useState(true);
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => setInitialPosition([position.coords.latitude, position.coords.longitude]))
  }, []);

  useEffect(() => {
    Connection.fetchItems().then((response) => setItems(response));

    GetLocations.searchUF().then((response) => {
      const ufInitials = response.map((uf) => uf.sigla).sort();
      setUFs(['selecione um estado', ...ufInitials]);
    });
  }, []);

  useEffect(() => {
    setUFs(ufs => ufs.filter((uf) => uf !== 'selecione um estado'));
    if (selectedUF !== '0') {
      GetLocations.searchCityByUF(selectedUF).then((response) => {
        const citiesNames = response.map((city) => city.nome).sort();
        setCities(citiesNames);
        setCitiesDisabled(false);
      });
    }
  }, [selectedUF]);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUF(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSelectItem(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems((prevState) => prevState.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = { name, email, whatsapp, uf, city, latitude, longitude, items };
    await Connection.createPoint(data);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      history.push('/');
    }, 2000);
  }

  return (
    <div id="page-create-point">
      {
        success && (
          <Alert />
        )
      }
      <Header create />
      <form onSubmit={handleSubmit}>
        <h1>Cadastro do<br />ponto de coleta</h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">nome da entidade</label>
            <input onChange={handleInputChange} type="text" name="name" id="name" />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">e-mail</label>
              <input onChange={handleInputChange} type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">whatsapp</label>
              <input onChange={handleInputChange} type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>selecione o endereço no mapa</span>
          </legend>
          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">estado (UF)</label>
              <select onChange={handleSelectUF} value={selectedUF} name="uf" id="uf">
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">cidade</label>
              <select onChange={handleSelectCity} disabled={citiesDisabled} value={selectedCity} name="city" id="city">
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map((item) => (
              <li className={selectedItems.includes(item.id) ? 'selected' : ''} key={item.id} onClick={() => handleSelectItem(item.id)}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
