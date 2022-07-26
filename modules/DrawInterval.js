import { newGame } from '../index.js';

export default function DrawInterval() {
    let idInterval = 0;

    function drawSetInterval(_interval){
        idInterval = setInterval(function(){
            newGame.drawNewNumber();
        }, _interval);
    }

    function drawClearInterval(){
        clearInterval(idInterval);
    }

    return { drawSetInterval, drawClearInterval }
}