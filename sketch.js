// Variáveis globais
let player;
let clues = [];
let currentClue = 0;
let ecosystems = [];

function setup() {
  createCanvas(800, 600);
  
  // Inicializa o jogador
  player = new Player(width / 2, height / 2);
  
  // Cria alguns ecossistemas no mapa
  ecosystems.push(new Ecosystem('Floresta', 200, 200, 'As abelhas ajudam na polinização.'));
  ecosystems.push(new Ecosystem('Rio', 500, 100, 'Os rios ajudam na irrigação.'));
  ecosystems.push(new Ecosystem('Campo', 600, 400, 'A biodiversidade mantém o solo saudável.'));
}

function draw() {
  background(200, 255, 200); // Cor de fundo (verde claro)

  // Desenha o jogador
  player.show();
  player.move();
  
  // Exibe os ecossistemas e as pistas
  for (let eco of ecosystems) {
    eco.show();
    eco.checkForClue(player);
  }

  // Exibe a pista atual
  fill(0);
  textSize(16);
  text("Pista: " + (currentClue < clues.length ? clues[currentClue] : "Colete todas as pistas!"), 10, height - 20);
}

// Classe para o jogador
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  show() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }
}

// Classe para os ecossistemas
class Ecosystem {
  constructor(name, x, y, clue) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.clue = clue;
    this.size = 40;
  }

  show() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.size, this.size);
    fill(0);
    textSize(12);
    text(this.name, this.x - this.size / 2, this.y - this.size / 2 - 10);
  }

  checkForClue(player) {
    let d = dist(player.x, player.y, this.x, this.y);
    if (d < this.size / 2 && !clues.includes(this.clue)) {
      clues.push(this.clue);
      currentClue = clues.length - 1;
    }
  }
}
