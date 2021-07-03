import { disableForms } from './modules/init.js';
import { validateInputs } from './modules/inputs.js';
import { replaceSubmitHandler, replaceResetHandler, setFilterChangeHandler } from './modules/forms.js';
import  { loadMap } from './modules/map-leaflet.js';

window.addEventListener('DOMContentLoaded', () => {
  disableForms();
  loadMap();
  validateInputs('.ad-form');
  replaceSubmitHandler('.ad-form');
  replaceResetHandler('.ad-form');
  setFilterChangeHandler('.map__filters');
});
