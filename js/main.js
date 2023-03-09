import {wordsArray} from './arrayWords.js'

let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
let result = document.querySelector('.message');

const keyboardButtons = Array.from(document.querySelectorAll('.keyboard__button'));

const NUMBER_ATTEMPTS = 6;


let enteredLetterNumber = 0;
let nextWords = 0;
let wastedTry = [];

function renderingField(){
  const gameBoard = document.querySelector('.game__board');

  for(let i = 0; i<NUMBER_ATTEMPTS; i++){
    const rowsBoard = document.createElement('div');
    rowsBoard.classList = 'game__row';

    gameBoard.append(rowsBoard);

    for(let j = 0; j<5; j++){
      const cellsBoard = document.createElement('div');
      cellsBoard.classList = 'game__cell';

      rowsBoard.append(cellsBoard);
    }
  }
}

// Присваиваем аттрибуты кнопкам
keyboardButtons.forEach(key => {
  key.setAttribute('value-key', key.innerHTML);

  if(key.innerHTML === 'Ввод'){
    key.setAttribute('value-key', 'Enter');
  }
  if(key.innerHTML === '⌫'){
    key.setAttribute('value-key', 'Backspace');
  }
})

document.addEventListener('click', (event) => {
  inputConditions(event);

  if(event.target.hasAttribute('value-key')){
    if(event.target.getAttribute('value-key') !== 'Backspace' && event.target.getAttribute('value-key') !== 'Enter'){
      enteringWord(event.target.innerHTML);
    }
  }
})

document.addEventListener('keydown', (event) => {
  inputConditions(event)

  if(event.key.match(/[А-Яа-я]/g)){
    enteringWord(event.key);
  }
})

function inputConditions(event){
      //Удаляем буквы 
      if(event.key === 'Backspace' || event.target.getAttribute('value-key') === 'Backspace' && enteredLetterNumber != 0){
        removeLetter()
      }
  
    // Пишем с новой строки
    if(event.key === 'Enter' || event.target.getAttribute('value-key') === 'Enter'  && enteredLetterNumber === 5){
         // Проверка есть ли у нас вообще такое слово
         if(!wordsArray.includes(wastedTry.join(''))){
          result.innerHTML = 'Такого слова нет';
          return
        }
        wordCheck();
        // Проверка на победу
        if(wastedTry.join('') === randomWord){
          const reset = document.querySelector('.reset');
          reset.style = 'display: block';
          result.innerHTML = 'Вы выйграли';
      
          return
        }
        // Проверка на пройгрыш
        if(nextWords === NUMBER_ATTEMPTS - 1){
          const reset = document.querySelector('.reset');
          reset.style = 'display: block';
          result.innerHTML = 'Вы проиграли';
    
          return  
        }
      nextWords++
      enteredLetterNumber = 0
      wastedTry.length=0;
    }
}

function removeLetter(){
  if(enteredLetterNumber === 0){
    return
  }

  const rowsBoard = document.querySelectorAll('.game__row');
  let entered = rowsBoard[nextWords].children[enteredLetterNumber - 1];
  wastedTry.pop();
  enteredLetterNumber-- 
  entered.innerHTML = '';
  entered.style.border = '';
  result.innerHTML = '';
}

function enteringWord(presssedKkey) {
   if(enteredLetterNumber === 5){
    return 
   } 

  const rowsBoard = document.querySelectorAll('.game__row');
  let entered = rowsBoard[nextWords].children[enteredLetterNumber];

  entered.innerHTML = presssedKkey.toUpperCase();
  entered.style.border = '1px solid black' 

  enteredLetterNumber++

  wastedTry.push(presssedKkey.toUpperCase());
}

function wordCheck(){
  const rowsBoard = document.querySelectorAll('.game__row');
  let entered = rowsBoard[nextWords].children;
  // Загаданное слово в виде массива
  let arrLetterRandomWord = randomWord.split('');
  // 1.Если в слове есть такая буква, но не на своем месте = желтым. Если нету серым. Если на своем - зеленым
  for(let i=0; i<5; i++){
    if(arrLetterRandomWord.indexOf(wastedTry[i]) === -1){
      entered[i].style.backgroundColor = 'grey'
    }
    else if(arrLetterRandomWord[i] === wastedTry[i]){
      entered[i].style.backgroundColor = 'green'
    }
    else{
      entered[i].style.backgroundColor = 'yellow'
    }
  }
}

renderingField()