// place to test array stuff for minesweeper


const qtyRows = 9;
const qtyCols = 9;
const qtyMines = 10;


// initialize empty play field
const playField = new Array(qtyRows);

// initial means of initializing empty play field using a FOR loop
for (let y = 0; y < qtyRows; y++) {
    // playField[y] = new Array(qtyCols);
    playField[y] = y * 2; // for testing
}

// using forEach instead
// playField.forEach((row) => {
//     console.log(row);
//     row = 1;
//     console.log(row);
    // console.log(playField[row]);
// });

// testing
console.log(playField);



for (let row of playField) {
    console.log(row);
    row = 1;
    console.log(row);
}

console.log(playField);