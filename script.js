function setTheme(t){document.body.className="theme-"+t;}
function openGame(url){window.open(url,"_blank");}

/* SNOW + GIFTS */
const snow=document.getElementById("snow"),
gifts=document.getElementById("gifts"),
sx=snow.getContext("2d"),
gx=gifts.getContext("2d");
let w,h;
function resize(){w=snow.width=gifts.width=innerWidth;h=snow.height=gifts.height=innerHeight;}
resize();onresize=resize;
const flakes=[...Array(70)].map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*3+1,s:Math.random()+.5}));
const colors=["#ffd700","#8a2be2","#ff0000","#00bfff","#00ff00","#ffffff"];
const boxes=[...Array(25)].map(()=>({x:Math.random()*w,y:Math.random()*h,s:Math.random()+.4,c:colors[Math.floor(Math.random()*colors.length)]}));
(function loop(){
  sx.clearRect(0,0,w,h);
  gx.clearRect(0,0,w,h);
  flakes.forEach(f=>{sx.fillStyle="white";sx.beginPath();sx.arc(f.x,f.y,f.r,0,7);sx.fill();f.y+=f.s;if(f.y>h)f.y=0;});
  boxes.forEach(b=>{gx.fillStyle=b.c;gx.fillRect(b.x,b.y,14,14);gx.fillStyle="#fff";gx.fillRect(b.x+6,b.y,2,14);gx.fillRect(b.x,b.y+6,14,2);b.y+=b.s;if(b.y>h)b.y=0;});
  requestAnimationFrame(loop);
})();
const music=document.getElementById("bgMusic");
const overlay=document.getElementById("musicOverlay");
const muteBtn=document.getElementById("muteBtn");
music.volume=.75;
overlay.addEventListener("click",()=>{music.play();overlay.style.display="none";});
muteBtn.addEventListener("click",()=>{music.muted=!music.muted;muteBtn.innerHTML=music.muted?'<i class="fa-solid fa-volume-xmark"></i>':'<i class="fa-solid fa-volume-high"></i>';});
