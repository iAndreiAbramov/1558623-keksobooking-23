

const filterAds = (adsArray) => adsArray.slice(0, 10);

const showLoadFailMessage = (message) => {
  const mapCanvas = document.querySelector('.map__canvas');

  const errorMessageBlock = document.createElement('div');
  errorMessageBlock.style.cssText = `
    position: relative;
    display: flex;
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    z-index: 999;
    color: black;
    text-align: center;
    font-size: 5em;
    font-weight: bold;
  `;
  errorMessageBlock.innerText = message;
  mapCanvas.appendChild(errorMessageBlock);
};

const getData = async (url, onSuccess, onError) => {
  const ads = await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      onError(`Ошибка ${response.status}, не удалось получить данные с сервера...`);
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError('Сервер недоступен, повторите попытку позднее...'));

  return await ads;
};

export { getData, filterAds, showLoadFailMessage };
