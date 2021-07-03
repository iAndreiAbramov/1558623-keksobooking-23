const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  filtersForm.classList.add('map__filters--disabled');
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
};

const enableFilters = () => {
  filtersForm.classList.remove('map__filters--disabled');
};

export { disableForms, enableForm, enableFilters };
