const API_KEY = "AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y";
const CHANNEL_ID = "UC5reF0zkdOnB3GEpVqNJfHw";

/* PLAYLISTS */

const playlists = {

  home: "PL8W_paC7-AOtnMN3II9_ukOAeNqBUZsy5",

  talk: "PL8W_paC7-AOtTlt5kzJXexdirvM5HGIHf",

  cartoons: "PL8W_paC7-AOuHLHtxjVGMRaeEVFdqpoix",

  musicvideos: "PL8W_paC7-AOs-YVLrcN1rw_MhozUIoESZ",

  
};

/* LOAD */

async function loadAll() {

  for (const category in playlists) {
    loadPlaylist(playlists[category], `row-${category}`);
  }

  loadContinueWatching();
}

/* LOAD PLAYLIST */

async function loadPlaylist(id, rowId) {

  let allVideos = [];
  let nextPageToken = "";

  try {

    do {

      const url =
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&pageToken=${nextPageToken}&key=${API_KEY}`;

      const res = await fetch(url);

      const data = await res.json();

      allVideos.push(...data.items);

      nextPageToken = data.nextPageToken || "";

    } while (nextPageToken);

    displayVideos(allVideos, rowId);

  } catch (err) {

    console.log(err);

  }

}

/* DISPLAY VIDEOS */

function displayVideos(videos, rowId) {

  const row = document.getElementById(rowId);

  row.innerHTML = "";

  videos.forEach(video => {

    
if (!video.snippet || !video.snippet.resourceId) return;

const videoId = video.snippet.resourceId.videoId;

    const card = document.createElement("div");

    card.className = "video-card";

    card.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}">
      <p>${video.snippet.title}</p>
    `;

    card.onclick = () => {

      playVideo(
        videoId,
        video.snippet.title,
        video.snippet.description
      );

      saveLastVideo(
        videoId,
        video.snippet.title
      );

    };

    row.appendChild(card);

  });

}

/* PLAY VIDEO */

function playVideo(videoId, title = "", description = "") {

  const player =
    document.getElementById("video-player");

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  document.getElementById("video-title").innerText =
    title;

  document.getElementById("video-description").innerText =
    description || "No description available.";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

/* SAVE */

function saveLastVideo(id, title) {

  localStorage.setItem(
    "lastVideo",
    JSON.stringify({ id, title })
  );

}

/* CONTINUE */

function loadContinueWatching() {

  const data =
    JSON.parse(localStorage.getItem("lastVideo"));

  if (!data) return;

  const row =
    document.getElementById("row-continue");

  row.innerHTML = "";

  const card = document.createElement("div");

  card.className = "video-card";

  card.innerHTML = `
    <img src="https://img.youtube.com/vi/${data.id}/mqdefault.jpg">
    <p>${data.title}</p>
  `;

  card.onclick = () => {
    playVideo(data.id);
  };

  row.appendChild(card);

}

/* CATEGORY SWITCHING */

const buttons =
  document.querySelectorAll(".category-btn");

const sections =
  document.querySelectorAll(".category-section");

buttons.forEach(button => {

  button.addEventListener("click", () => {

    buttons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const category =
      button.dataset.category;

    sections.forEach(section =>
      section.classList.add("hidden")
    );

    document
      .getElementById(`section-${category}`)
      .classList.remove("hidden");

  });

});

/* SEARCH */

document
  .getElementById("searchInput")
  .addEventListener("input", function () {

    const value =
      this.value.toLowerCase();

    const cards =
      document.querySelectorAll(".video-card");

    cards.forEach(card => {

      const text =
        card.innerText.toLowerCase();

      card.style.display =
        text.includes(value)
          ? "block"
          : "none";

    });

  });

/* START */

loadAll();



<>
  /* AUTH SYSTEM */
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script></>


let isLogin = true;

const authModal =
  document.getElementById("authModal");

const authTitle =
  document.getElementById("authTitle");

const switchAuth =
  document.getElementById("switchAuth");

/* LOGIN BUTTON */

document
  .getElementById("loginBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Login";

    isLogin = true;

  });

/* REGISTER BUTTON */

document
  .getElementById("registerBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Register";

    isLogin = false;

  });

/* BOTTOM REGISTER BUTTON */

document
  .getElementById("bottomRegisterBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Register";

    isLogin = false;

  });

/* SWITCH */

switchAuth.addEventListener("click", () => {

  isLogin = !isLogin;

  authTitle.innerText =
    isLogin ? "Login" : "Register";

  switchAuth.innerText =
    isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";

});

/* SUBMIT */

document
  .getElementById("authSubmit")
  .addEventListener("click", async () => {

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value.trim();

    if (!email || !password) {

      alert("Please fill in all fields");

      return;

    }

    try {

      if (isLogin) {

        await auth.signInWithEmailAndPassword(
          email,
          password
        );

        alert("Logged in successfully!");

      } else {

        await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        alert("Account created successfully!");

      }

      authModal.classList.add("hidden");

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  });

/* FORGOT PASSWORD */

document
  .getElementById("forgotPassword")
  .addEventListener("click", async () => {

    const email =
      document.getElementById("email").value.trim();

    if (!email) {

      alert("Enter your email");

      return;

    }

    try {

      await auth.sendPasswordResetEmail(email);

      alert("Password reset email sent!");

    } catch (error) {

      alert(error.message);

    }

  });

/* AUTH STATE */

auth.onAuthStateChanged(user => {

  if (user) {

    document.querySelector(".logo").innerText =
      `BaloTV • ${user.email}`;

  } else {

    document.querySelector(".logo").innerText =
      "BaloTV";

  }

});


auth.onAuthStateChanged(user => {

  if (user) {

    document.querySelector(".logo").innerText =
      `BaloTV • ${user.email}`;

  }

});



const firebaseConfig = {

  apiKey: "AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y",

  authDomain: "balotv-d9c1d.firebaseapp.com",

  projectId: "balotv-d9c1d",

  storageBucket: "balotv-d9c1d.firebasestorage.app",

  messagingSenderId: "96925959779",

  appId: "1:96925959779:web:ed8cef5de90a0f410ada56"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

auth.setPersistence(
  firebase.auth.Auth.Persistence.LOCAL
);