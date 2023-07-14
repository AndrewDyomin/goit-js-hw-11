import { UnsplashAPI } from './unsplash-api';

const inputEl = document.querySelector('.search-input');
const searchFormEl = document.querySelector('.search-form');
const submitBtnEl = document.querySelector('.submit-btn');
const galleryEl = document.querySelector('.gallery');
const galleryListEl = document.querySelector('.gallery-list');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
let q = '';
const unsplashApi = new UnsplashAPI();

function createGalleryCards (data) {
  for (const foto of data.hits) {
    const markup = 
    `<li class="list-item">
      <div class="photo-card">
        <a class="large-photo-link" href="${foto.largeImageURL}">
          <img src="${foto.webformatURL}" alt="${foto.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            ${foto.likes}
            <b>Likes</b>
          </p>
          <p class="info-item">
            ${foto.views}
            <b>Views</b>
          </p>
          <p class="info-item">
            ${foto.comments}
            <b>Comments</b>
          </p>
          <p class="info-item">
            ${foto.downloads}
            <b>Downloads</b>
          </p>
        </div>
      </div>
    </li>`;
    galleryListEl.insertAdjacentHTML("beforeend", markup);
  }
};

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
    createGalleryCards(data);

    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(err.message);
  }
};

const LoadMoreBtnClickHandler = async () => {
  unsplashApi.page += 1;

  try {
    const { data } = await unsplashApi.fetchPhotos();

    if (unsplashApi.page === data.total_pages) {
      loadMoreBtnEl.classList.add('is-hidden');
    }

    createGalleryCards(data);
  } catch (err) {
    console.log(err.message);
  }
};

loadMoreBtnEl.addEventListener('click', LoadMoreBtnClickHandler);
submitBtnEl.addEventListener('click', searchFormSubmitHendler);