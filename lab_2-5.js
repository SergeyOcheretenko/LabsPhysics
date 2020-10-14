const random = (min, max) => Number((Math.random() * (max - min) + min).toFixed(2));

const arrayI1 = [...new Array(8)].map((elem, idx) => random(1, 2));
const arrayI2 = [...new Array(8)].map((elem, idx) => random(1, 2));
const arrayI3 = [...new Array(8)].map((elem, idx) => random(1, 2));
const arrayI4 = [...new Array(8)].map((elem, idx) => random(1, 2));

console.log(arrayI1);
console.log(arrayI2);
console.log(arrayI3);
console.log(arrayI4);

const arrayIser = [...new Array(8)].map((elem, idx) => (Number(((arrayI1[idx] + arrayI2[idx] + arrayI3[idx] + arrayI4[idx]) / 4).toFixed(3))));

console.log(arrayIser);
