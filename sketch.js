const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1, wall2, wall3;
var bridge;
var stones = [];
var link;
var bg_img;
var jointPoint;
var zombie2_img, zombie_img;
var cut_img, cut;
var wood_img, wood;

function preload() {
  bg_img = loadImage("assets/background.png")
  zombie_img = loadImage("assets/zombie1.png")
  zombie2_img = loadImage("assets/zombie2.png")
  cut_img = loadImage("assets/axe.png")

}


function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  frameRate(80);

  wall1 = new Base(25, 200, 100, 100)
  wall2 = new Base(width - 40, 200, 100, 100)
  wall3 = new Base(width / 2, height, 1300, 20)

  bridge = new Bridge(18, { x: 50, y: 130 })

  stone = Bodies.circle(800, 200, 15, { density: 0.001 })

  jointPoint = new Base(1150, 200, 70, 20);
  Matter.Composite.add(bridge, jointPoint)

  link = new Link(bridge, jointPoint);

  imageMode(CENTER)

  for (i = 0; i < 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 250)
    var y = random(-10, 100)
    var stone = new Stone(x, y, 50, 50)
    stones.scale = 0.2
    stones.push(stone)
  }

  zombie = createSprite(10, height - 100, 200, 200)
  zombie.addImage("myZombie", zombie2_img)
  zombie.addImage("sad",zombie_img)
  zombie.velocityX = 5;
  zombie.scale = 0.1

  cut = createImg("assets/axe.png")
  cut.position(width - 200, height / 2);
  cut.size(50, 50);
  cut.mouseClicked(handleCutButton)

}

function draw() {
  background(51);
  Engine.update(engine);

  image(bg_img, width / 2, height / 2, width, height)

  wall3.display();
  bridge.show();

  for (var stone of stones) {
    stone.display();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
    if (distance <= 50) {
      zombie.changeImage("sad")
      zombie.velocityX = 0;
      collided = true
    }
  }

  drawSprites();
}

function handleCutButton() {
  link.detach()
  setTimeout(() => {
    bridge.break();
  }, 1000)
}