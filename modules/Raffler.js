export default function Raffler(_min, _max) {

    let board = [];
    let drawOrder = [];
    const min = _min;
    const max = _max;
    let lastId = -1;

    try{ 
        checkValues();
    }
    catch(e){
        throw e.message;
    };
    createBoard(min, max);

    function createBoard(min, max){
        const drawn = false;
        let order = 0;
        for (let num=min; num<=max; num++){
            order = Math.random();
            board.push({num, drawn});
            drawOrder.push({num, order});
        };
        sortDrawOrder();
        return board;
    }

    function drawNumber(){
        let isNotDrawn = true;
        let num = -1;
        let idNumber = -1;

        if (lastId >= max-1){
            return -1;
        }

        lastId++;
        num = drawOrder[lastId].num;
        idNumber = checkNumber(num);           
        if (!board[idNumber].drawn === true){;
            isNotDrawn = false;
            return board[idNumber].num;
        };
    }

    function isDrawn(_num){
        const num = _num;
        const idBoard = checkNumber(num);           
        if (board[idBoard].drawn){
            return true;
        }else{ 
            return false;
        };    
    }

    function checkBoardIsFull(){
        for (let i=0; i<board.length; i++){
            if (!board[i].drawn){
                return false;
            }
        }
        return true;
    }
    
    function checkNumber(_num){
        for (let i=0; i<board.length; i++){
            if (board[i].num===_num){
                return i;
            };
        }
        return -1;
    }

    function sortDrawOrder(){
        drawOrder.sort(function (a,b){
            return a.order-b.order;
        });     
    }

    function getBoard(){
        return board;
    }

    function mountBoard(){
        let gridHtml = ''
        for (let i = 0; i<board.length; i++){
            gridHtml += `<div class="board-number" data-id="${i}">${board[i].num}</div>` 
        }
        return gridHtml;
    }

    function checkValues() {
        if (isNaN(min) || isNaN(max)){
            throw new Error('Invalid parameters');
        }
        if ((!Number.isInteger(min)) || (!Number.isInteger(max))){
            throw new Error('Invalid parameters');
        }
        if (min<0 || max<0 || min>=max ) {
            throw new Error('Invalid parameters');
        }
    }

   return { getBoard, drawNumber, isDrawn, checkBoardIsFull, mountBoard, checkNumber };
} 


