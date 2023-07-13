import axios from "axios";

export class UnsplashAPI {
    
#BASE_URL = 'https://pixabay.com/api/';
#API_KEY = '38182493-8ca9f9673ab94459449d03b1c';

  page = 1;
  query = null;

  async fetchPhotos() {
    return await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 10,
      },
    });
  }
}