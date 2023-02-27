import {wordsArray} from './arrayWords.js'

let randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

const NUMBER_ATTEMPTS = 6;


let enteredLetterNumber = 0;


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

document.addEventListener('keydown', enteringWord)

// let currentAttempt = NUMBER_ATTEMPTS

function enteringWord(event){
  const rowsBoard = document.querySelectorAll('.game__row');

  if(enteredLetterNumber === 5){
    return
  }
  
  let entered = rowsBoard[0].children[enteredLetterNumber];

  if(event.key.match(/[А-Яа-я]/g)){
    entered.innerHTML = event.key.toUpperCase();
  }else{
    enteredLetterNumber--
  }
    
  enteredLetterNumber++
}

renderingField()