import { resetInputs } from './inputs.js';
import { postData } from '../services/post-data.js';
import { showMessage } from './show-status-message.js';
import { resetMap } from './map-leaflet.js';
import { SEND_FORM_URL } from '../settings/settings.js';

const replaceSubmitHandler = (formSelector) => {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    postData(SEND_FORM_URL, formData)
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
  const filtersPanel = document.querySelector('.map__filters');

  resetButton.addEventListener('click', () => {
    const filtersResetButton = document.createElement('button');
    filtersResetButton.setAttribute('type', 'reset');
    filtersResetButton.classList.add('visually-hidden');
    filtersPanel.appendChild(filtersResetButton);
    setTimeout(() => filtersResetButton.click(), 0);
    setTimeout(() => filtersResetButton.remove(), 0);
    setTimeout(resetMap, 0);
  });
};

export { replaceSubmitHandler, replaceResetHandler };
