import Init from './modules/Init.js';

const msg = document.querySelector('#p-msg');
const btnInit = document.querySelector('#btn-play');
btnInit.addEventListener('click', initGame);

const nCards = 4;
const minimo = 1;
const maximo = 75;
const nInCards = 10;
let newGame = '';

function initGame(){
    try{
        newGame = new Init(minimo, maximo, nInCards, nCards);
    }
    catch(e){
        msg.innerText = e;
    }    
}

export { msg, btnInit, newGame };