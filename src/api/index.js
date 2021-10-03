import axios from 'axios';

/**
 * Api
 */
export default class api {
  static async getList() {
    const response = await axios.get('https://api.github.com/events', {
      headers: {Accept: 'application/vnd.github.v3+json'},
      params: {
        per_page: 25,
      },
    });
    return response;
  }
}
