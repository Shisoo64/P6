let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");


initGrid(10, 10);
addRandom(8, "rock");
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
  for (i = 0; i < num; i++) {
    let item = $('.cell')[Math.floor(Math.random() * $('.cell').length)];
    console.log(item);
    if(item.className == "empty"){
      item.classList.add(className);
      item.classList.remove("empty");
    }else{
      i--;
    }
  }
}