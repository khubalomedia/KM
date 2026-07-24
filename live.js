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

/* ==========================
   PLAY VIDEO
========================== */

function playVideo(index){

currentIndex = index;

const video = videos[index];

player.src =
`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;

saveLastVideo();

updateUpNext();

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* ==========================
   VIDEO GRID
========================== */

function loadVideos(){

videoGrid.innerHTML="";

videos.forEach((video,index)=>{

const card =
document.createElement("div");

card.className="video-card";

card.innerHTML=`

<img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg">

<h3>${video.title}</h3>

`;

card.onclick=()=>{

playVideo(index);

};

videoGrid.appendChild(card);

});

}



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

loadVideos();

loadLastVideo();

updateUpNext();