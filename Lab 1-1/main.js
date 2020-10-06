//Lab 1-1
const random = (min, max) => Math.random() * (max - min) + min;
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
  let arrayT = tablT(array); //Создание массива периодов
  let arrayDT = tablDT(array, average(array, number)); //Создание массива абс. погрешностей
  let arrayDTpow = tablDT(array, average(array, number)).map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000);  // Создание массива квадратов абс. погрешностей
  let arrayln = tabln(array, number);
  let arraydnN = dnN(tabln(array, number), number);
  //Вывод в html
  let table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('color', '000');
  let tbody = document.createElement('tbody');
  let h4 = document.createElement('h4');
    h4.innerHTML = `Таблица на ${number} значений`;
  let div = document.createElement('div');
  let p = document.createElement('p');
    p.innerHTML = `Сумма значений периодов(Σ T) для ${number} замеров: ${Math.round((tablT(array).reduce((acc, elem) => acc + Number(elem), 0)) * 10000) / 10000} <br>Среднее значение периода (T) для ${number} замеров: ${average(array, number)} <br>Сумма квадратов абсолютных погрешностей(Σ(△ T)²) <br> для ${number} замеров: ${Math.round(arrayDTpow.reduce((acc, elem) => acc + elem, 0) * 100000000) / 100000000} <br>Среднее значение квадрата абсолютной погрешности <br>(Σ(△ T)²) / ${number} для ${number} замеров: ${Math.round((arrayDTpow.reduce((acc, elem) => acc + elem, 0)) / number * 1000000000) / 1000000000}`
  //Таблыця
  let tr = document.createElement('tr');
    tr.innerHTML = '<td>№</td><td>T,сек</td><td>Период</td><td>Погрешность</td><td>Квадрат. погрешн.</td>';
    tbody.appendChild(tr);
  for(let i = 0;i<number;i++){
    let tr = document.createElement('tr');
    for(let k = 0;k<5;k++){
    let td = document.createElement('td')
    switch (k){
      case 0:
        td.innerHTML = i+1;
        break;
      case 1:
        td.innerHTML = array[i];
        break;
      case 2:
        td.innerHTML = arrayT[i];
        break;
      case 3:
        td.innerHTML = arrayDT[i];
        break;
      case 4:
        td.innerHTML = arrayDTpow[i].toFixed(8);
        break;
    }
    tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  div.appendChild(h4)
  div.appendChild(table)
  div.appendChild(p)
  document.querySelector('#table-lab').appendChild(div);
  //Таблица дельта Т
  table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('color', '000');
  tbody = document.createElement('tbody');
  div = document.createElement('div');
  h4 = document.createElement('h4');
    h4.innerHTML = `Таблица интервалов отклонений для ${number} элементов`;
  //Таблыця
  tr = document.createElement('tr');
    tr.innerHTML = '<td>№</td><td>△ T</td>';
    tbody.appendChild(tr);
  for(let i = 0; i<arrayln.length;i++){
      let tr = document.createElement('tr');
      for(let k = 0; k<2; k++){
        let td = document.createElement('td');
        switch (k){
          case 0:
            td.innerHTML = i+1;
            break;
          case 1:
            td.innerHTML = arrayln[i];
            break;
        }
          tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  table.appendChild(tbody);
  div.appendChild(h4);
  div.appendChild(table);
  document.querySelector('#table-lab').appendChild(div);
  //Таблица дельта Т / number
  table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('color', '000');
  tbody = document.createElement('tbody');
  div = document.createElement('div');
  h4 = document.createElement('h4');
    h4.innerHTML = `Таблица интервалов отклонений для ${number} элементов × 1/${number}`;
  //Таблыця
  tr = document.createElement('tr');
    tr.innerHTML = `<td>№</td><td>△ T / ${number}</td>`;
    tbody.appendChild(tr);
  for(let i = 0; i<arraydnN.length;i++){
      let tr = document.createElement('tr');
      for(let k = 0; k<2; k++){
        let td = document.createElement('td');
        switch (k){
          case 0:
            td.innerHTML = i+1;
            break;
          case 1:
            td.innerHTML = arraydnN[i];
            break;
        }
          tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  table.appendChild(tbody);
  div.appendChild(h4)
  div.appendChild(table)
  document.querySelector('#table-lab').appendChild(div);
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