export default function Card(_min, _max, _numbers) {
        
    let cardNumbers = [];
    const min = _min;
    const max = _max;
    const numbers = _numbers;
    try{ 
        checkValues();
    }
    catch(e){
        throw e.message;
    };
    createCard(min, max, numbers);
    sortCard(cardNumbers);

    function createCard(_min,_max,_numbers){
        let num = 0;
        let i = 0;
        const drawn = false;
        while ( i < _numbers ){
            num = Math.floor(Math.random() * (_max - _min + 1)) + _min;
            if (checkNumber(num)<0){              
                cardNumbers.push({num, drawn});
                i++;
            };
        };
    }

    function checkNumber(_num){
        for (let i=0; i<cardNumbers.length; i++){
            if (cardNumbers[i].num===_num){
                return i;
            };
        }
        return -1;
    }

    function sortCard(){
        cardNumbers.sort(function (a,b){
            return a.num-b.num;
        });     
    }

    function getCard(){
        return cardNumbers;
    }

    function getCardNumbers(){
        let num = [];
        for (let i=0; i<cardNumbers.length; i++){
            num.push(cardNumbers[i].num);
        }
        return num;
    }

    function markCardNumber(_num){
        const num = _num;
        const idCard = checkNumber(num);
        if ( idCard >= 0 ) {
            cardNumbers[idCard].drawn = true;
            return true;
        } else {
            return false;
        };    
    }

    function checkCardFull(){
        for (let i=0; i<cardNumbers.length; i++){
            if ( !cardNumbers[i].drawn ){
                return false;                
            }; 
        };
        return true;
    }

    function checkValues() {
        if (isNaN(min) || isNaN(max) || isNaN(numbers)){
            throw new Error('Invalid parameters');
        }
        if ((!Number.isInteger(min)) || (!Number.isInteger(max)) || (!Number.isInteger(numbers))){
            throw new Error('Invalid parameters');
        }
        if (min<0 || max<0 || numbers<0 || min>=max || (max-min+1) < numbers) {
            throw new Error('Invalid parameters');
        }
    }

    function mountCard(){
        let gridHtml = '';
        for (let i = 0; i<cardNumbers.length; i++){
            gridHtml += `
                <div class="card-number" data-clicked="0" data-id="${i}">${cardNumbers[i].num}</div>
            ` 
        }
        return gridHtml;
    }

    function addEventListenerNumber(_iCard){
        let cell = '';
        let iCard = _iCard;
        let keySelector = '';
        for (let i=0; i<cardNumbers.length; i++){
            keySelector = `#ctn-card${iCard+1} [data-id='${i}']`;
            cell = document.querySelector(keySelector);
            cell.addEventListener('click', () => {
                markNumber(iCard, i);
            });
        }
    }
    
    function markNumber(_iCard, _iNumber){
        const keySelector = `#ctn-card${_iCard+1} [data-id='${_iNumber}']`;
        const cell = document.querySelector(keySelector);
        if (cell.dataset.clicked==="0"){
            cell.style.backgroundColor = '#ff000080';
            cell.dataset.clicked="1";
        } else {
            cell.style.backgroundColor = '#ff000000';
            cell.dataset.clicked="0";
        }    
    }

    return { getCard, getCardNumbers, markCardNumber, checkCardFull, mountCard, addEventListenerNumber };
} 


