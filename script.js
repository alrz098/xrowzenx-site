function openGame(url){window.open(url,"_blank");}

/* Müzik */
const music = document.getElementById("bgMusic");
const overlay = document.getElementById("musicOverlay");
const slider = document.getElementById("volumeSlider");
music.volume = slider.value/100;
slider.addEventListener("input",()=>{music.volume=slider.value/100;});
overlay.addEventListener("click", ()=>{
  music.play().catch(()=>{});
  overlay.style.display = "none";
});

/* Kar ve Hediyeler */
const snow=document.getElementById("snow"), gifts=document.getElementById("gifts"),
sx=snow.getContext("2d"), gx=gifts.getContext("2d");
let w,h;
function resize(){w=snow.width=gifts.width=innerWidth;h=snow.height=gifts.height=innerHeight;}
resize();onresize=resize;

const flakes=[...Array(70)].map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*3+1,s:Math.random()+.5}));
const boxes=[...Array(25)].map(()=>({x:Math.random()*w,y:Math.random()*h,s:Math.random()+.4}));

function drawConfetti(x,y){
  for(let i=0;i<20;i++){
    let c={x:x,y:y,vx:(Math.random()-0.5)*5,vy:(Math.random()-1.5)*5,color:`hsl(${Math.random()*360},100%,50%)`};
    confettis.push(c);
  }
}
let confettis=[];
(function loop(){
  sx.clearRect(0,0,w,h);
  gx.clearRect(0,0,w,h);

  flakes.forEach(f=>{sx.fillStyle="white";sx.beginPath();sx.arc(f.x,f.y,f.r,0,7);sx.fill();f.y+=f.s;if(f.y>h)f.y=0;});

  boxes.forEach(b=>{
    gx.fillStyle="red";gx.fillRect(b.x,b.y,14,14);
    gx.fillStyle="#fff";gx.fillRect(b.x+6,b.y,2,14);gx.fillRect(b.x,b.y+6,14,2);
    b.y+=b.s;if(b.y>h)b.y=0;
  });

  confettis.forEach((c,i)=>{
    c.x+=c.vx;c.y+=c.vy;c.vy+=0.1;
    gx.fillStyle=c.color;gx.fillRect(c.x,c.y,4,4);
    if(c.y>h) confettis.splice(i,1);
  });

  requestAnimationFrame(loop);
})();

gifts.addEventListener("click",e=>{
  boxes.forEach(b=>{
    if(e.offsetX>b.x && e.offsetX<b.x+14 && e.offsetY>b.y && e.offsetY<b.y+14){
      drawConfetti(b.x+7,b.y+7);
    }
  });
});
