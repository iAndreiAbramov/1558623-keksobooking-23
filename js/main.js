import { disableForms } from './modules/init.js';
import { replaceSubmitHandler } from './modules/forms.js';
import  { loadMap, generateSimilarAds } from './modules/map-leaflet.js';

window.addEventListener('DOMContentLoaded', () => {
  disableForms();
  loadMap();
  replaceSubmitHandler('.ad-form');
  generateSimilarAds(10);
});
