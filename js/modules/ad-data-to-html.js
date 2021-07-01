const adDataToHTML = (offerData) => {
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
  authorAvatar.src = `${offerData.author.avatar}`;

  // Заголовок
  if (!offerData.offer.title) {
    offerTitle.remove();
  } else {
    offerTitle.textContent = offerData.offer.title;
  }

  // Адрес
  if (!offerData.offer.address) {
    offerAddress.remove();
  } else {
    offerAddress.textContent = offerData.offer.address;
  }

  // Цена
  if (!offerData.price) {
    offerPrice.remove();
  } else {
    offerPrice.innerHTML = `
        ${offerData.price} <span>₽/ночь</span>
      `;
  }

  // Тип жилья
  if (!offerData.type) {
    offerType.remove();
  } else {
    offerType.textContent = typesMap[offerData.type];
  }

  // Вместимость
  if (!offerData.rooms && !offerData.guests) {
    offerCapacity.remove();
  } else {
    let roomsCorrectText = 'комнат';
    if (offerData.rooms === 1) {
      roomsCorrectText = 'комната';
    }
    if (offerData.rooms > 1 && offerData.rooms < 5) {
      roomsCorrectText = 'комнаты';
    }
    offerCapacity.textContent = `${offerData.rooms} ${roomsCorrectText} для ${offerData.guests} гостей`;
  }

  // Въезд - выезд
  if (!offerData.checkin && !offerData.checkout) {
    offerCheckInOut.remove();
  } else {
    offerCheckInOut.textContent = `
        Заезд после ${offerData.checkin}, выезд до ${offerData.checkout};
      `;
  }

  // Удобства
  if (!offerData.offer.features || offerData.offer.features.length === 0) {
    offerFeatures.remove();
  } else {
    const featuresAll = offerFeatures.querySelectorAll('.popup__feature');
    offerFeatures.innerHTML = '';
    const featuresAvailable = offerData.offer.features.map((item) => `popup__feature--${item}`);
    featuresAvailable.forEach((featureAvailable) => {
      featuresAll.forEach((feature) => {
        if (feature.classList.contains(featureAvailable)) {
          offerFeatures.appendChild(feature);
        }
      });
    });
  }

  // Описание
  if (!offerData.offer.description) {
    offerDescription.remove();
  } else {
    offerDescription.textContent = offerData.description;
  }

  // Фото
  if (!offerData.offer.photos || offerData.offer.photos.length === 0) {
    offerPhotos.remove();
  } else {
    offerPhotos.innerHTML = '';
    offerData.offer.photos.forEach((photo) => {
      offerPhotos.insertAdjacentHTML(
        'afterbegin',
        `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`,
      );
    });
  }
  return offerHtml;
};

export { adDataToHTML };
