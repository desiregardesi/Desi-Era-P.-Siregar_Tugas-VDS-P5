let player;
let walkers = [];

function setup() {
  createCanvas(800, 600);
  player = new Player();
  
  // Membuat objek walker banyak dengan menggunakan array
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    walkers.push(new Walker(x, y));
  }
}

function draw() {
  background(220);
  
  // Mendapatkan posisi mouse
  let targetX = mouseX;
  let targetY = mouseY;
  
  // Update posisi dan gerakan walker
  for (let walker of walkers) {
    walker.updatePosition(targetX, targetY);
    walker.display();
  }
  
  // Tampilkan karakter khusus
  player.updatePosition();
  player.display();
}

// Class Walker
class Walker {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random3D().mult(3);
    this.acceleration = createVector();
    this.radius = 20;
    this.color = color(255, 250, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.5;
  }

  display() {
    fill(this.color);
    rect(this.position.x, this.position.y, this.radius * 3);
  }

  updatePosition(targetX, targetY) {
    let target = createVector(targetX, targetY);
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.acceleration.add(steer);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

// Class Player
class Player {
  constructor() {
    this.radius = 20;
    this.color = color(0, 250, 255);
  }

  display() {
    fill(this.color);
    rect(mouseX, mouseY, this.radius * 2);
  }

  updatePosition() {
    // Posisi karakter khusus diatur oleh posisi mouse
  }
}
