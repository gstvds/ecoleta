import AbstractEcoleta from '../AbstractEcoleta';

interface UFResponse {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  }
}

interface CityByUFResponse {
  id: number;
  nome: string;
}

class GetLocations extends AbstractEcoleta {
  protected ufURL: string = '/estados';
  protected cityURL: string = '/municipios';

  async searchUF(): Promise<UFResponse[]> {
    return (await this.request(this.ufURL));
  }

  async searchCityByUF(uf: string): Promise<CityByUFResponse[]> {
    const url = `${this.ufURL}/${uf}/${this.cityURL}`;
    return (await this.request(url));
  }
}

export default new GetLocations('https://servicodados.ibge.gov.br/api/v1/localidades');