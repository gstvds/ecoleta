import axios, { Method } from 'axios';

abstract class AbstractEcoleta {
  private baseURL: string;

  constructor(baseURL: string) {
      this.baseURL = baseURL;
  }

  protected async request(url: string, data?: object, method: Method = 'get') {
    try {
      const response = await axios({
        method,
        baseURL: this.baseURL,
        url,
        data,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AbstractEcoleta;