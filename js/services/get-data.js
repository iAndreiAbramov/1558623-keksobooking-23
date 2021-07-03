import { REQUEST_ADS_URL } from '../settings/settings.js';

const cachedData = [];

const showLoadFailMessage = (message) => {
  const mapCanvas = document.querySelector('.map__canvas');

  const errorMessageBlock = document.createElement('div');
  errorMessageBlock.style.cssText = `
    position: relative;
    margin: 10px auto;
    display: flex;
    width: 70%;
    height: 10%;
    align-items: center;
    justify-content: center;
    background-color: #f0f0ea;
    border-radius: 20px;
    border: 1px solid #cb2020;
    z-index: 999;
    color: #353535;
    text-align: center;
    font-size: 2em;
    line-height: 1em;
    font-weight: bold;
  `;
  errorMessageBlock.innerText = message;
  mapCanvas.appendChild(errorMessageBlock);
};

const getData = async (onError) => {
  const ads = await fetch(REQUEST_ADS_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Ошибка ${response.status}, не удалось получить данные с сервера...`);
    })
    .then((response) => response.json())
    .then((dataArray) => {
      dataArray.forEach((item) => {
        cachedData.push(item);
      });
      return dataArray;
    })
    .catch((err) => onError(err.message));

  return await ads || [];
};

export { getData, showLoadFailMessage, cachedData };
