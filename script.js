function setTheme(t){document.body.className="theme-"+t;}

// MUSIC
const music = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");
music.volume = 0.75;
muteBtn.addEventListener("click", ()=>{
  music.muted = !music.muted;
  muteBtn.innerHTML = music.muted ? '<i class="fa-solid fa-volume-xmark"></i>':'<i class="fa-solid fa-volume-high"></i>';
});

// GAME CLICK
document.querySelectorAll(".game").forEach(el=>{
  el.addEventListener("click", ()=>{
    const url = el.getAttribute("data-url");
    window.open(url,"_blank");
    spawnConfetti(el);
  });
});

// SNOW
const snow = document.getElementById("snow");
const sx = snow.getContext("2d");
let w,h;
function resize(){w=snow.width=innerWidth;h=snow.height=innerHeight;}
resize();onresize=resize;
const flakes=[...Array(70)].map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*3+1,s:Math.random()+.5}));
(function loopSnow(){
  sx.clearRect(0,0,w,h);
  flakes.forEach(f=>{sx.fillStyle="white";sx.beginPath();sx.arc(f.x,f.y,f.r,0,7);sx.fill();f.y+=f.s;if(f.y>h)f.y=0;});
  requestAnimationFrame(loopSnow);
})();

// GIFTS
const gifts = document.getElementById("gifts");
const gx = gifts.getContext("2d");
const colors=["#ffd700","#8a2be2","#ff0000","#00bfff","#00ff00","#ffffff"];
const boxes=[...Array(25)].map(()=>({x:Math.random()*w,y:Math.random()*h,s:Math.random()+.4,c:colors[Math.floor(Math.random()*colors.length)]}));
(function loopGifts(){
  gx.clearRect(0,0,w,h);
  boxes.forEach(b=>{
    gx.fillStyle=b.c;
    gx.fillRect(b.x,b.y,14,14);
    gx.fillStyle="#fff";gx.fillRect(b.x+6,b.y,2,14);gx.fillRect(b.x,b.y+6,14,2);
    b.y+=b.s;if(b.y>h)b.y=0;
  });
  requestAnimationFrame(loopGifts);
})();

// CONFETTI
const confetti = document.getElementById("confetti");
const cx = confetti.getContext("2d");
function spawnConfetti(el){
  const rect = el.getBoundingClientRect();
  const confs = [...Array(30)].map(()=>({
    x: rect.left+Math.random()*rect.width,
    y: rect.top+Math.random()*rect.height,
    r:Math.random()*4+2,
    s: Math.random()+1,
    c: colors[Math.floor(Math.random()*colors.length)]
  }));
  let anim = true;
  function loop(){
    if(!anim) return;
    cx.clearRect(0,0,confetti.width,confetti.height);
    confs.forEach(c=>{
      cx.fillStyle=c.c;
      cx.beginPath();
      cx.arc(c.x,c.y,c.r,0,7);
      cx.fill();
      c.y+=c.s;
    });
    requestAnimationFrame(loop);
  }
  loop();
  setTimeout(()=>{anim=false;},800);
}
