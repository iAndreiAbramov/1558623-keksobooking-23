import { disableForms } from './modules/init.js';
import { validateInputs } from './modules/inputs.js';
import { replaceSubmitHandler, replaceResetHandler, showImagePreview  } from './modules/forms.js';
import  { loadMap } from './modules/map-leaflet.js';
import { setFilterChangeHandler } from './modules/filters.js';

window.addEventListener('DOMContentLoaded', () => {
  disableForms();
  loadMap();
  validateInputs('.ad-form');
  replaceSubmitHandler('.ad-form');
  replaceResetHandler('.ad-form');
  setFilterChangeHandler();
  showImagePreview('#avatar', '.ad-form-header__preview', 'Аватар пользователя', 70);
  showImagePreview('#images', '.ad-form__photo', 'Фото помещения', 70);
});
