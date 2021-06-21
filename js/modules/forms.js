import {validateInputs} from './inputs.js';
validateInputs('.ad-form');


const replaceSubmitHandler = (formSelector) => {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // Если введенные данные корректны, то здесь будет запускаться функция, отправляющая данные на сервер (будет реализована позже).
  });
};

export {replaceSubmitHandler};
