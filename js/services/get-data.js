const showErrorMessage = (message) => {
  const mapCanvas = document.querySelector('.map__canvas');

  const errorMessageBlock = document.createElement('div');
  errorMessageBlock.style.cssText = `
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
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

const getAds = () => {
  const ads = fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      showErrorMessage('Данные недоступны, повторите попытку позднее...');
    })
    .then((response) => response.json())
    .catch(() => showErrorMessage('Данные недоступны, повторите попытку позднее...'));

  return ads;
};

export { getAds };
