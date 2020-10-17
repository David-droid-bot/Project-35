//Create variables here
var dog;
var dogHappy;
var database;
var foodS;
var foodStock
var dogImage;
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj=new food();
  feed=createButton("Feed");
  feed.position(400,30);
  feed.mousePressed(feedDog);
  addFood=createButton("addfood");
  addFood.position(400,50);
  addFood.mousePressed(addFood);
}


function draw() {  
background(46,139,87);
foodObj.display();
  drawSprites();
  //add styles here
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function readStock(data){
foodS=data.val();
}
function addFood(){
  foodS++;
  database.ref('/').update({
   Food:foodS
  })
}
function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}