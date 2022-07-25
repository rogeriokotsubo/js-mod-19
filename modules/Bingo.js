import Card from './Card.js';
import Raffler from './Raffler.js';
import { msg, btnInit, drawInterval } from '../index.js';
import { btnInitHover } from './auxFunctions.js';

export default function Bingo(_min, _max, _numbers, _nCards) {
        
    const min = _min;
    const max = _max;
    const numbers = _numbers;
    const nCards = _nCards;
    let objCards = [];
    let objBoard = [];

    try{ 
        checkValues();
    }
    catch(e){
        throw e.message;
    };

    objBoard=Raffler(min, max);
    initCards();
    drawCards();

    function initCards(){
        let card = '';
        for (let i=0; i<nCards; i++){
            card = Card(min, max, numbers) ;
            objCards.push(card);
        }
    }

    function drawCards(){
        const divBoard = document.querySelector('#ctn-board')
        const boardHtml = objBoard.mountBoard();
        divBoard.innerHTML = boardHtml;
        
        const ctnCard = document.querySelector('#ctn-card');
        let htmlCards = '';
        for (let i=0; i<nCards; i++){
            htmlCards += `   <div id="card${i+1}" class="card">
                                <div class="card-name">Cartela ${i+1}</div>
                                <div id="ctn-card${i+1}" class="ctn-numbers"></div> 
                                <button id="btn-bingo${i+1}" class="btn-card">Bingo!</button>                   
                            </div>
                        `
        }
        ctnCard.innerHTML = htmlCards;
        
        const ctnCards = document.querySelectorAll('#ctn-card .ctn-numbers');
        const btnCards = document.querySelectorAll('.btn-card');

        htmlCards = '';
        for (let i=0; i<nCards; i++){
            btnCards[i].addEventListener('click',() => {
                callBingo(i);
            } );
            ctnCards[i].innerHTML =  objCards[i].mountCard();
            objCards[i].addEventListenerNumber(i);
        }       
    }

    function callBingo(_iCard){
        const winner = objCards[_iCard].checkCardFull();
        if (winner){
            clearInterval(drawInterval);
            btnInit.disabled = false;
            btnInitHover(); 
            msg.innerHTML = `Cartela ${_iCard+1} é vencedora!`;
            console.log(objCards[_iCard].getCard());
        }else{
            msg.innerHTML = `Cartela ${_iCard+1}: Alarme falso!`;
            console.log(objCards[_iCard].getCard());
        };
    }

    function checkValues() {
        if (isNaN(min) || isNaN(max) || isNaN(numbers) || isNaN(nCards)){
            throw new Error('Invalid parameters');
        }
        if ((!Number.isInteger(min)) || (!Number.isInteger(max)) || (!Number.isInteger(numbers)) || (!Number.isInteger(nCards))){
            throw new Error('Invalid parameters');
        }
        if (min<0 || max<0 || numbers<0 || min>=max || (max-min+1) < numbers || nCards<=0) {
            throw new Error('Invalid parameters');
        }
    }

    return { objBoard, objCards };
} 


