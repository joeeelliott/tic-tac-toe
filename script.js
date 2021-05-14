const squaresArray = Array.from(document.querySelector('main').children);
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-content-container');
const playAgainBtn = document.querySelector('.play-again');

let characters = ['X', 'O'];
let randomCharacter = characters[Math.floor(Math.random() * 2)];
let otherCharacter = randomCharacter === 'X' ? 'O' : 'X';
let turn = -1; // checks whether its O or X turn 
let clickedSquares = []; //we will push clicked squares into here to keep count on what we have and haven't clicked on

//create an object with nested objects forEach div on the board. Each nested object holds three properties
let squares = {};
let i = 0;
squaresArray.forEach(square => {
  squares[i] = {}
  squares[i].div = square;
  squares[i].isClicked = false;
  squares[i].character;
  i += 1;
});

// loop through the squares object's nested objects (prop)
for(let prop in squares){
  let currentSquare = squares[prop].div;

  currentSquare.addEventListener('mouseover', () => {
    // if fontweight is NOT equal to 400 (not yet been clicked), hover faded character
    if(currentSquare.style.fontWeight !== "400"){
      if(turn % 2 === 0){
        // refactored code into the xOrO function
        // currentSquare.innerText = randomCharacter;
        // currentSquare.style.fontWeight = "200";
        // currentSquare.style.color = "rgb(0, 0, 0, 0.6)";
        xOrO(currentSquare, randomCharacter, '200', 'rgb(0, 0, 0, 0.6)');
      } else {
        // currentSquare.innerHTML = otherCharacter;
        // currentSquare.style.fontWeight = "200";
        // currentSquare.style.color = "rgb(0, 0, 0, 0.6)";
        xOrO(currentSquare, otherCharacter, '200', 'rgb(0, 0, 0, 0.6)');
      }
    }
  });

  currentSquare.addEventListener('mouseout', () => {
    // if character fontweight is NOT 400 (not yet been clicked), clear square
    if(currentSquare.style.fontWeight !== '400'){
      // currentSquare.innerText = '';
      // currentSquare.style.fontWeight = '';
      // currentSquare.style.color = '';
      xOrO(currentSquare, '', '', '');
    }
  });

  currentSquare.addEventListener('click', () => { 
    if(!squares[prop].isClicked){ // if we click on a square that is not yet clicked (isClicked property is false)
      squares[prop].isClicked = true; // change to true
      turn += 1;   // add 1 to turn 
      if(turn % 2 === 0){   // alternates turns
        // currentSquare.innerHTML = otherCharacter;
        // currentSquare.style.fontWeight = "400";
        // currentSquare.style.color = "rgb(0, 0, 0)";
        xOrO(currentSquare, otherCharacter, '400', 'rgb(0, 0, 0)');
        squares[prop].character = otherCharacter;
      } else {   
        // currentSquare.innerHTML = randomCharacter;
        // currentSquare.style.fontWeight = "400";
        // currentSquare.style.color = "rgb(0, 0, 0)";
        xOrO(currentSquare, randomCharacter, '400', 'rgb(0, 0, 0)');
        squares[prop].character = randomCharacter;
      }
    }  

    if(isWinner()){
      winner(squares[prop].character);
    }

    if(isDraw(squares[prop].div, squares[prop].isClicked)){
      draw();
    }
  });
}

function xOrO(changesTo, character, fontWeight, color){
  changesTo.innerHTML = character;
  changesTo.style.fontWeight = fontWeight;
  changesTo.style.color = color;
}

// calculates winner based on whether the .character of winning sequences of squares are the same. returns true(win) or false(no win)
function isWinner(){
  return (
    squares[0].isClicked && squares[1].isClicked && squares[2].isClicked && 
    squares[0].character === squares[1].character && squares[1].character === squares[2].character || 

    squares[3].isClicked && squares[4].isClicked && squares[5].isClicked && 
    squares[3].character === squares[4].character && squares[4].character === squares[5].character || 

    squares[6].isClicked && squares[7].isClicked && squares[8].isClicked && 
    squares[6].character === squares[7].character && squares[7].character === squares[8].character || 

    squares[0].isClicked && squares[3].isClicked && squares[6].isClicked && 
    squares[0].character === squares[3].character && squares[3].character === squares[6].character || 

    squares[1].isClicked && squares[4].isClicked && squares[7].isClicked && 
    squares[1].character === squares[4].character && squares[4].character === squares[7].character || 

    squares[2].isClicked && squares[5].isClicked && squares[8].isClicked && 
    squares[2].character === squares[5].character && squares[5].character === squares[8].character || 

    squares[0].isClicked && squares[4].isClicked && squares[8].isClicked && 
    squares[0].character === squares[4].character && squares[4].character === squares[8].character || 

    squares[2].isClicked && squares[4].isClicked && squares[6].isClicked && 
    squares[2].character === squares[4].character && squares[4].character === squares[6].character
  );

};


// calculates draw. returns true if draw. we also prevent multiple clicks of the same square affecting the calculation
function isDraw(square, isClicked){ // takes the current square and the isClicked property of that square
    if(isClicked){  // if isClicked is true (button clicked)
      clickedSquares.push(square.classList[0]);  // push the squares unique class in an array


      // filter thru the array for any items that match the current squares unique class. there will always be one item in the filteredArr as the current square's class we just clicked on will be in there....
      let filteredArr = clickedSquares.filter(item => {
        return item === square.classList[0]; 
      });

      //....but if there's two of the same in there, we've already clicked that square, so remove the square we just clicked from the clickedSquares array
      if(filteredArr.length > 1){
        clickedSquares.pop();
        filteredArr.pop();
      }      
    }

    // if the length === 9 it means we've clicked all the squares, if we've done that and there's no winner, its a draw, so return true
    if(clickedSquares.length === 9 && !isWinner()){
    return true;
  }
}

function winner(e){   // e = .character for last div clicked
  modal.classList.remove('hide');
  modalContainer.children[0].innerHTML = `${e}'s Win!`;
}

function draw(){
  modal.classList.remove('hide');
  modalContainer.children[0].innerHTML = `Draw!`;
}

function playAgain(){
  modal.classList.add('hide');
  for(let prop in squares){   // loop thru and reset all 
    squares[prop].isClicked = false; 
    squares[prop].character = ''; 
    clickedSquares = [];
    squares[prop].div.innerText = ''; 
    squares[prop].div.style.fontWeight = ""; 
  }
}

playAgainBtn.addEventListener('click', playAgain); 