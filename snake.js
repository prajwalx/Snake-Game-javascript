const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const box = 32;

const ground = new Image();
ground.src = './media/Back-ground.jpg';

const foodImg = new Image();
foodImg.src = './media/apple.png';
/*
608 x 608 board
we take box size as 32
thus 608/32 = 19 => We divide canvas into 19 rows and 19 columns
*/
let snake = [];
snake[0]={
  x:9*box,
  y:9*box
};
//Math.random()*(max-min)+min
let food ={
  x:Math.floor(Math.random()*(18-1)+1)*box,
  y:Math.floor(Math.random()*(18-1)+1)*box
}

let d;
let score = 0;
document.addEventListener('keydown',direction);
function direction(event){
  if(event.keyCode===37)
  d='LEFT';
  else if(event.keyCode===38)
  d='UP';
  else if(event.keyCode===39)
  d='RIGHT';
  else if(event.keyCode===40)
  d='DOWN';
}

function collision(newhead,snake){
  for(let item of snake){
    if(newhead.x===item.x&&newhead.y===item.y)
    return true;
  }
  return false;
}

function draw(){
  ctx.drawImage(ground,0,0);
  for(let i=0;i<snake.length; i++){
    ctx.fillStyle = (i==0) ? 'darkgreen' : 'lightgreen';
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }  
  ctx.drawImage(foodImg,food.x,food.y,box,box);
  
  let snakeX = snake[0].x,
      snakeY = snake[0].y;
      
  if(d==='LEFT')
  snakeX-=box;
  if(d==='UP')
  snakeY-=box
  if(d==='RIGHT')
  snakeX+=box;
  if(d==='DOWN')
  snakeY+=box;
  
  if(snakeX===food.x && snakeY===food.y){
    score++;
    food.x=(Math.floor(Math.random()*(18-1)+1))*box;
    food.y=(Math.floor(Math.random()*(18-1)+1))*box;    
    //skip pop
  }
  else{
    snake.pop();  
  }  
  //Rules
  if(snakeX<0||snakeX>18*box||snakeY<0||snakeY>18*box||collision({x:snakeX,y:snakeY},snake)){
    clearInterval(game);
  }
  snake.unshift({x:snakeX,y:snakeY});
  
  ctx.fillStyle = 'white';
  ctx.font = '45px Changa one';
  ctx.fillText(score,2*box,1.6*box);
  
}
let game = setInterval(draw,100);