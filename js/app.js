/*-----------------------------------------------------------------------*/
/*---------------------------- introduction -----------------------------*/
// javascript minesweeper
// Dallas Van Wyk
// GA SEB-PT 1021 2024




/*-------------------- to-do / new feature priority ---------------------*/

// 1 - combo click left-right
// 2 - implement timer






/*-------------------- set constants/game settings ----------------------*/

// future, these should be a user input you can change in settings menu or by selecting difficulty level
const qtyRows = 9;
const qtyCols = 9;
const qtyMines = 10;
// const playField = [];


/*--------------------- initialize game variables -----------------------*/

// initialize some variables for game characteristics
let timer;
let qtyFlags;
let smiley;
let qtyRevealed;
let gameState;
let startTime;
let intervalID;




/*-------------------- cached element references  -----------------------*/

// help button
const helpButtonEl = document.querySelector("#help");

// help topic paragraph
const helpTopicEl = document.querySelector("#help-topic");

// Message
const displayMessageEl = document.querySelector("#message");

// flag count
const flagCountEl = document.querySelector("#flagcount");

// smiley (also doubles as the reset button ... and options menu?)
const smileyEl = document.querySelector("#smiley");

// timer
const timerEl = document.querySelector("#timer");

// play field
const playFieldEl = document.querySelector("#playfield");

// creates HTML rows and cells within the playfield
for (let y = 0; y < qtyRows; y++) {
    const rowEl = document.createElement('div');
    rowEl.setAttribute('class', 'row');
    playFieldEl.append(rowEl);
    for (let x = 0; x < qtyCols; x++) {
        const cellEl = document.createElement('div');
        cellEl.setAttribute('class', 'cell');
        cellEl.setAttribute('data-row', y);
        cellEl.setAttribute('data-col', x);
        cellEl.setAttribute('id', `y${y}x${x}`);
        rowEl.append(cellEl);
    }
}

// single element with all cells
const cellsEl = document.querySelectorAll((".cell"));



/*------------------------------ functions ------------------------------*/


/*-------------------------- timer functions ----------------------------*/

const incrementTime = () => {
    timer = (Date.now() - startTime) / 1000;
    timerEl.innerText = (Math.round(timer * 10) / 10).toFixed(1);
};

const startTimer = () => {
    startTime = Date.now();
    intervalID = setInterval(incrementTime, 10);
};

const stopTimer = () => {
    clearInterval(intervalID);
};



/*-------------------- initialize empty play field ----------------------*/

// initial means of initializing empty play field using a FOR loop
// could be updated to forEach
const playField = new Array(qtyRows);
for (let y = 0; y < qtyRows; y++) {
    playField[y] = new Array(qtyCols);
}

// playField.forEach((row) => {
//     row = new Array(qtyCols);
// });




/*-------------------------- general functions --------------------------*/

// random integer generator
// thank you to MDN for this function; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    // The maximum is exclusive and the minimum is inclusive
}


// function to iterate through all spaces on play field
const iterateField = (whatToDo) => {
    for (let y = 0; y < qtyRows; y++) {
        for (let x = 0; x < qtyCols; x++) {
            whatToDo(y, x);
        }
    }
}
// would like to reuse this elsewhere but need more practice/polish/understanding
// function to iterate through field using forEach instead of a basic for loop







/*------------------ reset play field -----------------------------------*/

// reset a single space
const resetSpace = (y, x) => {
    playField[y][x] = {
        revealed: false,
        flag: false,
        question: false,
        mine: false,
        adjacent: 0,
        immunity: false,
        exploded: false
    }
    let currentSpaceEl = document.getElementById(`y${y}x${x}`)
    currentSpaceEl.innerText = ""
    currentSpaceEl.classList.remove('revealed')
}

// reset all spaces on play field
const resetField = () => {
    iterateField(resetSpace);
}

// for future HTML reset functionality for when play field size is variable
// playFieldEl.removeChild
// cellsEl.remove







/*---------------------- mine functions ---------------------------------*/

// place single random mine
// note: does NOT guarantee a new mine will be placed; if the space is immune or already has a mine it just "gives up" rather than trying again
const placeRandomMine = () => {
    let y = getRandomInt(0, qtyRows);
    let x = getRandomInt(0, qtyCols);
    if (!playField[y][x].immunity) playField[y][x].mine = true;
}

// counting mines on the field
const countAllMines = () => {
    let mineCount = 0;
    for (let y = 0; y < qtyRows; y++) {
        for (let x = 0; x < qtyCols; x++) {
            if (playField[y][x].mine) mineCount++;
        }
    }
    return mineCount;
}

// place random mines up to the specified qtyMines
const placeMines = () => {
    let mineCount = 0;
    while (mineCount < qtyMines) {
        placeRandomMine();
        mineCount = countAllMines();
    }
}




/*-------------- counting adjacent mines (setting numbers) --------------*/

// function to count adjacent mines of a single space
const countAdjMines = (y, x) => {
    let mineCounter = 0;
    // iterates columns before and after y
    for (let yp = y - 1; yp <= y + 1; yp++) {
        // iterates rows before and after x
        for (let xp = x - 1; xp <= x + 1; xp++) {
            // exclude rows and columns off the edge of the play field
            // does not exclude original center space - if the cell is a mine, its number doesn't matter anyway
            if (xp >= 0 && xp < qtyCols && yp >= 0 && yp < qtyCols) {
                // increment mineCounter if the space is a mine
                if (playField[yp][xp].mine) mineCounter++;
            }
        }
    }
    playField[y][x].adjacent = mineCounter;
}

// function to perform adjacent mine count on entire field
const calcFieldNums = () => {
    for (let y = 0; y < qtyRows; y++) {
        for (let x = 0; x < qtyCols; x++) {
            countAdjMines(y, x);
        }
    }
}




/*-------------------- setting first click immunity ---------------------*/

// don't put mines adjacent to first click
const setImmunity = (y, x) => {
    // iterate columns before and after y
    for (let yp = y - 1; yp <= y + 1; yp++) {
        // iterate rows before and after x
        for (let xp = x - 1; xp <= x + 1; xp++) {
            // excludes rows and columns off the edge of the play field
            if (xp >= 0 && xp < qtyCols && yp >= 0 && yp < qtyRows) {
                playField[yp][xp].immunity = true;
            }
        }
    }
}






/*------------------------ first click function ----------------------*/

// set immunity, place mines, calc space #s
const firstClick = (y, x) => {
    setImmunity(y, x);
    placeMines();
    calcFieldNums();
    startTimer();
    gameState = 1;
}







/*------------------------ click functions ------------------------------*/

// left click on a space
const leftClick = (y, x) => {
    // if game is over, no click action
    if (gameState != 2) {

        // if it's the first click of the game
        if (qtyRevealed === 0) {
            firstClick(y, x);
        }

        let currentSpace = playField[y][x];
        let currentSpaceEl = document.getElementById(`y${y}x${x}`)
        if (currentSpace.revealed || currentSpace.flag || currentSpace.question) {
            // if space is revealed, or is hidden with a flag or qmark, no action
        } else if (currentSpace.mine) {
            // if click on a hidden mine
            gameLost(y, x);
        } else {
            // if it's a number space
            playField[y][x].revealed = true;
            currentSpaceEl.classList.add('revealed');
            currentSpaceEl.innerText = currentSpace.adjacent;
            qtyRevealed++;

            if (currentSpace.adjacent === 0) {
                // if no adjacent mines
                currentSpaceEl.innerText = ""; // overwrites the zeros
                // iterate through adjacent spaces
                clickAllAdjacent(y, x);
            }
        }

        // if all non-mine spaces have been revealed
        if (qtyRevealed === (qtyCols * qtyRows) - qtyMines) {
            gameWon();
        }
    }
}

// iterate through adjacent spaces
// this is for a double click, or for left click on an empty space
const clickAllAdjacent = (y, x) => {
    for (let yp = y - 1; yp <= y + 1; yp++) {
        for (let xp = x - 1; xp <= x + 1; xp++) {
            // excludes rows and columns off the edge of the play field
            if (xp >= 0 && xp < qtyCols && yp >= 0 && yp < qtyRows) {
                leftClick(yp, xp);
            };
        };
    };
};

const doubleClick = (y, x) => {
    if (!playField[y][x].flag && !playField[y][x].question) {
        let adjFlags = 0;
        for (let yp = y - 1; yp <= y + 1; yp++) {
            for (let xp = x - 1; xp <= x + 1; xp++) {
                if (xp >= 0 && xp < qtyCols && yp >= 0 && yp < qtyCols) {
                    if (playField[yp][xp].flag || playField[yp][xp].question) adjFlags++;
                }
            }
        }
        if (adjFlags >= playField[y][x].adjacent) {
            clickAllAdjacent(y, x);
        };
    }
};

// right click which toggles flags and question marks
const rightClick = (y, x) => {
    if (!playField[y][x].revealed) {
        let currentSpaceEl = document.getElementById(`y${y}x${x}`)
        if (playField[y][x].flag) {
            playField[y][x].flag = false;
            playField[y][x].question = true;
            currentSpaceEl.innerText = "?";
            qtyFlags--;
        } else if (playField[y][x].question) {
            playField[y][x].question = false;
            currentSpaceEl.innerText = "";
        } else {
            playField[y][x].flag = true;
            currentSpaceEl.innerText = '🚩';
            qtyFlags++;
        }
        flagCountEl.innerText = qtyMines - qtyFlags;
    }
}



/*------------------ game functions: new, win, loss ---------------------*/

// new game setup, resetting game characteristics and the play field
const newGame = () => {
    timer = 0;
    qtyFlags = 0;
    timerEl.innerText = timer;
    smiley = 0;
    qtyRevealed = 0;
    smileyEl.innerText = '🙂';
    resetField();
    gameState = 0;
    flagCountEl.innerText = qtyMines - qtyFlags;
    displayMessageEl.innerText = 'Click the spaces to clear the field';
    stopTimer();
}

const gameWon = () => {
    smileyEl.innerText = '😎';
    stopTimer();
    gameState = 2;
    displayMessageEl.innerText = 'Game won!';
}

const gameLost = (y, x) => {
    // bombs explode
    for (let y = 0; y < qtyRows; y++) {
        for (let x = 0; x < qtyCols; x++) {
            if (playField[y][x].mine) {
                let currentSpaceEl = document.getElementById(`y${y}x${x}`)
                currentSpaceEl.innerText = '💣';
            }
        }
    }

    smileyEl.innerText = '🙁';
    stopTimer();
    gameState = 2;
    displayMessageEl.innerText = 'Game lost.';
}



/*------------------------- event listeners -----------------------------*/

smileyEl.addEventListener('click', (event) => {
    newGame();
})


// event listener for cells
// Is there another way that doens't use the forEach method?
cellsEl.forEach((cell) => {

    // left click
    cell.addEventListener('click', (event) => {
        leftClick(+event.target.getAttribute('data-row'), +event.target.getAttribute('data-col'));
    });

    // double click
    cell.addEventListener('dblclick', (event) => {
        doubleClick(+event.target.getAttribute('data-row'), +event.target.getAttribute('data-col'));
    });

    // right click
    cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        rightClick(+event.target.getAttribute('data-row'), +event.target.getAttribute('data-col'));
        return false;
    });

});


helpButtonEl.addEventListener('click', (event) => {
    if (helpTopicEl.style.display === 'none') {
        helpTopicEl.style.display = 'block';
    } else {
        helpTopicEl.style.display = 'none';
    };
});



/*---------------------- actions on page load ---------------------------*/

newGame();







/*----------------------- code graveyard --------------------------------*/


// not currently in use
// const smileys = [
//     'smile',
//     'sunglasses',
//     'wow',
//     'explode',
//     'sad'
// ]

// not currently in use
// const gameStates = [
//     '0 - reset',
//     '1 - in play',
//     '2 - complete'
// ]





// abandoned in favor of using data-row and data-col custom attributes
// playFieldEl.forEach((row) => {
//     row.forEach((cell) => {
//         cell.addEventListener('click', (event) => {
//         }
//     })
// })

// T E M P O R A R Y
// for testing, show all adjacent mine counts
// let currentSpaceEl = document.getElementById(`y${y}x${x}`);
// if (playField[y][x].mine) {
//     currentSpaceEl.innerText = 'M'
// } else {
//     currentSpaceEl.innerText = mineCounter;
// }


// NOT CURRENLTY USED???
// flag counter function for the whole field
// later this could be cleaned up with a combined iterateField and flagCountSpace
// const flagCounterField = () => {
//     let flagCount = 0;
//     for (let y = 0; y < qtyRows; y++) {
//         for (let x = 0; x < qtyCols; x++) {
//             if (playField[y][x].flag) flagCount += 1;
//         }
//     }
//     qtyFlags = flagCount;
//     flagCountEl.innerText = qtyMines - qtyFlags;
// }



// display array
// CURRENTLY UNUSED
// const displayArray = () => {
//     let displayField = new Array(qtyRows);
//     for (let y = 0; y < qtyRows; y++) {
//         displayField[y] = new Array(qtyCols);
//     }
//     for (let y = 0; y < qtyRows; y++) {
//         for (let x = 0; x < qtyCols; x++) {
//             displayField[y][x] = spaceDisplay(y, x);
//         }
//     }
//     console.log(displayField);
//     return (displayField);
// }



//finish this later
// const getRandomSpace = () => {
// }



// logic tree for what to display on each space, WHILE the game is pre-play or in play (not a lost game)
// const spaceDisplay = (y, x) => {
//     let currentSpace = playField[y][x];
//     let display = "";
//     if (currentSpace.revealed) {
//         if (currentSpace.adjacent === 0) {
//             display = "";
//         } else {
//             display = currentSpace.adjacent.toString();
//         }
//     } else {
//         if (currentSpace.flag) {
//             display = "🚩";
//         } else if (currentSpace.question) {
//             display = "?";
//         } else {
//             display = "";
//         }
//     }
//     return display;
// }



/*-----------------------------------------------------------------------*/