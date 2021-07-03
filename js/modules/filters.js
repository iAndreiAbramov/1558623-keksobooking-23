import { ADS_NUMBER_TO_SHOW } from '../settings/settings.js';
import { renderAdsFromCache } from './map-leaflet.js';

const form = document.querySelector('.map__filters');
const filterInputs = form.querySelectorAll('input');
const filterSelects = form.querySelectorAll('select');

const filterData = (dataArray, numberOfAds) => {
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

  const featuresList = getInputsValues();
  const optionsList = getSelectsValues();

  console.log(dataArray);

  const filteredDataArray = dataArray.filter((item) => {
    if (!item.offer.features || item.offer.features.length === 0) {
      return false;
    }
    for (const feature of featuresList) {
      if (!item.offer.features.includes(feature)) {
        return false;
      }
    }



    return true;
  });

  console.log(filteredDataArray);

  return filteredDataArray.slice(0, numberOfAds);
};

const setFilterChangeHandler = () => {
  filterInputs.forEach((input) => {
    input.addEventListener('change', () => renderAdsFromCache(ADS_NUMBER_TO_SHOW));
  });

  filterSelects.forEach((select) => {
    select.addEventListener('change', () => renderAdsFromCache(ADS_NUMBER_TO_SHOW));
  });
};

export { setFilterChangeHandler, filterData };
