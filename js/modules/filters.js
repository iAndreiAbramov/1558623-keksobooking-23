

const ADS_TO_SHOW = 50;

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
      }
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

export { setFilterChangeHandler };
