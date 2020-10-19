/* jshint esversion: 7 */
// Lab 1-2
const PI = Math.PI;

// Псевдо випадкові числа
function uniformRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Рандом за гауссом
function gaussianRandom(mean, sigma) {
    let u = Math.random() * 0.682;
    return ((u % 1e-8 > 5e-9 ? 1 : -1) * (Math.sqrt(-Math.log(Math.max(1e-9, u))) - 0.618)) * 1.618 * sigma + mean;
}

// Округлення до n-ого знака пілся коми
function roundOff(num, places) {
    const x = Math.pow(10, places);
    return Math.round((num + Number.EPSILON) * x) / x;
}

// Перетворює два масиви в масив об'єктів координат
function zip(array1, array2) {
    let result = [];
    let end = Math.min(array1.length, array2.length);
    for (let i=0; i < end; i++)
        result.push({x: array1[i], y: array2[i]});
    return result;
}


// Массив а
let arrayA = [0.70, 0.67, 0.64, 0.60, 0.57, 0.54, 0.51, 0.48, 0.45, 0.41, 0.38, 0.35, 0.32, 0.28, 0.25];

// Массив T
let arrayT = []; 
const diap = [2.0267, 2.0080, 1.9883, 1.9667, 1.9497, 1.9363, 1.9257, 1.9183, 1.9120, 1.9113, 1.9163, 1.9283, 1.9493, 1.9953, 2.0450];

const mean = uniformRandom(-0.025, 0.01); // мода для гаусса
const sigma = 0.001;                      // сігма для гаусса

for(let i = 0; i < 3 * diap.length; i++) {
    let a = diap[parseInt(i / 3)];
    arrayT.push(roundOff(a + gaussianRandom(mean, sigma), 3));
}

// Массив ⟨T⟩
let arrayAverageT = [...new Array(15)].map((elem, idx) => roundOff((arrayT[idx * 3 + 0] + arrayT[idx * 3 + 1] + arrayT[idx * 3 + 2]) / 3, 5));

// Массив а²
let arraySquareA = [...new Array(15)].map((elem, idx) => roundOff(arrayA[idx] ** 2, 4));

// Массив ⟨T⟩² ⋅ a
let arraySquareTxA = [...new Array(15)].map((elem, idx) => roundOff(arrayA[idx] * arrayAverageT[idx] ** 2, 4)); 

const Tmin = Math.min(...arrayAverageT);
const a0 = arrayA[arrayAverageT.indexOf(Tmin)];
const k = roundOff((arraySquareTxA[2] - arraySquareTxA[5]) / (arraySquareA[2] - arraySquareA[5]), 3);
const b = roundOff(arraySquareTxA[2] - k * arraySquareA[2], 3);
const g = roundOff(4 * PI * PI / k, 2);
const L = roundOff(Math.sqrt(b * 3 * g / PI / PI), 3);
const relativeError = roundOff(Math.abs((g - 9.8) / 9.8 * 100), 2);

// Вывод:

// Создание таблицы 1
let tbody = document.getElementById('table-1__body');
for (let i=0; i < arrayA.length; i++){
    tbody.insertAdjacentHTML('beforeend', `
        <tr>
            <td rowspan="3">${i + 1}</td>
            <td rowspan="3">${arrayA[i]}</td>
            <td>${arrayT[3*i + 0]}</td>
            <td rowspan="3">${arrayAverageT[i]}</td>
            <td rowspan="3">${arraySquareA[i]}</td>
            <td rowspan="3">${arraySquareTxA[i]}</td>
        </tr>
        <tr>
            <td>${arrayT[3*i + 1]}</td>
        </tr>
        <tr>
            <td>${arrayT[3*i + 2]}</td>
        </tr>
    `);
}

// Создание таблицы 2
document.getElementById('table-2__body').innerHTML = `
    <tr>
        <td>T<sub>min</sub> (c) = ${Tmin}</td>
        <td>k (с² / м) = ${k}</td>
    </tr>
    <tr>
        <td>a<sub>0</sub> (м) = ${a0}; a<sub>0 теор</sub> (м) = 0.435</td>
        <td>b (м ⋅ с²) = ${b}</td>
    </tr>
    <tr>
        <td>g<sub>екс</sub>   (м / с²) = ${g}; g<sub>табл</sub> (м / с²) = 9.8</td>
        <td>L<sub>екс</sub> (м) = ${L}; L<sub>вим</sub> (м) = 1.5</td>
    </tr>
    <tr>
        <td colspan="2">Похибка ε = (|g<sub>екс</sub> – g<sub>табл</sub>| / g<sub>табл</sub>) ⋅ 100% = ${relativeError} %</td>
    </tr>
`;

// Розвертаємо масиви для побудови графіків
for (let array of [arrayA, arrayAverageT, arraySquareA, arraySquareTxA])
    array.reverse();

// Графік 1
let chart1 = new Chart(document.getElementById('chart-1').getContext('2d'), {
    type: 'scatter',
    data: {
        datasets: [{
            // Виділяємо мінімальний показник
            borderColor: '#FF6384',
            backgroundColor: '#FF6384',
            fill: false,
            data: [{x: a0, y: Tmin}]
        },
        {
            // Дані, де x = a, y = T
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB',
            fill: false,
            data: zip(arrayA, arrayAverageT),
            type: 'line'
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'nearest',
            intersect: false,
        },
        legend: {display: false},
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'a'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '⟨T⟩'
                }
            }]
        }
    }
});

// Останній елемент списку з ⟨T⟩² ⋅ a
let lastArraySquareA = arraySquareA[arraySquareA.length - 1];

// Графік 2
let chart2 = new Chart(document.getElementById('chart-2').getContext('2d'), {
    type: 'scatter',
    data: {
        datasets: [{
            // Дані, де x = a², y = ⟨T⟩² ⋅ a
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB',
            data: zip(arraySquareA, arraySquareTxA)
        },
        {
            // Лінія побудована за y = k * x + b
            borderColor: '#FF6384',
            borderWidth: 1,
            pointRadius: 0,
            data: [{x: 0, y: b}, {x: lastArraySquareA, y: k * lastArraySquareA + b}],
            fill: false,
            type: 'line'
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'nearest',
            intersect: false,
        },
        legend: {display: false},
        scales: {
            xAxes: [{
                beginAtZero: true,
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: 'a²'
                }
            }],
            yAxes: [{
                beginAtZero: true,
                scaleLabel: {
                    display: true,
                    labelString: '⟨T⟩² ⋅ a'
                }
            }]
        }
    }
});