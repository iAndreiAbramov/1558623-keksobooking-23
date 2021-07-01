const getRandomPositiveInteger = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  let startValue = Math.ceil(Math.min(min, max));
  let endValue = Math.floor(Math.max(min, max));
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

const getRandomPositiveFloat = (min, max, decimalsNumber) => {
  min = Math.abs(min);
  max = Math.abs(max);
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  const randomFloat = startValue + Math.random() * (endValue - startValue);
  const result = +randomFloat.toFixed(decimalsNumber);

  if (result > endValue || result < startValue) {
    return null;
  }

  return result;
};

const getRandomItemsFromArr = (array) => array.filter(() => getRandomPositiveInteger(0, 1) === 1);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomItemsFromArr, isEscEvent};
