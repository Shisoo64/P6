let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");


initGrid(10, 10);
addRandom(10, "rock");
addRandom(4, "weapon");
addRandom(2, "spawnPoint");

while(checkSurround($('.cell.spawnPoint:first'), $('.cell.spawnPoint:last'), 1)){
  $('.cell.spawnPoint').addClass('empty').removeClass('spawnPoint');
  console.log("Spawnpoint too close");
  addRandom(2, "spawnPoint");
}




function initGrid(x, y) {
  makeRows(x);
  makeColumns(y);
}

function makeRows(rowNum) {
  for (r = 0; r < rowNum; r++) {
    $('<div class="gridRow" data-row="'+ r +'" ></div>').appendTo('#container');
  };
};


function makeColumns(cellNum) {
  for (i = 0; i < rows.length; i++) {
    for (j = 0; j < cellNum; j++) {
      $('<div class="cell empty" data-x="'+ j +'" data-y="'+ i +'" ></div>').appendTo(rows[j]);
    };
  };
};


function checkSurround(first, second, perimeter) {

  console.log(first.data("x"),first.data("y"));
  console.log(second.data("x"),second.data("y"));

  if(((second.data("x") <= first.data("x") + perimeter) && (second.data("x") >= first.data("x") - perimeter)) && ((second.data("y") <= first.data("y") + perimeter) && (second.data("y") >= first.data("y") - perimeter))){
    return true;
  }
};


function addRandom(num, className) {
  for (let i = 0; i < num; i++) {
    let item = $('.cell.empty')[Math.floor(Math.random() * $('.cell.empty').length)];
    console.log(item);
    item.classList.add(className);
    item.classList.remove("empty");
  }
}