import { validateInputs, resetInputs } from './inputs.js';
import { postData } from '../services/post-data.js';
import { showMessage } from './show-status-message.js';
import { resetMap } from './map-leaflet.js';

validateInputs('.ad-form');

const replaceSubmitHandler = (formSelector) => {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    postData('https://23.javascript.pages.academy/keksobooking', formData)
      .then((res) => {
        showMessage('body', res.ok);
        if (res.ok) {
          resetInputs(form);
        }
      });
  });
};

const replaceResetHandler = (formSelector) => {
  const form = document.querySelector(formSelector);
  const resetButton = form.querySelector('[type="reset"]');

  resetButton.addEventListener('click', () => {
    setTimeout(resetMap, 0);
  });
};

export { replaceSubmitHandler, replaceResetHandler };
