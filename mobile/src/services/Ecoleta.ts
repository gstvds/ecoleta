import axios, { Method } from 'axios';

abstract class Ecoleta {
  private baseURL: string;

  constructor(baseURL: string) {
      this.baseURL = baseURL;
  }

  protected async request(url: string, data?: object, method: Method = 'get', params?: object) {
    try {
      const response = await axios({
        method,
        baseURL: this.baseURL,
        url,
        data,
        params,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Ecoleta;