class Player {
  constructor(name, code, weapon) {
    this.name = name;
    this.code = code;
    this.cell = null;
    this.weapon = weapon;
    this.health = 100;
  }

  move(){
    let availableCells = playGrid.cells.filter(availableCell => (availableCell.x === this.cell.x + 1 || availableCell.x == this.cell.x + 2 || availableCell.x == this.cell.x - 1 || availableCell.x == this.cell.x - 2)
     && (availableCell.y === this.cell.y + 1 || availableCell.y == this.cell.y + 2 || availableCell.y == this.cell.y - 1 || availableCell.y == this.cell.y - 2));

    availableCells.forEach(cell => cell.move = true);


    availableCells.forEach(clickedCell => clickedCell.element.click(function() {
      clickedCell.player = this;
      playGrid.cells.forEach(cell => cell.render());
          console.log(this.cell);
    }));
    console.log(this.cell);
  }

}

class Weapon {
  constructor(name, code, damage) {
    this.name = name;
    this.code = code;
    this.damage = damage;
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.player = null;
    this.weapon = null;
    this.available = true;
    this.move = false;
    this.element = $('<div></div>');
  }
  
  render() {
    this.element.removeClass().addClass("cell");
    if(!this.available) {
      this.element.addClass("rock" + Math.floor(Math.random() * 3));
    }else if(this.move) {
      this.element.addClass("movement");
    }else if(this.weapon !== null) {
      this.element.addClass("weapon").addClass("weapon-" + this.weapon.code);
    }else if(this.player !== null) {
      this.element.addClass("player").addClass("player-" + this.player.code);
    }else{
      this.element.addClass("empty");
    }
  }

}

class Grid {
  constructor(height, width, numberOfRocks, players, weapons) {
    this.cells = [];
    this.players = players;
    this.weapons = weapons;
    this.numberOfRocks = numberOfRocks;    
    this.currentPlayer = null;
    for (var x = 0; x < height; x++) {
      for (var y = 0; y < width; y++) {
        this.cells.push(new Cell(x,y));
        this.cells[this.cells.length - 1].element.appendTo("#container");
      }
    }

    for (var i = 0; i < this.numberOfRocks; i++) {
      let randomCell = this.randomCell();
      randomCell.available = false;
    }
    this.weapons.forEach(weapon => {
      let randomCell = this.randomCell();
      randomCell.weapon = weapon;
    });
    this.players.forEach(player => {
      let randomCell = this.randomCell();
      randomCell.player = player;
      player.cell = randomCell;
    });
    this.cells.forEach(cell => cell.render());
  }

  randomCell(){
    let availableCells = this.cells.filter(cell => cell.available && cell.player === null && cell.weapon === null);
    let random = Math.floor(Math.random() * availableCells.length);
    return(availableCells[random]);
  }
}


//Grid generation
let playGrid = new Grid(10, 10,
  10,
  [
    new Player("Ninja", 'ninja', new Weapon("Dague", "dague", 10)),
    new Player("Samourai", 'samourai', new Weapon("Dague", "dague", 10))
  ],
  [
    new Weapon("Epée", "sword", 15),
    new Weapon("Epée", "sword", 15),
    new Weapon("Hache", "axe", 20),
    new Weapon("Lance", "spear", 30)
  ]
);



playGrid.players[0].move();