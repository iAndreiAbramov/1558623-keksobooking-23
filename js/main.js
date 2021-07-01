import { disableForms } from './modules/init.js';
import { replaceSubmitHandler, replaceResetHandler } from './modules/forms.js';
import  { loadMap } from './modules/map-leaflet.js';

window.addEventListener('DOMContentLoaded', () => {
  disableForms();
  loadMap();
  replaceSubmitHandler('.ad-form');
  replaceResetHandler('.ad-form');
});
