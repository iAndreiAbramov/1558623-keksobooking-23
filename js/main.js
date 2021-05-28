// Задание №1
const getRandomInteger = function(min, max) {
  if (min < 0) {
    return null;
  }
  // Расширяем интервал, чтобы выровнять вероятность выпадения
  // крайних чисел интервала со средними числами, которая в 2 раза
  // меньше вследствие округления до целого;
  min -= 0.5;
  max += 0.5;
  const randomInteger = min + Math.random() * (max - min);
  return Math.round(randomInteger);
};

// eslint-disable-next-line no-console
console.log(getRandomInteger(1, 10));

// Задание №2
const getRandomFloat = function(min, max, decimalsNumber) {
  if (min < 0) {
    return null;
  }
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  const randomFloat = startValue + Math.random() * (endValue - startValue);
  const result = +randomFloat.toFixed(decimalsNumber);

  //Если требуемое число знаков после запятой слишком мало, то может возникнуть ситуация,
  // когда наш результат за счет округления вылетает за пределы интервала. В этом случае можно
  // сразу вернуть null, вернуть результат без округления или запустить рекурсивную функцию,
  // которая будет прибавлять к результату один разряд пока наконец не получится результат,
  // лежащий в интервале. Есть и другие варианты (например поработать с входными параметрами,
  // чтобы исключить неприятные последствия). Выбор, видимо, зависит от того, какие возможности
  // и ограничения на возвращаемый результат у нас есть. Пока поступим предельно просто.

  if (result > endValue || result < startValue) {
    return null;
  }

  return result;
};

// eslint-disable-next-line no-console
console.log(getRandomFloat(10, 0, 2));
// eslint-disable-next-line no-console
console.log(getRandomFloat(1.5555, 1.5556, 3));
