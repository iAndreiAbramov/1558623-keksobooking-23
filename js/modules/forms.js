import { resetInputs } from './inputs.js';
import { postData } from '../services/post-data.js';
import { showMessage } from './show-status-message.js';
import { resetMap } from './map-leaflet.js';

const SEND_FORM_URL = 'https://23.javascript.pages.academy/keksobooking';

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

const setFilterChangeHandler = (formSelector) => {
  const form = document.querySelector(formSelector);
  const filterInputs = form.querySelectorAll('input');
  const filterSelects = form.querySelectorAll('select');

  const getInputsValues = () => {
    const featuresArray = [];
    filterInputs.forEach((filter) => {
      const value = filter.getAttribute('value');
      if (filter.checked) {
        featuresArray.push(value);
      }
    });
    return featuresArray;
  };

  const getSelectsValues = () => {
    const selectsValues = {};

    filterSelects.forEach((select) => {
      const name = select.getAttribute('name');
      const value = select.value;
      if (value !== 'any') {
        selectsValues[name] = value;
      };
    });
    return selectsValues;
  };

  filterInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const featuresList = getInputsValues();
      console.log(featuresList);
    });
    // console.log(filtersValues);
  });

  filterSelects.forEach((select) => {
    select.addEventListener('change', () => {
      const optionsList = getSelectsValues();
      console.log(optionsList);
    });
  });
};

export { replaceSubmitHandler, replaceResetHandler, setFilterChangeHandler };
