// code from new branch

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let array1 = [];
let array = [];

for(let i = 0; i < 100; i++){
  array.push(`15.${Math.round(random(70, 97))}`)
  if (i < 50) array1.push(array[i]);
}

const tabl = (array, number) => {
  console.log(array);
  let arrayT = array.map(elem => Math.round(elem / 5 * 1000) / 1000)
  console.log(arrayT);
  let ser = Math.round((arrayT.reduce((acc, elem) => acc + Number(elem), 0)) / number *   10000) / 10000;
  console.log(Math.round((arrayT.reduce((acc, elem) => acc + Number(elem), 0)) * 10000) / 10000);
  console.log(ser);
  let arrayDT = arrayT.map(elem => elem = Math.round((elem - ser) * 10000) / 10000)
  console.log(arrayDT);
  let arrayDTpow = arrayDT.map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000);
  console.log(arrayDTpow);
  console.log(Math.round(arrayDTpow.reduce((acc, elem) => acc + elem, 0) * 100000000) / 100000000);
  console.log(Math.round((arrayDTpow.reduce((acc, elem) => acc + elem, 0)) / number * 1000000000) / 1000000000);
}

const tabln = (array1, number) => {
  let arrayT = array1.map(elem => Math.round(elem / 5 * 1000) / 1000);
  let ser = Math.round((arrayT.reduce((acc, elem) => acc + Number(elem), 0)) / number *   10000) / 10000;
  let arrayDT = arrayT.map(elem => elem = Math.round((elem - ser) * 10000) / 10000);
  let arrayN = [];
  for (let i = 0; i < 20; i++) arrayN.push(0);
  for (const elem of arrayDT){
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

const dnN = (array, number) => {
  let arrayDnN = [];
  for (let i = 0; i < 20; i++) arrayDnN.push('');
  for (let i = 0; i < 20; i++){
    if (array[i] == 0) arrayDnN[i] += '0';
    else arrayDnN[i] += `${array[i]}/${number}`;
  }
  console.log(arrayDnN);
}

const s = (array, number) => {
  let arrayT = array.map(elem => Math.round(elem / 5 * 1000) / 1000);
  let ser = Math.round((arrayT.reduce((acc, elem) => acc + Number(elem), 0)) / number *   10000) / 10000;
  let arrayDT = arrayT.map(elem => elem = Math.round((elem - ser) * 10000) / 10000);
  let arrayDTpow = arrayDT.map(elem => elem = Math.round(elem ** 2 * 100000000) / 100000000);
  console.log(Math.round(Math.sqrt(arrayDTpow.reduce((acc, elem) => acc + elem, 0) / number / (number - 1)) * 100000000) / 100000000);
}


tabl(array1, 50);
console.log(tabln(array1, 50));
tabl(array, 100);
console.log(tabln(array, 100));
dnN(tabln(array1, 50), 50);
dnN(tabln(array, 100), 100);

s(array1, 50);
s(array, 100);

console.log(Math.round(0.01 / (5 * Math.sqrt(12)) * 1000000) / 1000000);
