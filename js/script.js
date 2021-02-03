class Player {
  constructor(name, code, weapon) {
    this.name = name;
    this.code = code;
    this.cell = null;
    this.weapon = weapon;
    this.health = 100;
    this.defend = false;
  }


  //Actualise l'interface
  renderPlayerInfo(number) {
    $("#playerHealth" + number).text(this.health);
    $("#playerName" + number).text(this.name);
    $("#playerWeapon" + number).text(this.weapon.name + " : " + this.weapon.damage);
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
    this.opponentPlayer = this.players[1];

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

    this.opponentPlayer.renderPlayerInfo(1);
    this.currentPlayer.renderPlayerInfo(0);


    $('.cell').width(100/width + "%");
    $('.cell').height($('.cell').width());


    this.move();
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
    console.log("Move");
    //Up
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x, this.currentPlayer.cell.y + i);
      if(cell == null || cell.available == false || cell.player != null){ 
        break; 
      }
      cell.move = true;
      cell.render();
    }
    //Down
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x, this.currentPlayer.cell.y - i);
      if(cell == null || cell.available == false || cell.player != null){
        break;
      }
      cell.move = true;
      cell.render();
    }
    //Left
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x - i, this.currentPlayer.cell.y);
      if(cell == null || cell.available == false || cell.player != null){
        break;
      }
      cell.move = true;
      cell.render();
    }
    //Right
    for(var i = 1; i <= 3; i++) {
      let cell = this.getCell(this.currentPlayer.cell.x + i, this.currentPlayer.cell.y);
      if(cell == null || cell.available == false || cell.player != null){
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
        [this.currentPlayer.weapon, cell.weapon] = [cell.weapon, this.currentPlayer.weapon];
        console.log("Vous avez ramassé : " + this.currentPlayer.weapon);
      }
      availableCells.forEach(cell => {
        cell.move = false;
        cell.element.off("click");
        cell.render();
      });
      this.next();
    }));
    
  }

  next(){
    if(this.currentPlayer == this.players[0]){
      this.currentPlayer = this.players[1];
      this.opponentPlayer = this.players[0];
    }else{
      this.currentPlayer = this.players[0];
      this.opponentPlayer = this.players[1];
    }
    if(this.currentPlayer.health <= 0){
      this.finish(this.opponentPlayer);
      return;
    }
    if(((this.players[0].cell.x == this.players[1].cell.x + 1 || this.players[0].cell.x == this.players[1].cell.x - 1) &&  this.players[0].cell.y == this.players[1].cell.y) || ((this.players[0].cell.y == this.players[1].cell.y + 1 || this.players[0].cell.y == this.players[1].cell.y - 1) &&  this.players[0].cell.x == this.players[1].cell.x)){
      $("#attackButton").click(() => {this.attack()});
      $("#defendButton").click(() => {this.defend()});
    }else{
      this.move();
    }
    this.currentPlayer.renderPlayerInfo(0);
    this.opponentPlayer.renderPlayerInfo(1);
  }

  attack(){
    console.log("Bim boum");
    if(this.opponentPlayer.defend){
      this.opponentPlayer.health -= this.currentPlayer.weapon.damage / 2;
    }else{
      this.opponentPlayer.health -= this.currentPlayer.weapon.damage;
    }
    
    this.currentPlayer.defend = false;
    $("#attackButton").off("click");
    $("#defendButton").off("click");
    this.next();
  }

  defend(){
    console.log("Shielded");
    this.currentPlayer.defend = true;
    $("#defendButton").off("click");
    $("#attackButton").off("click");
    this.next();
  }

  finish(winner){
    $("#winnerModal").modal('show')
    $("#winnerText").text(winner.name + " as gagné la bataille!");
  }

}


//Grid generation
let playGrid = new Grid(10,10,
  10,
  [
    new Player("Ninja", 'ninja', new Weapon("Lance", "spear", 10)),
    new Player("Samourai", 'samourai', new Weapon("Lance", "spear", 10))
  ],
  [
    new Weapon("Epée", "sword", 15),
    new Weapon("Epée", "sword", 15),
    new Weapon("Hache", "axe", 20)
  ]
);



//Change height on resize
$( window ).resize(function() {
  $('.cell').height($('.cell').width());
});
