const adDataToHTML = (adItem) => {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const typesMap = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель',
  };

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
  authorAvatar.src = `${adItem.author.avatar}`;

  // Заголовок
  if (!adItem.offer.title) {
    offerTitle.remove();
  } else {
    offerTitle.textContent = adItem.offer.title;
  }

  // Адрес
  if (!adItem.offer.address) {
    offerAddress.remove();
  } else {
    offerAddress.textContent = adItem.offer.address;
  }

  // Цена
  if (!adItem.price) {
    offerPrice.remove();
  } else {
    offerPrice.innerHTML = `
        ${adItem.price} <span>₽/ночь</span>
      `;
  }

  // Тип жилья
  if (!adItem.type) {
    offerType.remove();
  } else {
    offerType.textContent = typesMap[adItem.type];
  }

  // Вместимость
  if (!adItem.rooms && !adItem.guests) {
    offerCapacity.remove();
  } else {
    let roomsCorrectText = 'комнат';
    if (adItem.rooms === 1) {
      roomsCorrectText = 'комната';
    }
    if (adItem.rooms > 1 && adItem.rooms < 5) {
      roomsCorrectText = 'комнаты';
    }
    offerCapacity.textContent = `${adItem.rooms} ${roomsCorrectText} для ${adItem.guests} гостей`;
  }

  // Въезд - выезд
  if (!adItem.checkin && !adItem.checkout) {
    offerCheckInOut.remove();
  } else {
    offerCheckInOut.textContent = `
        Заезд после ${adItem.checkin}, выезд до ${adItem.checkout};
      `;
  }

  // Удобства
  if (!adItem.offer.features || adItem.offer.features.length === 0) {
    offerFeatures.remove();
  } else {
    const featuresAll = offerFeatures.querySelectorAll('.popup__feature');
    offerFeatures.innerHTML = '';
    const featuresAvailable = adItem.offer.features.map((item) => `popup__feature--${item}`);
    featuresAvailable.forEach((featureAvailable) => {
      featuresAll.forEach((feature) => {
        if (feature.classList.contains(featureAvailable)) {
          offerFeatures.appendChild(feature);
        }
      });
    });
  }

  // Описание
  if (!adItem.offer.description) {
    offerDescription.remove();
  } else {
    offerDescription.textContent = adItem.description;
  }

  // Фото
  if (!adItem.offer.photos || adItem.offer.photos.length === 0) {
    offerPhotos.remove();
  } else {
    offerPhotos.innerHTML = '';
    adItem.offer.photos.forEach((photo) => {
      offerPhotos.insertAdjacentHTML(
        'afterbegin',
        `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`,
      );
    });
  }
  return offerHtml;
};

export { adDataToHTML };
