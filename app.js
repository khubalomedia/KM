/* =========================================
   BaloTV
   API FEEL VERSION
   NO YOUTUBE API
========================================= */

const playlists = {

  home: [

  {
  videoId:"Tivk4nCSVfg",
  title:"Nasty C is my brother from another mother full"
  },
  
  {
  videoId:"S4vNf6UNs8E",
  title:"Ivo Suzee EXPOSED? The Dark Truth"
  },

  {
  videoId: "ZE-sWzZx0VM",
  title: "ChatGPT Explained for South African Students | Beginner's Guide 2026"
  },
  
  {
  videoId:"OwWlrcgZJF0",
  title:"Mhlekazi - Masikandi Artist - Trailer"
  },

  {
  videoId:"ONytvK1G9fY",
  title:"Young Ross - Producer - Nkabi Record - Amaphiko - Trailer"
  },

  {
    videoId:"cYup8Xd8i_U",
    title:"Lawisa - Masikandi Artist - Trailer"
    },

  {
  videoId:"pAHuC9E_Axg",
  title:"Fruity Friends Truth or Truth"
  },
  
  {
  videoId:"QlqznFEUbBw",
  title:"This Rap Battle Got Out Of Control"
  },
   
   {
   videoId:"ii4-VAtg2fg",
   title:"He Starved At School To Avoid Bullying"
   },

   {
      videoId: "ryA419P7Z1Q",
      title: "I'm Not A Berry - Fruity Friends"
    },

  ],
  
 
  
  };
  
  /* PLAYER STATE */
  
  let currentPlaylist = [];
  
  let currentIndex = 0;
  
  /* LOAD */
  
  function loadAll(){
  
  for(const category in playlists){
  
  displayVideos(
  playlists[category],
  `row-${category}`
  );
  
  }
  
  }
  
  /* DISPLAY */
  
  function displayVideos(
  videos,
  rowId
  ){
  
  const row =
  document.getElementById(rowId);
  
  if(!row) return;
  
  row.innerHTML = "";
  
  videos.forEach((video,index)=>{
  
  const card =
  document.createElement("div");
  
  card.className =
  "video-card";
  
  card.innerHTML = `
  
  <img
  src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
  loading="lazy"
  >
  
  <div class="video-card-content">
  
  <h4>${video.title}</h4>
  
  </div>
  
  `;
  
  card.onclick = ()=>{
  
  currentPlaylist = videos;
  
  currentIndex = index;
  
  playVideo(
  video.videoId,
  video.title
  );
  
  updateUpNext();
  
  };
  
  row.appendChild(card);
  
  });
  
  }
  
  /* PLAY VIDEO */
  
  function playVideo(
  videoId,
  title=""
  ){
  
  document
  .getElementById("playerSection")
  .classList.remove("hidden");
  
  const player =
  document.getElementById(
  "video-player"
  );
  
  player.src =
  `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  
  document
  .getElementById("video-title")
  .innerText = title;
  
  window.scrollTo({
  
  top:0,
  behavior:"smooth"
  
  });
  
  localStorage.setItem(
  "lastPlayedVideo",
  JSON.stringify({
  videoId,
  title
  })
  );
  
  }
  
  /* LOAD LAST */
  
  function loadLastPlayed(){
  
  const saved =
  JSON.parse(
  localStorage.getItem(
  "lastPlayedVideo"
  )
  );
  
  if(!saved) return;
  
  playVideo(
  saved.videoId,
  saved.title
  );
  
  }
  
  /* UP NEXT */
  
  function updateUpNext(){
  
  const row =
  document.getElementById(
  "up-next-row"
  );
  
  if(!row) return;
  
  row.innerHTML = "";
  
  const nextVideos =
  currentPlaylist.slice(
  currentIndex + 1,
  currentIndex + 8
  );
  
  nextVideos.forEach((video,index)=>{
  
  const card =
  document.createElement("div");
  
  card.className =
  "video-card";
  
  card.innerHTML = `
  
  <img
  src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
  >
  
  <div class="video-card-content">
  
  <h4>${video.title}</h4>
  
  </div>
  
  `;
  
  card.onclick = ()=>{
  
  currentIndex =
  currentIndex + index + 1;
  
  playVideo(
  video.videoId,
  video.title
  );
  
  updateUpNext();
  
  };
  
  row.appendChild(card);
  
  });
  
  }
  
  /* NEXT */
  
  function playNext(){
  
  if(
  currentIndex <
  currentPlaylist.length - 1
  ){
  
  currentIndex++;
  
  const nextVideo =
  currentPlaylist[currentIndex];
  
  playVideo(
  nextVideo.videoId,
  nextVideo.title
  );
  
  updateUpNext();
  
  }
  
  }
  
  /* PREVIOUS */
  
  function playPrevious(){
  
  if(currentIndex > 0){
  
  currentIndex--;
  
  const prevVideo =
  currentPlaylist[currentIndex];
  
  playVideo(
  prevVideo.videoId,
  prevVideo.title
  );
  
  updateUpNext();
  
  }
  
  }
  
  /* BUTTONS */
  
  document
  .getElementById("nextBtn")
  .addEventListener(
  "click",
  playNext
  );
  
  document
  .getElementById("prevBtn")
  .addEventListener(
  "click",
  playPrevious
  );
  
  /* SEARCH */
  
  document
  .getElementById("searchInput")
  .addEventListener(
  "input",
  function(){
  
  const value =
  this.value.toLowerCase();
  
  const cards =
  document.querySelectorAll(
  ".video-card"
  );
  
  cards.forEach(card=>{
  
  const text =
  card.innerText.toLowerCase();
  
  card.style.display =
  text.includes(value)
  ? "block"
  : "none";
  
  });
  
  }
  );
  
  /* START */
  
  loadAll();
  
  loadLastPlayed();