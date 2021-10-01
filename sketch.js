let CollisionCount = 0;
let CollisionState = false;
class Block {
  constructor(mass, width, height, Xposition, velocity) {
    this.mass = mass;
    this.width = width;
    this.height = height;
    this.Xposition = Xposition;
    this.velocity = velocity;
  }
}
let Block1 = new Block(1, 50, 50, 250, 0);
let Block2 = new Block(10000, 50, 50, 500, -2);
let Nloop = Block2.mass / (100 * Block1.mass);

function collisionBlocks() {
  if (Block1.Xposition + Block1.width >= Block2.Xposition) {
    CollisionState = true;
    //Conservation Equation
    let Initialv1 = Block1.velocity,
      Initialv2 = Block2.velocity;
    Block1.velocity =
      ((Block1.mass - Block2.mass) / (Block1.mass + Block2.mass)) * Initialv1 +
      ((2 * Block2.mass) / (Block1.mass + Block2.mass)) * Initialv2;

    Block2.velocity =
      ((Block2.mass - Block1.mass) / (Block1.mass + Block2.mass)) * Initialv2 +
      ((2 * Block1.mass) / (Block1.mass + Block2.mass)) * Initialv1;
  }
}

function collisionWall() {
  if (Block1.Xposition <= 20) {
    CollisionState = true;
    Block1.velocity *= -1;
  }
}

function setup() {
  createCanvas(800, 500);
  stroke(255);
}
function draw() {
  background(0);

  line(0, 450, 800, 450);

  fill(255, 250, 100);
  rect(0, 0, 20, 450);

  fill(100, 250, 200);
  rect(Block1.Xposition, 400, Block1.width, Block1.height);

  fill(100, 250, 100);
  rect(Block2.Xposition, 400, Block2.width, Block2.height);

  for (let i = 0; i < floor(Nloop) + 1; i++) {
    collisionBlocks();
    collisionWall();

    Block1.Xposition += Block1.velocity / (floor(Nloop) + 1);
    Block2.Xposition += Block2.velocity / (floor(Nloop) + 1);

    if (CollisionState == true) {
      CollisionCount++;
      CollisionState = false;
    }
  }

  textSize(40);
  text("No. of Collision = " + CollisionCount, 200, 200);
}
