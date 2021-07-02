import { disableForms } from './modules/init.js';
import { validateInputs } from './modules/inputs.js';
import { replaceSubmitHandler, replaceResetHandler } from './modules/forms.js';
import  { loadMap } from './modules/map-leaflet.js';

window.addEventListener('DOMContentLoaded', () => {
  disableForms();
  loadMap();
  validateInputs('.ad-form');
  replaceSubmitHandler('.ad-form');
  replaceResetHandler('.ad-form');
});
