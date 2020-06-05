import AbstractEcoleta from '../../AbstractEcoleta';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

class Connection extends AbstractEcoleta {
  async fetchItems(): Promise<Item[]> {
    return (await this.request('items'));
  }

  async createPoint(data: FormData) {
    await this.request('points', data, 'post');
  }
};

export default new Connection('http://localhost:3333');