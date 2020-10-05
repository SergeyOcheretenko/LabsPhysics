//Lab 1-1
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
  let arrayT = tablT(array) //Создание массива периодов
  let arrayDT = tablDT(array, average(array, number)) //Создание массива абс. погрешностей
  let arrayDTpow = tablDT(array, average(array, number)).map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000);  // Создание массива квадратов абс. погрешностей
  let arrayln = tabln(array, number)
  let arraydnN = dnN(tabln(array, number), number)
  console.log(`Таблица для ${number} элементов`)
  console.log('-------------------------------------------------------------')//Useless line
  console.log(`| №\t\t|\tT,сек\t|\tПериод\t|\tПогреш.\t|\tКв.погреш.\t|`)
  for(let i = 0; i<number;i++) {
    console.log('|-------+-----------+-----------+-----------+---------------|')//Useless line
    if(arrayDTpow[i]<0.000001  || arrayDTpow[i]===0){console.log(`| ${i+1}.\t|\t${array[i]}\t|\t${arrayT[i]}\t|\t${arrayDT[i]}\t|\t\t${arrayDTpow[i]}\t|`)}
    else{console.log(`| ${i+1}.\t|\t${array[i]}\t|\t${arrayT[i]}\t|\t${arrayDT[i]}\t|\t${arrayDTpow[i]}\t|`)}
  }
  console.log('-------------------------------------------------------------\n')//Useless line
  
  console.log(`Сумма значений периодов(Σ T) для ${number} замеров: ${Math.round((tablT(array).reduce((acc, elem) => acc + Number(elem), 0)) * 10000) / 10000}`);
  console.log(`Среднее значение периода(<T>) для ${number} замеров: ${average(array, number)}\n`);
  console.log(`Сумма квадратов абсолютных погрешностей(Σ(△ T)²) для ${number} замеров: ${Math.round(arrayDTpow.reduce((acc, elem) => acc + elem, 0) * 100000000) / 100000000}`);
  console.log(`Среднее значение квадрата абсолютной погрешности(Σ(△ T)² / ${number}) для ${number} замеров: ${Math.round((arrayDTpow.reduce((acc, elem) => acc + elem, 0)) / number * 1000000000) / 1000000000}\n`);
  console.log(`Таблица интервалов\tТаблица интервалов\nотклонений для ${number}\tотклонений для ${number}\nэлементов\t\t\tэлементов × 1/${number}`)
  console.log(`-----------------\t---------------------`)//Useless line
  console.log(`| №\t\t|\t△ T\t|\t| №\t\t|△ T×1/${number}\t|`)
  for(let k = 0; k<arrayln.length; k++){
    console.log(`|-------+-------|\t|-------+-----------|`)//Useless line
    if(arrayln[k]===0) console.log(`| ${k+1}.\t|\t${arrayln[k]}\t|\t| ${k+1}.\t|     ${arraydnN[k]}\t\t|`)
    else console.log(`| ${k+1}.\t|\t${arrayln[k]}\t|\t| ${k+1}.\t|\t${arraydnN[k]}\t|`)
  }
  console.log(`-----------------\t---------------------`)//Useless line
  console.log(`\nСлучайная погрешность для ${number} замеров: ${s(array, number)}\n`);
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
