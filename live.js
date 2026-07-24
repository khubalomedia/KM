/* =====================================
   BaloTV
   app.js
   No YouTube API
===================================== */

// Replace with YOUR YouTube Channel ID
const CHANNEL_ID = "UC5reF0zkdOnB3GEpVqNJfHw";

// Elements

const player =
document.getElementById("livePlayer");

const videoGrid =
document.getElementById("videoGrid");

const upNext =
document.getElementById("upNext");

const offline =
document.getElementById("offlineScreen");

const liveStatus =
document.getElementById("liveStatus");

/* ==========================
   LIVE PLAYER
========================== */

function playLive(){

player.src =
`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1`;

}


function toggleMenu() {
   document.getElementById("dropdownMenu").classList.toggle("active");
}



document.addEventListener("click", function(e){

   const menu=document.getElementById("dropdownMenu");
   const button=document.querySelector(".menu-btn");

   if(!menu.contains(e.target) && !button.contains(e.target)){

       menu.classList.remove("active");

   }

});





/* ==========================
   CHECK LIVE
========================== */

/*
Simple version.

Always attempts to load the
live stream.

If you're not live,
YouTube displays the
offline screen inside
the player.

Later you can replace
this with a Cloudflare
Worker for true
automatic live detection.
*/

function checkLive(){

playLive();

liveStatus.innerHTML="LIVE";

offline.style.display="none";

}

/* ==========================
   AUTO REFRESH
========================== */

setInterval(()=>{

checkLive();

},30000);

/* ==========================
   START
========================== */

checkLive();

