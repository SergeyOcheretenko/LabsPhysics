function random(min, max) {
  return Math.random() * (max - min) + min;
}

let array1 = [];
let array = [];

// Заполнение массивов результатов лабораторной
for(let i = 0; i < 100; i++){
  array.push(`15.${Math.round(random(72, 94))}`)
  if (i < 50) array1.push(array[i]);
}

// Создание массива периодов
const tablT = (array) => { return array.map(elem => Math.round(Number(elem) / 5 * 1000) / 1000); }

// Создание среднего значения периода
const average = (array, number) => { return Math.round((tablT(array).reduce((acc, elem) => acc + Number(elem), 0)) / number *   10000) / 10000; }

// Создание массива абсолютных погрешностей
const tablDT = (array, ser) => { return tablT(array).map(elem => elem = Math.round((elem - ser) * 10000) / 10000); }

// Создание массива относительного количества результатов для таблицы размером number, попавших в узкие промежутки
const dnN = (array, number) => {
  let arrayDnN = [];
  for (let i = 0; i < 20; i++) arrayDnN.push('');
  for (let i = 0; i < 20; i++){
    if (array[i] == 0) arrayDnN[i] += '0';
    else arrayDnN[i] += `${array[i]}/${number}`;
  }
  return arrayDnN;
}

// Вычисление средней квадратической погрешности для таблицы размером number
const s = (array, number) => {
  let arrayDTpow = tablDT(array, average(array, number)).map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000);
  return Math.round(Math.sqrt(arrayDTpow.reduce((acc, elem) => acc + elem, 0) / number / (number - 1)) * 100000000) / 100000000;
}

// Функция, систематизирующая вывод всех таблиц по заданому массиву входных данных размером number
const tabl = (array, number) => {
  console.log(array); // Вывод массива результатов лабораторной
  console.log(tablT(array)) // Вывод массива периодов
  console.log(`Сумма значений периодов для ${number} замеров: ${Math.round((tablT(array).reduce((acc, elem) => acc + Number(elem), 0)) * 10000) / 10000}`);
  console.log(`Среднее значение периода для ${number} замеров: ${average(array, number)}`);
  console.log(tablDT(array, average(array, number))); // Вывод массива абсолютных погрешностей
  let arrayDTpow = tablDT(array, average(array, number)).map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000); 
  console.log(arrayDTpow); // Создание и вывод массива квадратов абс. погрешностей
  console.log(`Сумма квадратов абсолютных погрешностей для ${number} замеров: ${Math.round(arrayDTpow.reduce((acc, elem) => acc + elem, 0) * 100000000) / 100000000}`);
  console.log(`Среднее значение квадрата абсолютной погрешности для ${number} замеров: ${Math.round((arrayDTpow.reduce((acc, elem) => acc + elem, 0)) / number * 1000000000) / 1000000000}`);
  console.log(tabln(array, number));
  console.log(dnN(tabln(array, number), number));
  console.log(`Случайная погрешность для ${number} замеров: ${s(array, number)}`);
}

// Создание массива количества результатов, попавших в узкие промежутки
const tabln = (array, number) => {
  let arrayN = [];
  for (let i = 0; i < 20; i++) arrayN.push(0);
  for (const elem of tablDT(array, average(array, number))){
    if (elem >= -0,1){
      if (elem < -0.09) arrayN[0]++;
      else if (elem < -0.08) arrayN[1]++;
      else if (elem < -0.07) arrayN[2]++;
      else if (elem < -0.06) arrayN[3]++;
      else if (elem < -0.05) arrayN[4]++;
      else if (elem < -0.04) arrayN[5]++;
      else if (elem < -0.03) arrayN[6]++;
      else if (elem < -0.02) arrayN[7]++;
      else if (elem < -0.01) arrayN[8]++;
      else if (elem < 0) arrayN[9]++;
      else if (elem < 0.01) arrayN[10]++;
      else if (elem < 0.02) arrayN[11]++;
      else if (elem < 0.03) arrayN[12]++;
      else if (elem < 0.04) arrayN[13]++;
      else if (elem < 0.05) arrayN[14]++;
      else if (elem < 0.06) arrayN[15]++;
      else if (elem < 0.07) arrayN[16]++;
      else if (elem < 0.08) arrayN[17]++;
      else if (elem < 0.09) arrayN[18]++;
      else if (elem < 0.1) arrayN[19]++;
    }
  }
  return(arrayN);
}

tabl(array1, 50);
tabl(array, 100);

console.log(`Систематическая погрешность: ${Math.round(0.01 / (5 * Math.sqrt(12)) * 1000000) / 1000000}`);
