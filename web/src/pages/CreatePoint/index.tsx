import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

import "./styles.css";

import Header from "../../components/Header";

const CreatePoint: React.FC = () => {
  return (
    <div id="page-create-point">
      <Header create />

      <form>
        <h1>
          Cadastro do
          <br />
          ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">e-mail</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>selecione o endereço no mapa</span>
          </legend>

          <Map center={[-22.5837056, -47.382528]} zoom={14}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-22.5837056, -47.382528]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">selecione um estado</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">cidade</label>
              <select name="city" id="city">
                <option value="0">selecione uma cidade</option>
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
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="oleo" />
              <span>óleo de cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
