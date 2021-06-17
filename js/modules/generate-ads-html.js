import {generateAdsArray} from './get-service-data.js';

const generateAdsHTML = (numberOfAds) => {
  const adData = generateAdsArray(numberOfAds);
  const canvas = document.querySelector('#map-canvas');
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const typesMap = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

  canvas.style.display = 'flex';
  canvas.style.justifyContent = 'space-around';
  canvas.style.padding = '10px';

  for (let i = 0; i < numberOfAds; i++) {
    const offerHtml = adTemplate.cloneNode(true);
    const offerTitle = offerHtml.querySelector('.popup__title');
    const offerAddress = offerHtml.querySelector('.popup__text--address');
    const offerPrice = offerHtml.querySelector('.popup__text--price');
    const offerType = offerHtml.querySelector('.popup__type');
    const offerCapacity = offerHtml.querySelector('.popup__text--capacity');
    const offerCheckInOut = offerHtml.querySelector('.popup__text--time');
    const offerFeatures = offerHtml.querySelector('.popup__features');
    const offerDescription = offerHtml.querySelector('.popup__description');
    const offerPhotos = offerHtml.querySelector('.popup__photos');

    // Аватарка
    const authorAvatar = offerHtml.querySelector('.popup__avatar');
    authorAvatar.src = `${adData[i].author.avatar}`;

    // Заголовок
    if (!adData[i].offer.title) {
      offerTitle.remove();
    } else {
      offerTitle.textContent = adData[i].offer.title;
    }

    // Адрес
    if (!adData[i].offer.address) {
      offerAddress.remove();
    } else {
      offerAddress.textContent = adData[i].offer.address;
    }

    // Цена
    if (!adData[i].price) {
      offerPrice.remove();
    } else {
      offerPrice.innerHTML = `
        ${adData[i].price} <span>₽/ночь</span>
      `;
    }

    // Тип жилья
    if (!adData[i].type) {
      offerType.remove();
    } else {
      offerType.textContent = typesMap[adData[i].type];
    }

    // Вместимость
    if (!adData[i].rooms && !adData[i].guests) {
      offerCapacity.remove();
    } else {
      let roomsCorrectText = 'комнат';
      if (adData[i].rooms === 1) {
        roomsCorrectText = 'комната';
      }
      if (adData[i].rooms > 1 && adData[i].rooms < 5) {
        roomsCorrectText = 'комнаты';
      }
      offerCapacity.textContent = `${adData[i].rooms} ${roomsCorrectText} для ${adData[i].guests} гостей`;
    }

    // Въезд - выезд
    if (!adData[i].checkin && !adData[i].checkout) {
      offerCheckInOut.remove();
    } else {
      offerCheckInOut.textContent = `
        Заезд после ${adData[i].checkin}, выезд до ${adData[i].checkout};
      `;
    }

    // Удобства
    if (!adData[i].features.length === 0) {
      offerFeatures.remove();
    } else {
      const featuresAll = offerFeatures.querySelectorAll('.popup__feature');
      offerFeatures.innerHTML = '';
      const featuresAvailable = adData[i].features.map((item) => `popup__feature--${item}`);
      featuresAvailable.forEach((featureAvailable) => {
        featuresAll.forEach((feature) => {
          if (feature.classList.contains(featureAvailable)) {
            offerFeatures.appendChild(feature);
          }
        });
      });
    }

    // Описание
    if (!adData[i].description) {
      offerDescription.remove();
    } else {
      offerDescription.textContent = adData[i].description;
    }

    // Фото
    if (adData[i].photos.length === 0) {
      offerPhotos.remove();
    } else {
      offerPhotos.innerHTML = '';
      adData[i].photos.forEach((photo) => {
        offerPhotos.insertAdjacentHTML(
          'afterbegin',
          `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`,
        );
      });
    }

    canvas.appendChild(offerHtml);
  }
};

export {generateAdsHTML};
