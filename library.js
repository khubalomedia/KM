/* =========================================
   BaloTV
========================================= */

/* PLAYLISTS */

const playlists = {


  educational: [

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
 
   ],
 
   cartoons: [

    {
      videoId: "ryA419P7Z1Q",
      title: "I'm Not A Berry - Fruity Friends"
    },

 
     {
       videoId: "pAHuC9E_Axg",
       title: "Truth Or Truth - Fruity Friends"
     },
 
     {
       videoId: "fg8uJ0GZ3jk",
       title: "IskhathiSes'phithisphithi KwaMthembu - E1"
     },
 
     {
       videoId: "j9rRaQbLZLo",
       title: "IskhathiSes'phithisphithi KwaMthembu - E2"
     },

     {
      videoId: "cNBdNIUkq2k",
      title: "Story Time"
    },

    {
      videoId: "ii4-VAtg2fg",
      title: "He Starved At School To Avoid Bullying"
    },

    {
      videoId: "e9ODdIf_tOU",
      title: "IskhathiSes'phithisphithi KwaMthembu - E2"
    },

    {
      videoId: "tyByhQtGzWM",
      title: "KFC Hist"
    },

    {
      videoId: "SGWahTOOgHo",
      title: "IskhathiSes'phithisphithi KwaMthembu - E1"
    },

    {
      videoId: "ogK4XR-0ho4",
      title: "IskhathiSes'phithisphithi KwaMthembu - E2"
    },

    {
     videoId: "gv5RNibH_cw",
     title: "Truth Or Truth - Fruity Friends"
   },

   {
     videoId: "yR9eY07X0Hc",
     title: "IskhathiSes'phithisphithi KwaMthembu - E1"
   },

   {
     videoId: "9nons4kJfFY",
     title: "IskhathiSes'phithisphithi KwaMthembu - E2"
   }
 
   ],
 
   trailer: [
 
    {
      videoId: "ONytvK1G9fY",
      title: "Young Ross - Producer - Nkabi Record - Amaphiko - Trailer"
    },

    {
      videoId: "OwWlrcgZJF0",
      title: "Mhlekazi - Masikandi Artist - Trailer"
    },


    {
     videoId: "cYup8Xd8i_U",
     title: "Lawisa - Masikandi Artist - Trailer"
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
     playlists.trailer,
     "row-trailer"
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
 
 function playVideo(
   videoId,
   title = ""
 ) {
 
   playerSection.classList.remove(
     "hidden"
   );
 
   player.src =
     `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
 
   videoTitle.innerText =
     title;
 
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
     function () {
 
       const value =
         this.value.toLowerCase();
 
       const cards =
         document.querySelectorAll(
           ".video-card"
         );
 
       cards.forEach(card => {
 
         const text =
           card.innerText.toLowerCase();
 
         card.style.display =
           text.includes(value)
             ? "block"
             : "none";
 
       });
 
     }
   );
 
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
 
 /* START */
 
 loadAll();
 
 /* COMMENT THIS OUT
    IF YOU DON'T WANT
    PLAYER TO AUTO-OPEN
 */
 
 /*
 loadLastPlayed();
 */