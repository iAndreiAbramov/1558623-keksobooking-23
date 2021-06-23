import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomItemsFromArr} from '../services/utils.js';

const USERS = ['user01', 'user02', 'user03', 'user04', 'user05', 'user06', 'user07', 'user08'];
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LATITUDES = {
  min: 35.65000,
  max: 35.70000,
};

const LONGITUDES = {
  min: 139.70000,
  max: 139.80000,
};

const getNewAd = (currentUser) => {
  const newAd = {
    author: {
      avatar: `img/avatars/${currentUser}.png`,
    },
    offer: {
      title: 'Только лучшие апартаменты!',
      address: [getRandomPositiveFloat(LATITUDES.min, LATITUDES.max, 5), getRandomPositiveFloat(LONGITUDES.min, LONGITUDES.max, 5)],
    },
    price: getRandomPositiveInteger(0, 10000),
    type: HOUSING_TYPES[getRandomPositiveInteger(0, HOUSING_TYPES.length - 1)],
    rooms: getRandomPositiveInteger(1, 10),
    guests: getRandomPositiveInteger(1, 10),
    checkin: TIMES[getRandomPositiveInteger(0, TIMES.length - 1)],
    checkout: TIMES[getRandomPositiveInteger(0, TIMES.length - 1)],
    features: getRandomItemsFromArr(FEATURES_LIST),
    description: 'Бери не пожалеешь! Век усов не видать!',
    photos: getRandomItemsFromArr(PHOTOS_LIST),
    location: {
      lat: getRandomPositiveFloat(LATITUDES.min, LATITUDES.max, 5),
      lng: getRandomPositiveFloat(LONGITUDES.min, LONGITUDES.max, 5),
    },
  };
  return newAd;
};

const generateAdsArray = (numberOfAds) => {
  const adsArray = [];
  const copyOfUsers = [...USERS];
  for (let index = 0; index < numberOfAds; index++) {
    let currentUser = copyOfUsers.splice(getRandomPositiveInteger(0, copyOfUsers.length - 1), 1);

    currentUser = (currentUser.length > 0) ? currentUser : 'unknownRaccoon';
    const adItem = getNewAd(currentUser);
    adsArray.push(adItem);
  }
  return adsArray;
};

export {generateAdsArray};
