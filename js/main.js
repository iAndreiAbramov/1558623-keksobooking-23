// Задание №2.1
const getRandomInteger = (min, max) => {
  if (min < 0) {
    return null;
  }
  min -= 0.5;
  max += 0.5;
  const randomInteger = min + Math.random() * (max - min);
  return Math.round(randomInteger);
};

// eslint-disable-next-line no-console
// console.log(getRandomInteger(1, 10));

// Задание №2.2
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

// eslint-disable-next-line no-console
// console.log(getRandomFloat(10, 0, 2));
// eslint-disable-next-line no-console
// console.log(getRandomFloat(1.5555, -10.5556, 3));

// Задание №4.1
const USERS = ['user01', 'user02', 'user03', 'user04', 'user05', 'user06', 'user07', 'user08'];
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomValuesFromArr = (array) => array.filter(() => getRandomInteger(0, 1) === 1);

const Ad = function(currentUser) {
  this.author = {
    avatar: `img/avatars/${currentUser}.png`,
  };
  this.offer = {
    title: 'Только лучшие апартаменты!',
    // Вот в этом месте совсем не понял что писать в address.
    // Пока как-то так...)
    address: 'location.x, location.y',
  };
  this.price = getRandomInteger(0, 10000);
  this.type = HOUSING_TYPES[getRandomInteger(0, HOUSING_TYPES.length - 1)];
  this.rooms = getRandomInteger(1, 10);
  this.guests = getRandomInteger(1, 10);
  this.checkin = CHECKINS[getRandomInteger(0, CHECKINS.length - 1)];
  this.checkout = CHECKOUTS[getRandomInteger(0, CHECKOUTS.length - 1)];
  this.features = getRandomValuesFromArr(FEATURES_LIST);
  this.description = 'Бери не пожалеешь! Век усов не видать!';
  this.photos = getRandomValuesFromArr(PHOTOS_LIST);
  this.location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const generateAdsArray = (numberOfAds) => {
  const adsArray = [];
  // Создаем копию массива списка пользователей, чтобы не затрагивать исходный массив USERS.
  const copyOfUsers = [...USERS];
  for (let index = 0; index < numberOfAds; index++) {
    // Выбираем случайного пользователя из копии массива пользователей, при этом вырезая
    // его оттуда. Это для соблюдения требования, что адреса аватарок не должны повторяться.
    // Единственная проблема, что пользователей в задании 8, а объявлений надо сгенерировать 10,
    // т.е. уникальных аватарок на всех не хватит.
    let currentUser = copyOfUsers.splice(getRandomInteger(0, copyOfUsers.length - 1), 1);
    // Если аватарки у пользователя нет, то ставим заглушку. Пусть это будет какой-то
    // неопознанный енот (условно, т.к. такой картинки у нас тоже нет).
    currentUser = (currentUser.length > 0) ? currentUser : 'unknownRaccoon';
    const adItem = new Ad(currentUser);
    adsArray.push(adItem);
  }
  return adsArray;
};

// eslint-disable-next-line no-console
console.log(generateAdsArray(10));
