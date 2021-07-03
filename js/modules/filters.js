import { ADS_NUMBER_TO_SHOW, PriceCategories } from '../settings/settings.js';
import { renderAdsFromCache } from './map-leaflet.js';
import { isInRange } from '../services/utils.js';

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

  // console.log(dataArray);
  // console.log(optionsList);

  const filteredDataArray = dataArray.filter((item) => {
    if (featuresList.length > 0 && (!item.offer.features || item.offer.features.length === 0)) {
      return false;
    }
    for (const feature of featuresList) {
      if (!item.offer.features.includes(feature)) {
        return false;
      }
    }
    if (optionsList['housing-type'] && optionsList['housing-type'] !== item.offer.type) {
      return false;
    }
    if (optionsList['housing-rooms'] && +optionsList['housing-rooms'] !== +item.offer.rooms) {
      return false;
    }
    if (optionsList['housing-guests'] && +optionsList['housing-guests'] !== +item.offer.guests) {
      return false;
    }
    if (optionsList['housing-price'] && !isInRange(+item.offer.price, PriceCategories[optionsList['housing-price']])) {
      return false;
    }
    return true;
  });

  // console.log(filteredDataArray.length);

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
