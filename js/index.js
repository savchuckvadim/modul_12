// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const minFilter = document.querySelector('.minweight__input');
const maxFilter = document.querySelector('.maxweight__input');
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
let doc = document;
const wrapper = doc.getElementsByClassName('fruits__wrapper');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);


//Перебираем массив JSON
console.log(Object.keys(fruits));



/*** ОТОБРАЖЕНИЕ ***/
function deleteDisplay(){
  Array.prototype.slice.call(document.getElementsByClassName('center')).forEach(
    function(item) {
      item.remove();
      console.log('deleteDisplay сработал');
      // or item.parentNode.removeChild(item); for older browsers (Edge-)
  });
}
// отрисовка карточек
function display() {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  
  
  for (let i = 0; i < fruits.length; i++) {

    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let fruitItemClass = 'fruit__item ';
  if (fruits[i]["color"] == "фиолетовый"){
    fruitItemClass = 'center fruit__item fruit_violet';

  }
  else if (fruits[i]["color"] == "зеленый"){
    fruitItemClass = 'center fruit__item fruit_green';

  }
  else if (fruits[i]["color"] == "зеленый"){
    fruitItemClass = 'center fruit__item fruit_green';

  }
  else if (fruits[i]["color"] == "розово-красный"){
    fruitItemClass = 'center fruit__item fruit_carmazin';

  }
  else if (fruits[i]["color"] == "желтый"){
    fruitItemClass = 'center fruit__item fruit_yellow';

  }
  else if (fruits[i]["color"] == "светло-коричневый"){
    fruitItemClass = 'center fruit__item fruit_lightbrown';

  } 
 

  let fruitItem = doc.createElement("li");
  fruitItem.setAttribute('class', fruitItemClass);
  fruitsList.appendChild(fruitItem);
  console.log(fruitItem);
  

  let fruitInfo = doc.createElement("div");
  fruitInfo.setAttribute('class', 'center fruit__info');
  fruitItem.appendChild(fruitInfo);
  


  let divIndex = doc.createElement("div");
  let index = divIndex.innerHTML = `index: ${i}`;
  let divKind = doc.createElement("div");
  let kind = divKind.innerHTML = `kind: ${fruits[i]['kind']}`;
  let divColor = doc.createElement("div");
  let color = divColor.innerHTML = `color: ${fruits[i]['color']}`;
  let divWeight = doc.createElement("div");
  let weight = divWeight.innerHTML = `weight: ${fruits[i]['weight']}`;
  fruitInfo.appendChild(divIndex);
  fruitInfo.appendChild(divKind);
  fruitInfo.appendChild(divColor);
  fruitInfo.appendChild(divWeight);
  
  console.log(divKind);
  console.log(divColor);
  console.log(divWeight);
  }
  const fInfo = doc.querySelector('.fruit__info');
  console.log('display сработал');
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* перемешивание массива*/

function shuffleFruits(){
   

for (i = fruits.length -1; i > 0; i--) {
  let j = Math.floor(Math.random() * i);
  let k = fruits[i];
  fruits[i] = fruits[j];
  fruits[j] = k;
}
console.log(fruits);
if (JSON.parse(fruitsJSON) == fruits){
  alert('Перемешивание не удалось. Повторите попытку!')
}
else {
return (fruits);
}

}
shuffleButton.addEventListener('click', () => {
  deleteDisplay();
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива


function fFruits(){
  let min = 0;
  let max = 0;
  if(minFilter.value == '' && maxFilter.value == '') {
    min = 0;
    max = Infinity;
  }

  if(minFilter.value == '' && maxFilter.value !== '') {
    min = 0;
    max = maxFilter.value;
  }
  if(minFilter.value !== '' && maxFilter.value == '') {
      min = minFilter.value;
      max = Infinity;
  }
  if(minFilter.value !== '' && maxFilter.value !== '') {
    min = minFilter.value;
    max = maxFilter.value;
  }
  
const filterFruits =  fruits.filter(function (item){
  
 
  console.log(minFilter.value);
  return (item.weight >= min && item.weight <= max); })
console.log(filterFruits);

fruits = filterFruits;
};
filterButton.addEventListener('click', () => {
  fFruits();
  deleteDisplay();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  
  return a.color === 'фиолетовый' ? true : false;
  
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(fruits, comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = fruits.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparationColor(fruits[j], fruits[j+1])) { 
                // делаем обмен элементов
                let temp = fruits[j+1]; 
                fruits[j+1] = fruits[j]; 
                fruits[j] = temp; 
            }
        }
    }        
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind == 'bubbleSort') sortKind = 'quickSort';
  else if(sortKind == 'quickSort') sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  deleteDisplay();
  display();
  sortTimeLabel.textContent = sortTime;
  
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
