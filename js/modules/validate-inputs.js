const validateInputs = () => {
  const adForm = document.querySelector('.ad-form');
  const title = adForm.querySelector('#title');
  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');


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

  const synchronizeSelects = (mainField, dependentField) => {
    dependentField.value = mainField.value;
  };

  timein.addEventListener('change', () => synchronizeSelects(timein, timeout));
  timeout.addEventListener('change', () => synchronizeSelects(timeout, timein));

  title.addEventListener('input', () => validateLength(title));

};

export {validateInputs};
