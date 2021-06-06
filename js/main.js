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

const getRandomInteger = (min, max) => {
  let startValue = Math.min(min, max);
  let endValue = Math.max(min, max);
  if (min < 0) {
    return null;
  }
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

const getRandomFloat = (min, max, decimalsNumber) => {
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  if (startValue < 0) {
    return null;
  }
  const randomFloat = startValue + Math.random() * (endValue - startValue);
  const result = +randomFloat.toFixed(decimalsNumber);

  if (result > endValue || result < startValue) {
    return null;
  }

  return result;
};

const getRandomItemsFromArr = (array) => array.filter(() => getRandomInteger(0, 1) === 1);

const getNewAd = (currentUser) => {
  const newAd = {
    author: {
      avatar: `img/avatars/${currentUser}.png`,
    },
    offer: {
      title: 'Только лучшие апартаменты!',
      address: 'location.x, location.y',
    },
    price: getRandomInteger(0, 10000),
    type: HOUSING_TYPES[getRandomInteger(0, HOUSING_TYPES.length - 1)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(1, 10),
    checkin: TIMES[getRandomInteger(0, TIMES.length - 1)],
    checkout: TIMES[getRandomInteger(0, TIMES.length - 1)],
    features: getRandomItemsFromArr(FEATURES_LIST),
    description: 'Бери не пожалеешь! Век усов не видать!',
    photos: getRandomItemsFromArr(PHOTOS_LIST),
    location: {
      lat: getRandomFloat(LATITUDES.min, LATITUDES.max, 5),
      lng: getRandomFloat(LONGITUDES.min, LONGITUDES.max, 5),
    },
  };
  return newAd;
};

const generateAdsArray = (numberOfAds) => {
  const adsArray = [];
  const copyOfUsers = [...USERS];
  for (let index = 0; index < numberOfAds; index++) {
    let currentUser = copyOfUsers.splice(getRandomInteger(0, copyOfUsers.length - 1), 1);

    currentUser = (currentUser.length > 0) ? currentUser : 'unknownRaccoon';
    const adItem = getNewAd(currentUser);
    adsArray.push(adItem);
  }
  return adsArray;
};

// eslint-disable-next-line no-console
console.log(generateAdsArray(10));
