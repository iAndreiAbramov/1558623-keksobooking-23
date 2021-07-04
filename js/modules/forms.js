import { resetInputs } from './inputs.js';
import { postData } from '../services/post-data.js';
import { showMessage } from './show-status-message.js';
import { resetMap } from './map-leaflet.js';
import { SEND_FORM_URL, IMAGE_TYPES } from '../settings/settings.js';

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

const showImagePreview = (inputSelector, previewBlockSelector, alt, width) => {
  const input = document.querySelector(inputSelector);
  const preview = document.querySelector(previewBlockSelector);

  input.addEventListener('change', () => {
    const img = preview.querySelector('img');
    const file = input.files[0];
    const fileName = input.files[0].name;
    const matches = IMAGE_TYPES.some((type) => fileName.endsWith(type));
    if (img) {
      img.remove();
    }
    if (matches) {
      const url = URL.createObjectURL(file);
      const createdImg = document.createElement('img');
      preview.style.padding = '0px';
      preview.style.width = `${width}px`;
      createdImg.style.width = `${width}px`;
      createdImg.style.borderRadius = '5px';
      createdImg.setAttribute('src', url);
      createdImg.setAttribute('alt', alt);
      preview.appendChild(createdImg);
    }
  });
};

export { replaceSubmitHandler, replaceResetHandler, showImagePreview };
