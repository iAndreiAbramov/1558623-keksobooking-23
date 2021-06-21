const disableForms = () => {
  const adForm = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');

  adForm.classList.add('ad-form--disabled');
  filtersForm.classList.add('map__filters--disabled');
};

const enableForms = () => {
  const adForm = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');

  adForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('map__filters--disabled');
};

export {disableForms, enableForms};
