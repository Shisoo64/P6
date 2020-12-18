class Player {
  constructor(name, code, weapon) {
    this.name = name;
    this.code = code;
    this.cell = null;
    this.weapon = weapon;
    this.health = 100;
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
  constructor(x, y, grid) {
    this.x = x;
    this.y = y;
    this.player = null;
    this.weapon = null;
    this.available = true;
    this.move = false;
    this.element = $('<div></div>');
    this.grid = grid;
  }
  
  render() {
    this.element.removeClass().addClass("cell");
    if(!this.available) {
      this.element.addClass("rock" + Math.floor(Math.random() * 3));
    }
    if(this.move == true) {
      this.element.addClass("movement");
    }
    if(this.weapon !== null) {
      this.element.addClass("weapon").addClass("weapon-" + this.weapon.code);
    }
    if(this.player !== null) {
      this.element.addClass("player").addClass("player-" + this.player.code);
    }
    if(this.available && !this.move && this.weapon == null && this.player == null){
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
    this.currentPlayer = this.players[0];
    for (var x = 0; x < height; x++) {
      for (var y = 0; y < width; y++) {
        this.cells.push(new Cell(x,y,this));
        this.cells[this.cells.length - 1].element.appendTo("#container");
      }
    }

    //Ajout random des pierres
    for (var i = 0; i < this.numberOfRocks; i++) {
      let randomCell = this.randomCell();
      randomCell.available = false;
    }
    //Ajout random des armes
    this.weapons.forEach(weapon => {
      let randomCell = this.randomCell();
      randomCell.weapon = weapon;
    });
    //Ajout random des spawn
    this.players.forEach(player => {
      let randomCell = this.randomCell();
      randomCell.player = player;
      player.cell = randomCell;
    });
    this.cells.forEach(cell => cell.render());
  }

  //Selectionne une cellule random
  randomCell(){
    let availableCells = this.cells.filter(cell => cell.available && cell.player === null && cell.weapon === null);
    let random = Math.floor(Math.random() * availableCells.length);
    return availableCells[random];
  }

  //Return une cell grace au xy en parametre
  getCell(x,y){
    return  this.cells.find(cell => cell.x === x && cell.y === y);
  }


  //Affiche la croix de deplacements
  move(){
    //Up
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x, this.currentPlayer.cell.y + i);
      if(cell == null || cell.available == false){ 
        break; 
      }
      cell.move = true;
      cell.render();
    }
    //Down
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x, this.currentPlayer.cell.y - i);
      if(cell == null || cell.available == false){ 
        break; 
      }
      cell.move = true;
      cell.render();
    }
    //Left
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x - i, this.currentPlayer.cell.y);
      if(cell == null || cell.available == false){ 
        break; 
      }
      cell.move = true;
      cell.render();
    }
    //Right
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x + i, this.currentPlayer.cell.y);
      if(cell == null || cell.available == false){ 
        break; 
      }
      cell.move = true;
      cell.render();
    }


    let availableCells = this.cells.filter(cell => cell.move);

    availableCells.forEach(cell => cell.element.click(() => {
      this.currentPlayer.cell.player = null;
      this.currentPlayer.cell.render();
      this.currentPlayer.cell = cell;
      cell.player = this.currentPlayer;
      if(cell.weapon != null){
        this.currentPlayer.weapon = cell.weapon;
        cell.weapon = null;
        console.log("Vous avez ramassé : ");
        console.log(this.currentPlayer.weapon);
      }
      availableCells.forEach(cell => {
        cell.move = false;
        cell.render();
      });

    }));



  }

}


//Grid generation
let playGrid = new Grid(10,10,
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



playGrid.move();