// Задание №1
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
console.log(getRandomInteger(1, 10));

// Задание №2
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
console.log(getRandomFloat(10, 0, 2));
// eslint-disable-next-line no-console
console.log(getRandomFloat(1.5555, -10.5556, 3));
