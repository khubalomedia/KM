/* =========================================
   BaloTV
========================================= */

/* PLAYLISTS */

const playlists = {

   talk: [
 
     {
       videoId: "S4vNf6UNs8E",
       title: "Fake Casting Agent - African Casting"
     },
 
     {
      videoId: "72TOgTtNvE4",
      title: "Soka Campign With VibeFM"
    },

    {
      videoId: "V3_SkWqP8pQ",
      title: "Unlock Your Creativity - Acting Workshop"
    },

    {
      videoId:"REvFwoDyBek",
      title:"Acting For Camera - Begginer Tutorial"
      },
      
      {
      videoId:"2YKPm9HMbWs",
      title:"Young Creatives This Is Your Moment - Acting Workshop"
      },
 
     

    {
      videoId: "Tivk4nCSVfg",
      title: "Nasty C Is My Bother Form Another Mother"
    },

    {
      videoId: "_ui2eYlhzNI",
      title: "Nasty C Is My Bother Form Another Mother"
    },

    {
      videoId: "cXxhysTLe8U",
      title: "Fake Casting Agent - African Casting"
    },

    {
      videoId: "o5Rnrl8XudM",
      title: "This Rap Battle Got Out Of Control"
    },
 
   ],
 
   cartoons: [
 
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
 
   musicvideos: [
 
    {
      videoId: "EQ5XdBCeEU0",
      title: "Lawisa - Maskandi Artist - E3 - P2"
    },

    {
      videoId: "QlqznFEUbBw",
      title: "Mhlekazi - Masikandi Artist - Episode 3"
    },

    {
      videoId: "5NA25uOG5aA",
      title: "Mhlekazi - Maskandi Artist - E2 - P1"
    },


    {
     videoId: "REvFwoDyBek",
     title: "Lawisa - Masikandi Artist - Episode 3 - Part 1"
   },

   {
     videoId: "2YKPm9HMbWs",
     title: "Young Ross - Afro Pop Artist - Producer"
   },

   {
     videoId: "78KRwANWc4E",
     title: "Mhlekazi - Masikandi Artist - Episode 3 - Part 2"
   },
       
   {
    videoId:"78KRwANWc4E",
    title:"Mhlekazi - Masikandi Artist - Episode 2 - Part 3"
    },
    
    {
    videoId:"EQ5XdBCeEU0",
    title:"Mhlekazi - Masikandi Artist"
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
     playlists.talk,
     "row-talk"
   );
 
   displayVideos(
     playlists.cartoons,
     "row-cartoons"
   );
 
   displayVideos(
     playlists.musicvideos,
     "row-musicvideos"
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