const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius=10;     //○の大きさを直径で表す
let x=canvas.width/2;    //○を描く場所のｘ座標
let y=canvas.height-30;  //○を描く場所のｙ座標
let dx=2,dy=-2;          //○を動かす向きの(x,y)を指定
const paddleH=10;        //*パドルの高さ
const paddleW=75;        //*パドルの横幅
let paddleX=(canvas.width-paddleW)/2;//*パドルの左上の位置。最初は中央。

function drawBall(){
   ctx.beginPath();                  //図形を描く作業を始める
   ctx.arc(x,y, ballRadius, 0, Math.PI * 2); //○を描くという指定をする
   ctx.fillStyle = '#0095DD';        //塗る色を指定する
   ctx.fill();                       //色を塗る
   ctx.closePath();                  //図形を描く作業を終わる
}

function drawPaddle() { //*ボールを打つパドルを描画する関数
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw(){
   ctx.clearRect(0,0,canvas.width,canvas.height);//領域全体を消す
   drawBall();          //座標（ｘ、ｙ）に○を描く関数を呼ぶ
   x=x+dx;              //○を描く場所のｘ座標を少しずらす
   y=y+dy;              //○を描く場所のｙ座標を少しずらす
   if(y<0){ dy=-dy; }             //上に出たら移動の方向を反対にする
   if(y>canvas.height){
      if(x>paddleX && x<paddleX+paddleW){
         dy=-dy;
      }else{
         alert("失敗");              //メッセージを出して画面の動きを止める
         document.location.reload(); //document.location.reloadージを初期化
　　　   clearInterval(reDraw);      //下端に来たら、画面書き換え停止
      }
   }
   if(x<0){ dx=-dx; }             //左に出たら移動の方向を反対にする
   if(x>canvas.width) { dx=-dx; } //右に出たら移動の方向を反対にする
   if(rightPressed) {
      paddleX=Math.min(paddleX+7,canvas.width-paddleW);
   }else if(leftPressed){
      paddleX=Math.max(paddleX-7,0);
   }
   drawPaddle();
}

let rightPressed = false; //*右キーが押されたらtrueになる
let leftPressed = false; //*左キーが押されたらtrueになる

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
reDraw=setInterval(draw,10); // 10ms 毎にdraw()関数を呼び出す

