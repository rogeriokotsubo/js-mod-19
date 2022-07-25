import { btnInit } from '../index.js';

export function btnInitHover(){
  if (btnInit.disabled){
    btnInit.style.backgroundColor='#787878';
    btnInit.style.color='#ffffff';
    btnInit.style.cursor='default'
  } else {
    btnInit.style.backgroundColor='#78787870';
    btnInit.style.color='#000000';
    btnInit.style.cursor='pointer';
  };
}

