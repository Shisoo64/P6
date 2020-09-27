let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");


initGrid(10, 10);
addRandom(10, "rock");
addRandom(4, "weapon");
addRandom(2, "spawnPoint");


function initGrid(x, y) {
  makeRows(x);
  makeColumns(y);
}

function makeRows(rowNum) {
  for (r = 0; r < rowNum; r++) {
    $('<div class="gridRow"></div>').appendTo('#container');
  };
};

function makeColumns(cellNum) {
  for (i = 0; i < rows.length; i++) {
    for (j = 0; j < cellNum; j++) {
      $('<div class="cell empty"></div>').appendTo(rows[j]);
    };
  };
};



function addRandom(num, className) {
  for (let i = 0; i < num; i++) {
    let item = $('.cell.empty')[Math.floor(Math.random() * $('.cell.empty').length)];
    console.log(item);
    item.classList.add(className);
    item.classList.remove("empty");
  }
}