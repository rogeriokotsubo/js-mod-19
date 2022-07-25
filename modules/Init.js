import Bingo from './Bingo.js';
import { btnInitHover } from './auxFunctions.js';
import { msg, btnInit } from '../index.js'; 
  
export default function Init(_minimo, _maximo, _nInCards, _nCards){  
    const nCards = _nCards;
    const minimo = _minimo;
    const maximo = _maximo;
    const nInCards = _nInCards;
    const newNumber = document.querySelector('#ctn-number');
    const ctnBoard = document.querySelector('#ctn-board');
    let gameBingo = '';
    let dInterval = 0;

    try{ 
        checkValues();
    }
    catch(e){
        throw e.message;
    };

    newNumber.innerHTML='&nbsp;';
    gameBingo = Bingo(minimo, maximo, nInCards, nCards);
    ctnBoard.style.display = 'grid';
    game();

    function game(){
        btnInit.disabled = true;
        btnInitHover();
        newNumber.style.display = 'flex';
        dInterval = setInterval(function(){
            drawNewNumber();
        }, 5000);
    }

    function drawNewNumber(){
        let res = false;
        msg.innerHTML='&nbsp;';
        for (let i=0; i<nCards; i++){
            res = gameBingo.objCards[i].checkCardFull();
            if (res){
                msg.innerHTML += `Cartela ${i+1} comeu barriga! `;
            }
        }

        const num = gameBingo.objBoard.drawNumber();
        if (num===-1){
            msg.textContent = 'Foram sorteados todos os números!';
            clearInterval(dInterval);
            btnInit.disabled = false;
            btnInitHover();            
            return false;
        }
        newNumber.textContent = num;
        const idNumber = gameBingo.objBoard.checkNumber(num);
        const cell = document.querySelectorAll('.board-number');    
        cell[idNumber].style.backgroundColor = '#ff000080';
        for (let i=0; i<nCards; i++){
            res = gameBingo.objCards[i].markCardNumber(num);
        }        
        return true;
    }

    function checkValues() {
        if (isNaN(minimo) || isNaN(maximo) || isNaN(nInCards) || isNaN(nCards)){
            throw new Error('Invalid parameters');
        }
        if ((!Number.isInteger(minimo)) || (!Number.isInteger(maximo)) || (!Number.isInteger(nInCards)) || (!Number.isInteger(nCards))){
            throw new Error('Invalid parameters');
        }
        if (minimo<0 || maximo<0 || nInCards<0 || minimo>=maximo || (maximo-minimo+1) < nInCards || nCards<=0) {
            throw new Error('Invalid parameters');
        }
    }

    return dInterval;
  }

  
