const validateInputs = () => {
  const adForm = document.querySelector('.ad-form');
  const title = adForm.querySelector('#title');
  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');
  const type = adForm.querySelector('#type');
  const price = adForm.querySelector('#price');
  const minPrices = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  };

  const validateLength = (field) => {
    const length = field.value.length;
    const minLength = +field.getAttribute('minlength');
    if (field.validity.tooShort) {
      field.setCustomValidity(`Необходимо еще ${minLength - length} символов`);
    } else {
      field.setCustomValidity('');
    }

    field.reportValidity();
  };

  const validateNumber = (field, min, max) => {
    if (field.validity.rangeUnderflow) {
      field.setCustomValidity(`Минимальное значение для этого поля: ${min}`);
    } else if (field.validity.rangeOverflow) {
      field.setCustomValidity(`Максимальное значение для этого поля: ${max}`);
    } else {
      field.setCustomValidity('');
    }

    field.reportValidity();
  };

  const synchronizeSelects = (mainField, dependentField) => {
    dependentField.value = mainField.value;
  };

  const mapPriceWithType = (mapObject) => {
    price.setAttribute('min', mapObject[type.value]);
    price.setAttribute('placeholder', mapObject[type.value]);
  };

  mapPriceWithType(minPrices);

  title.addEventListener('input', () => validateLength(title));

  timein.addEventListener('change', () => synchronizeSelects(timein, timeout));
  timeout.addEventListener('change', () => synchronizeSelects(timeout, timein));

  type.addEventListener('change', () => mapPriceWithType(minPrices));
  price.addEventListener('input', () => validateNumber(price, minPrices[type.value], price.getAttribute('max')));


};

export {validateInputs};
