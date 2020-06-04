import AbstractEcoleta from '../../Ecoleta';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface PointData {
  name: string;
  email: string;
  whatsapp: string;
  uf: string
  city: string;
  latitude: number;
  longitude: number;
  items: number[];
}

interface Params {
  city: string;
  uf: string;
  items: number[];
}

class Connection extends AbstractEcoleta {
  async fetchItems(): Promise<Item[]> {
    return (await this.request('items'));
  }

  async getPoints(params: Params) {
    return (await this.request('points', undefined, 'get', params));
  }

  async getPoint(pointId: number) {
    return (await this.request(`points/${pointId}`));
  }
};

export default new Connection('http://192.168.0.4:3333');