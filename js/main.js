import {wordsArray} from './arrayWords.js'

let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

const NUMBER_ATTEMPTS = 6;


let enteredLetterNumber = 0;
let nextWords = 0

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

document.addEventListener('keydown', (event) => {
  
    //Удаляем буквы 
    if(event.key === 'Backspace' && enteredLetterNumber != 0){
      removeLetter()
    }


  // Пишем с новой строки
  if(event.key === 'Enter' && enteredLetterNumber === 5){
    nextWords++
    enteredLetterNumber = 0
  }

  // Вводим слово
  if(event.key.match(/[А-Яа-я]/g)){
    enteringWord(event.key)
  }
})

function removeLetter(){
  const rowsBoard = document.querySelectorAll('.game__row');
  let entered = rowsBoard[nextWords].children[enteredLetterNumber - 1];
  enteredLetterNumber-- 
  entered.innerHTML = ''
}

function enteringWord(presssedKkey) {
   if(enteredLetterNumber === 5){
    return 
   } 

  const rowsBoard = document.querySelectorAll('.game__row');
  let entered = rowsBoard[nextWords].children[enteredLetterNumber];
  entered.innerHTML = presssedKkey.toUpperCase();
  enteredLetterNumber++
}


renderingField()