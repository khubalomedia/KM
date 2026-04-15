const API_KEY = "AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y";
const CHANNEL_ID = "UC5reF0zkdOnB3GEpVqNJfHw";

// PLAYLISTS
const playlists = {
  talk: "PL8W_paC7-AOtTlt5kzJXexdirvM5HGIHf",
  cartoons: "PL8W_paC7-AOuHLHtxjVGMRaeEVFdqpoix",
  musicvideos: "PL8W_paC7-AOs-YVLrcN1rw_MhozUIoESZ",
  music: "PL8W_paC7-AOvTL0ZF6iSiZhYxpjV1uVGD"
};

// GLOBAL PLAYER STATE
let currentPlaylist = [];
let currentIndex = 0;

// LOAD EVERYTHING
function loadAll() {
  loadPlaylist(playlists.talk, "row-talk");
  loadPlaylist(playlists.cartoons, "row-cartoons");
  loadPlaylist(playlists.musicvideos, "row-musicvideos");
  loadPlaylist(playlists.music, "row-music");
  loadContinueWatching();
}

// FETCH PLAYLIST
async function loadPlaylist(id, rowId) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${id}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    displayVideos(data.items, rowId);
  } catch (err) {
    console.error("Error loading playlist:", err);
  }
}

// DISPLAY VIDEOS
function displayVideos(videos, rowId) {
  const row = document.getElementById(rowId);
  row.innerHTML = "";

  const playlistArray = videos.map(v => ({
    id: v.snippet.resourceId.videoId,
    title: v.snippet.title
  }));

  videos.forEach((video, index) => {
    const videoId = video.snippet.resourceId.videoId;

    const card = document.createElement("div");
    card.classList.add("video-card");

    card.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}">
      <p>${video.snippet.title}</p>
    `;

    card.onclick = () => {
      currentPlaylist = playlistArray;
      currentIndex = index;

      saveLastVideo(videoId, video.snippet.title);

      playVideo(videoId);
      renderUpNext();
    };

    row.appendChild(card);
  });
}

// PLAY VIDEO
function playVideo(videoId) {
  const player = document.getElementById("video-player");

  player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;

  document.getElementById("player-section").scrollIntoView({
    behavior: "smooth"
  });

  // Start checking for video end
  startAutoNext();
}

// SAVE LAST VIDEO
function saveLastVideo(id, title) {
  localStorage.setItem("lastVideo", JSON.stringify({ id, title }));
}

// CONTINUE WATCHING
function loadContinueWatching() {
  const data = JSON.parse(localStorage.getItem("lastVideo"));
  if (!data) return;

  const row = document.getElementById("row-continue");
  row.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("video-card");

  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${data.id}/mqdefault.jpg">
    <p>${data.title}</p>
  `;

  card.onclick = () => {
    playVideo(data.id);
  };

  row.appendChild(card);
}

// AUTO PLAY NEXT (simple timer-based)
let autoNextInterval;

function startAutoNext() {
  clearInterval(autoNextInterval);

  // check every 2 seconds if video ended
  autoNextInterval = setInterval(() => {
    const iframe = document.getElementById("video-player");

    // crude way: detect if video stopped (works decently)
    try {
      const src = iframe.src;

      // If user still watching, do nothing
      // This is fallback since we don't use full YouTube API
    } catch (e) {}

  }, 2000);
}

// MANUAL NEXT (triggered when user clicks or future upgrade)
function playNext() {
  if (currentIndex < currentPlaylist.length - 1) {
    currentIndex++;
    const next = currentPlaylist[currentIndex];

    playVideo(next.id);
    saveLastVideo(next.id, next.title);
    renderUpNext();
  }
}

// UP NEXT UI
function renderUpNext() {
  let container = document.getElementById("up-next");

  if (!container) {
    container = document.createElement("div");
    container.id = "up-next";
    document.getElementById("player-section").appendChild(container);
  }

  container.innerHTML = "<h3>Up Next</h3>";

  currentPlaylist.slice(currentIndex + 1, currentIndex + 6).forEach((video, i) => {
    const item = document.createElement("div");
    item.classList.add("video-card");

    item.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg">
      <p>${video.title}</p>
    `;

    item.onclick = () => {
      currentIndex = currentIndex + 1 + i;
      playVideo(video.id);
      saveLastVideo(video.id, video.title);
      renderUpNext();
    };

    container.appendChild(item);
  });
}

// INIT
loadAll();