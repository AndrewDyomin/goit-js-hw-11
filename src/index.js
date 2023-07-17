import { UnsplashAPI } from './unsplash-api';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputEl = document.querySelector('.search-input');
const searchFormEl = document.querySelector('.search-form');
const submitBtnEl = document.querySelector('.submit-btn');
const galleryEl = document.querySelector('.gallery');
const galleryListEl = document.querySelector('.gallery-list');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const unsplashApi = new UnsplashAPI();

function createGalleryCards (data) {
  if (!data.hits.length) {
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    throw new Error();
  }
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
  galleryListEl.innerHTML = '';
  
  const searchQuery = inputEl.value;
  unsplashApi.query = searchQuery;
  unsplashApi.page = 1;

  if (searchQuery.split(' ').join('').length === 0) {
    Notiflix.Notify.warning("Enter your search query, please.");
    throw new Error();
  }

  try {
    const { data } = await unsplashApi.fetchPhotos();

    if (!data.hits.length) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      throw new Error();
    }
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
    createGalleryCards(data);
    lightbox.refresh();
    
    if (data.totalHits > 40) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (err) {
    Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
  }
};

const LoadMoreBtnClickHandler = async () => {
  unsplashApi.page += 1;

  try {
    const { data } = await unsplashApi.fetchPhotos();

    createGalleryCards(data);
    lightbox.refresh();

    if (galleryListEl.childNodes.length === data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');

      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

  } catch (err) {
    Notiflix.Notify.warning('Sorry, something went wrong. Please try later.');
  }
};

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtnEl.addEventListener('click', LoadMoreBtnClickHandler);
submitBtnEl.addEventListener('click', searchFormSubmitHendler);