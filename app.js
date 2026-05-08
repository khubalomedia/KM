const API_KEY = "AIzaSyD6o4Zwpt0Qim-6lLdJ4Ti0gUWJbrMwk-Y";

/* PLAYLISTS */

const playlists = {

  home: "PL8W_paC7-AOtnMN3II9_ukOAeNqBUZsy5",

  talk: "PL8W_paC7-AOtTlt5kzJXexdirvM5HGIHf",

  cartoons: "PL8W_paC7-AOuHLHtxjVGMRaeEVFdqpoix",

  musicvideos: "PL8W_paC7-AOs-YVLrcN1rw_MhozUIoESZ",

  music: "PL8W_paC7-AOvTL0ZF6iSiZhYxpjV1uVGD"

};

async function loadAll() {

  for (const category in playlists) {

    loadPlaylist(
      playlists[category],
      `row-${category}`
    );

  }

}

async function loadPlaylist(id, rowId) {

  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=${id}&key=${API_KEY}`;

  try {

    const res = await fetch(url);

    const data = await res.json();

    displayVideos(data.items, rowId);

  } catch (err) {

    console.log(err);

  }

}

function displayVideos(videos, rowId) {

  const row = document.getElementById(rowId);

  row.innerHTML = "";

  videos.forEach(video => {

    const videoId =
      video.snippet.resourceId.videoId;

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

    };

    row.appendChild(card);

  });

}

function playVideo(
  videoId,
  title = "",
  description = ""
) {

  const player =
    document.getElementById("video-player");

  player.src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  document.getElementById(
    "video-title"
  ).innerText = title;

  document.getElementById(
    "video-description"
  ).innerText =
    description || "No description available.";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

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

loadAll();

/* AUTH SYSTEM */

let isLogin = true;

const authModal =
  document.getElementById("authModal");

const authTitle =
  document.getElementById("authTitle");

const switchAuth =
  document.getElementById("switchAuth");

document
  .getElementById("loginBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Login";

    isLogin = true;

  });

document
  .getElementById("registerBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Register";

    isLogin = false;

  });

document
  .getElementById("bottomRegisterBtn")
  .addEventListener("click", () => {

    authModal.classList.remove("hidden");

    authTitle.innerText = "Register";

    isLogin = false;

  });

switchAuth.addEventListener("click", () => {

  isLogin = !isLogin;

  authTitle.innerText =
    isLogin ? "Login" : "Register";

  switchAuth.innerText =
    isLogin
      ? "Don't have an account? Register"
      : "Already have an account? Login";

});

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

      alert(error.message);

    }

  });

auth.onAuthStateChanged(user => {

  const authButtons =
    document.querySelector(".auth-buttons");

  if (user) {

    document.querySelector(".logo").innerText =
      `BaloTV • ${user.email}`;

    authButtons.style.display = "none";

  } else {

    document.querySelector(".logo").innerText =
      "BaloTV";

    authButtons.style.display = "flex";

  }

});