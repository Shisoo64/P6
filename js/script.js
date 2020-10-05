let rows = document.getElementsByClassName("gridRow");
let cells = document.getElementsByClassName("cell");

class Player {
  constructor(x, y, health, weapon) {
    this.x = x;
    this.y = y;
    this.health = 100;
  }

}

class Weapon {
  constructor(x, y, name, damage) {
    this.x = x;
    this.y = y;
  }

}

class Cell {
  constructor(x, y, status) {
    this.x = x;
    this.y = y;
    $('<div class="cell empty" data-x="'+ x +'" data-y="'+ y +'" ></div>').appendTo(rows[x]);
  }

  checkSurround(second, perimeter) {
    console.log(this.x,this.y);
    console.log(second.data("x"),second.data("y"));
    return(((second.data("x") <= this.x + perimeter) && (second.data("x") >= this.x - perimeter)) &&
      ((second.data("y") <= this.y + perimeter) && (second.data("y") >= this.y - perimeter)));
  };

}

class Grid {
  constructor(hauteur, largeur, map) {
    this.map = new Array(hauteur).fill(new Array(largeur));
    // For pour création des Rows
    for (var x = 0; x < hauteur; x++) {
      $('<div class="gridRow" data-row="'+ x +'" ></div>').appendTo('#container');
      // For pour ajout des cases a la Row
      for (var y = 0; y < largeur; y++) {
        this.map[x][y] = new Cell(x,y,"empty");
      };
    };
  }

  randomCell(status){
    let randomX = Math.floor(Math.random() * this.map.length);
    let randomY = Math.floor(Math.random() * this.map[randomX].length);
    console.log(randomX, randomY);
    return(randomX, randomY);
  }

}



playGrid = new Grid(10,10);
addRandom(10, "rock");
addRandom(4, "weapon");
addRandom(2, "spawnPoint");
playGrid.randomCell();



// Check si les spawn sont a côté
while(checkSurround($('.cell.spawnPoint:first'), $('.cell.spawnPoint:last'), 2)){
  $('.cell.spawnPoint').addClass('empty').removeClass('spawnPoint');
  console.log("Spawnpoint too close");
  addRandom(2, "spawnPoint");
}



function checkSurround(first, second, perimeter) {

  console.log(first.data("x"),first.data("y"));
  console.log(second.data("x"),second.data("y"));

  return(((second.data("x") <= first.data("x") + perimeter) &&
   (second.data("x") >= first.data("x") - perimeter)) &&
    ((second.data("y") <= first.data("y") + perimeter) &&
     (second.data("y") >= first.data("y") - perimeter)))
};


function addRandom(num, className) {
  for (let i = 0; i < num; i++) {
    let item = $('.cell.empty')[Math.floor(Math.random() * $('.cell.empty').length)];
    console.log(item);
    item.classList.add(className);
    item.classList.remove("empty");
  }
}