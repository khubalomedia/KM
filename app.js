/* =========================================
   BaloTV
========================================= */

/* PLAYLISTS */

const playlists = {


  educational: [

    {
      videoId: "8UWAlJm-SKI",
      title: "From TikTok To Fame, Lasizwe Dambuza, Uncle Waffles, Wian Van Den Berg"
    },

    {
      videoId: "fBE8o2MpZxU",
      title: "Why Are Women Still Getting Killed In South Africa"
    },

    {
      videoId: "S4vNf6UNs8E",
      title: "Fake Casting Agent - African Casting"
    },
 
    {
      videoId: "23ENrmIoCfs",
      title: "South Africa's 2029 Election Could Change Everything"
    },

    {
      videoId: "E0ElvFfV6U4",
      title: "The History of Maize | How It Changed Africa"
    }, 
    
    {
      videoId: "ZE-sWzZx0VM",
      title: "ChatGPT Explained for South African Students | Beginner's Guide 2026"
    },


    {
      videoId: "C2cryRmjSTc",
      title: "Why 90% of Smokers Can't Quit"
    },


  ],


   talk: [

    {
      videoId: "z0Ito0_XF_8",
      title: "Young Ross - Producer - Nkabi Record - Amaphiko"
    },

    {
      videoId: "o_Zowc8eO90",
      title: "Mhlekazi - Masikandi Artist - Interview"
    },

    {
      videoId: "XvhCbD5sPec",
      title: "Lawisa Zulu - Masikandi Artist - Interview"
    },

    {
      videoId: "Tivk4nCSVfg",
      title: "Nasty C Is My Bother Form Another Mother"
    },

    {
      videoId: "QlqznFEUbBw",
      title: "This Rap Battle Got Out Of Control"
    },

    {
      videoId: "VQ4eHNjPUbE",
      title: "Ntambanana Artist"
    },
 
   ],
 

   
   cartoons: [

    {
      videoId: "ii4-VAtg2fg",
      title: "He Starved At School To Avoid Bullying"
    },

    {
      videoId: "ryA419P7Z1Q",
      title: "I'm Not A Berry - Fruity Friends"
    },

 
     {
       videoId: "pAHuC9E_Axg",
       title: "Truth Or Truth - Fruity Friends"
     },
 
     {
      videoId: "cNBdNIUkq2k",
      title: "Story Time"
    },

    {
      videoId: "tyByhQtGzWM",
      title: "KFC Hist"
    },


 
   ],
 
   IskhathiSesphithisphithiKwaMthembu: [
 
    {
      videoId: "fg8uJ0GZ3jk",
      title: "16 Days Of Activism"
    },

    {
      videoId: "j9rRaQbLZLo",
      title: "Siya Kumemulo"
    },

   {
     videoId: "e9ODdIf_tOU",
     title: "Yin Iyouth Day"
   },

   {
     videoId: "SGWahTOOgHo",
     title: "Stop GBV"
   },

   {
     videoId: "ogK4XR-0ho4",
     title: "Freedom Day"
   },

  {
    videoId: "yR9eY07X0Hc",
    title: "Yini Isithembu"
  },

  {
    videoId: "9nons4kJfFY",
    title: "Heritage Day"
  },

  {
    videoId: "gv5RNibH_cw",
    title: "Breast Cancer Month"
  },
   
 
   ],

  
 
  Shorts: [

   {
     videoId: "1PanUL6bXh0",
     title: "Bekum'nand Izol Eb'suk Ekonka _ Mhlekazi "
   },

   {
    videoId: "-dWXQy-DRJo",
    title: "Aze Amahl AmaBhinca _ Lawisa Zulu"
  },

  {
    videoId: "bOOTThXCFSQ",
    title: "Young Ross _ Afro Pop Artist and Producer"
  },


   {
     videoId: "i_SbgeIbvAI",
     title: "Seng'linde Ngalinda Lut uk'buya Dali _ Mhlekazi"
   },

   {
    videoId: "k3w8Fgk-W24",
    title: "Yonk Intoyam Iyi_Bhinca _ Lawisa Zulu"
  },

  {
    videoId: "fFz3bYhYN78",
    title: "Mhlekazi _ Mas'kandi Artist "
  },


  {
    videoId: "mwJCYlWtyp4",
    title: "Lawisa Zulu _ Mas'kandi Artist "
  },

  {
    videoId: "97c7tDrqfYU",
    title: "Ibhola Labafana _ Lawisa Zulu "
  },





  

  ],

   
 
 };
 
 /* PLAYER STATE */
 
 let currentPlaylist = [];
 
 let currentIndex = 0;
 
 /* ELEMENTS */
 
 const playerSection =
   document.getElementById(
     "playerSection"
   );
 
 const player =
   document.getElementById(
     "video-player"
   );
 
 const videoTitle =
   document.getElementById(
     "video-title"
   );
 
 /* HIDE PLAYER INITIALLY */
 
 playerSection.classList.add(
   "hidden"
 );
 
 /* LOAD ALL VIDEOS */
 
 function loadAll() {

  displayVideos(
    playlists.educational,
    "row-educational"
  );
 
   displayVideos(
     playlists.talk,
     "row-talk"
   );
 
   displayVideos(
     playlists.cartoons,
     "row-cartoons"
   );
 
   displayVideos(
     playlists.IskhathiSesphithisphithiKwaMthembu,
     "row-IskhathiSesphithisphithiKwaMthembu"
   );
 
   displayVideos(
    playlists.Shorts,
    "row-Shorts"
  );
 }
 
 /* DISPLAY VIDEOS */
 
 function displayVideos(
   videos,
   rowId
 ) {
 
   const row =
     document.getElementById(rowId);
 
   if (!row) return;
 
   row.innerHTML = "";
 
   videos.forEach((video, index) => {
 
     const card =
       document.createElement("div");
 
     card.className =
       "video-card";
 
       card.innerHTML = `
       <img
         class="video-thumb"
         src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg"
         alt="${video.title}"
         loading="lazy"
       >
     
       <div class="video-card-content">
     
         <h4>${video.title}</h4>
     

     
       </div>
     `;
 
     card.onclick = () => {
 
       currentPlaylist = videos;
 
       currentIndex = index;
 
       playVideo(
         video.videoId,
         video.title
       );
 
     };
 
     row.appendChild(card);
 
   });
 
 }
 
 /* PLAY VIDEO */
 
 function playVideo(videoId, title = "") {

  playerSection.classList.remove("hidden");

  updatePlayerQueue();

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;

  document
    .getElementById("video-title")
    .innerText = title;

  // Show videos from the same category in Up Next
  updatePlayerQueue();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  localStorage.setItem(
    "lastPlayedVideo",
    JSON.stringify({
      videoId,
      title
    })
  );

}



function updatePlayerQueue(){

  const queue=document.getElementById("playerQueue");

  queue.innerHTML="";

  currentPlaylist.forEach((video,index)=>{

      if(index===currentIndex) return;

      const card=document.createElement("div");

      card.className="up-next-card";

      card.innerHTML=`

      <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg">

      <div class="up-next-info">

          <h3>${video.title}</h3>


      </div>

      `;

      card.onclick=()=>{

          currentIndex=index;

          playVideo(video.videoId,video.title);

      };

      queue.appendChild(card);

  });

}


 
 /* LOAD LAST PLAYED */
 
 function loadLastPlayed() {
 
   const saved =
     JSON.parse(
       localStorage.getItem(
         "lastPlayedVideo"
       )
     );
 
   if (!saved) return;
 
   playVideo(
     saved.videoId,
     saved.title
   );
 
 }
 
 /* NEXT VIDEO */
 
 function playNext() {

  if (
    currentIndex <
    currentPlaylist.length - 1
  ) {

    currentIndex++;

    const nextVideo =
      currentPlaylist[currentIndex];

    playVideo(
      nextVideo.videoId,
      nextVideo.title
    );

  } else {

    // Restart from the beginning of the same category
    currentIndex = 0;

    const firstVideo =
      currentPlaylist[currentIndex];

    playVideo(
      firstVideo.videoId,
      firstVideo.title
    );

  }

}
 /* PREVIOUS VIDEO */
 
 function playPrevious() {
 
   if (currentIndex > 0) {
 
     currentIndex--;
 
     const prevVideo =
       currentPlaylist[currentIndex];
 
     playVideo(
       prevVideo.videoId,
       prevVideo.title
     );
 
     updatePlayerQueue();

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

const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    const rows = [
      "educational",
      "talk",
      "cartoons",
      "trailer"
    ];

    rows.forEach(name => {

      const row = document.getElementById("row-" + name);

      if (!row) return;

      const section = row.closest("section");

      let visible = 0;

      row.querySelectorAll(".video-card").forEach(card => {

        const title = card
          .querySelector("h4")
          ?.innerText
          .toLowerCase() || "";

        const match = title.includes(value);

        card.style.display = match ? "" : "none";

        if (match) {
          visible++;
        }

      });

      if (section) {
        section.style.display =
          visible > 0 ? "" : "none";
      }

    });

  });

}
 
 /* SERVICE WORKER */
 
 if (
   "serviceWorker" in navigator
 ) {
 
   navigator
     .serviceWorker
     .register(
       "/service-worker.js"
     );
 
 }


 document.addEventListener("click", function(e){

  const menu=document.getElementById("dropdownMenu");
  const button=document.querySelector(".menu-btn");

  if(!menu.contains(e.target) && !button.contains(e.target)){

      menu.classList.remove("active");

  }

});






 
 /* START */
 
 loadAll();
 
 /* COMMENT THIS OUT
    IF YOU DON'T WANT
    PLAYER TO AUTO-OPEN
 */
 
 /*
 loadLastPlayed();
 */