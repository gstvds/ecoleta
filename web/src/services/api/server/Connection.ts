import AbstractEcoleta from '../../AbstractEcoleta';

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

class Connection extends AbstractEcoleta {
  async fetchItems(): Promise<Item[]> {
    return (await this.request('items'));
  }

  async createPoint(data: PointData) {
    await this.request('points', data, 'post');
  }
};

export default new Connection('http://localhost:3333');