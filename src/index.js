import { UnsplashAPI } from './unsplash-api';
// import createGalleryCards from '../templates/gallery-card.hbs';

const inputEl = document.querySelector('.search-input');
const searchFormEl = document.querySelector('.search-form');
const submitBtnEl = document.querySelector('.submit-btn');
const galleryEl = document.querySelector('.gallery');
const galleryListEl = document.querySelector('.gallery-list');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
let q = '';
const unsplashApi = new UnsplashAPI();



const searchFormSubmitHendler = async e => {
    e.preventDefault();
    
    console.log('click');
    const searchQuery = inputEl.value;
    unsplashApi.query = searchQuery;
    unsplashApi.page = 1;

    try {
      const { data } = await unsplashApi.fetchPhotos();
  
      if (!data.hits.length) {
        console.log("Sorry, there are no images matching your search query. Please try again.");
        throw new Error();
      }
      console.log(data.hits);
      for (const foto of data.hits) {
        const markup = `<li class="list-item"><img src=${foto.webformatURL}/></li>`;
        galleryEl.insertAdjacentHTML("beforeend", markup);
      }
        // const markup = data.map((elem) => {`<li class="list-item"><img src=${elem.webformatURL}/></li>`});

        

      loadMoreBtnEl.classList.remove('is-hidden');
    } catch (err) {
      console.log(err.message);
    }

    // getImgByTeg().then((response) => {
    //     const markup = response.data.hits
    //     .map((elem, index) => `<li class="list-item"><img src=${elem.webformatURL}/></li>`)
    //     .join("");
    //     galleryEl.insertAdjacentHTML("beforeend", markup);
    //     // console.log(response.data.hits[0].previewURL)
    //   }).catch((err) => {
    //     console.log(err)
    //   });
};


submitBtnEl.addEventListener('click', searchFormSubmitHendler);