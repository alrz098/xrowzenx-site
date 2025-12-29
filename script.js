// THEME SWITCH
function setTheme(t){document.body.className="theme-"+t;}

// SNOW + GIFTS
const snow=document.getElementById("snow"), gifts=document.getElementById("gifts"),
sx=snow.getContext("2d"), gx=gifts.getContext("2d");
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

// MUSIC
const music=document.getElementById("bgMusic");
const overlay=document.getElementById("musicOverlay");
const muteBtn=document.getElementById("muteBtn");
music.volume=.75;

overlay.addEventListener("click",()=>{
  music.play();
  overlay.style.display="none";
});

muteBtn.addEventListener("click",()=>{
  music.muted=!music.muted;
  muteBtn.innerHTML=music.muted?'<i class="fa-solid fa-volume-xmark"></i>':'<i class="fa-solid fa-volume-high"></i>';
});

// SUPABASE CONFIG
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

// TRACK VISIT
async function trackVisit(){
  await supabase.from('visits').insert([{timestamp: new Date()}]);
}
trackVisit();

// TRACK SOCIAL
async function trackSocial(platform){
  await supabase.from('social_clicks').insert([{platform,timestamp:new Date()}]);
}

// TRACK GAME
async function trackGame(game){
  await supabase.from('game_clicks').insert([{game_name:game,timestamp:new Date()}]);
}

// VERIFY FUNCTION
function startVerify(el,url){
  if(el.classList.contains("done")) return;
  document.getElementById("verify").style.display="flex";
  setTimeout(()=>{
    document.getElementById("verify").style.display="none";
    el.classList.add("done");
    el.querySelector(".status").innerHTML="Reward unlocked <i class='fa-solid fa-check'></i>";
    trackGame(el.querySelector("span").innerText);
    window.open(url,"_blank");
  },1200);
}
