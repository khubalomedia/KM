// SUPABASE CONNECTION
const SUPABASE_URL =
"https://lnuznyfumxjrfxtxozhg.supabase.co"

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudXpueWZ1bXhqcmZ4dHhvemhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDU5MjgsImV4cCI6MjA5NTM4MTkyOH0.WxIT5uWCm-Y0UXiWvwTEzU_HCnYTxJoEt9SJFfUhIfo"

const supabaseClient =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)


// HTML ELEMENTS
const contentInput =
document.getElementById("content")

const postBtn =
document.getElementById("postBtn")

const postsContainer =
document.getElementById("posts")

const loginBtn =
document.getElementById("loginBtn")

const registerBtn =
document.getElementById("registerBtn")

const logoutBtn =
document.getElementById("logoutBtn")

const userLabel =
document.getElementById("userLabel")


const authModal =
document.getElementById("authModal")

const authTitle =
document.getElementById("authTitle")

const authUsername =
document.getElementById("authUsername")

const authEmail =
document.getElementById("authEmail")

const authPassword =
document.getElementById("authPassword")

const authSubmit =
document.getElementById("authSubmit")

const closeAuth =
document.getElementById("closeAuth")

let authMode = "login"

const avatarBtn =
document.getElementById("avatarBtn")

const avatarInput =
document.getElementById("avatarInput")

const avatarPreview =
document.getElementById("avatarPreview")



// AUTH STATE
let currentUser = null


// CHECK USER
async function checkUser() {

  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  currentUser = user

  if (user) {

    const {
      data: profile,
      error: profileError
    } =
    await supabaseClient
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single()
  
    userLabel.innerText =
    profile?.username || user.email
    
    avatarPreview.style.display =
    "block"

    avatarPreview.src =
    profile?.avatar_url ||
    "images/default-avatar.png"
  
    loginBtn.style.display =
    "none"
  
    registerBtn.style.display =
    "none"
  
    logoutBtn.style.display =
    "inline-block"
  
  } else {

    userLabel.innerText =
    "Guest"

    avatarPreview.style.display =
    "none"

    loginBtn.style.display =
    "inline-block"

    registerBtn.style.display =
    "inline-block"

    logoutBtn.style.display =
    "none"

  }

}


// REGISTER
async function register() {

  const username =
  prompt("Choose Username")

  if (!username) return

  const email =
  prompt("Email")

  if (!email) return

  const password =
  prompt("Password")

  if (!password) return

  const {
    data,
    error
  } =
  await supabaseClient.auth.signUp({
    email,
    password
  })

  if (error) {

    alert(error.message)

    return

  }

  if (data.user) {

    const {
      error: profileError
    } =
    await supabaseClient
    .from("profiles")
    .insert([
      {
        id: data.user.id,
        username: username
      }
    ])

    if (profileError) {

      console.error(profileError)

      alert(profileError.message)

      return

    }

  }

  await supabaseClient.auth
  .signInWithPassword({
    email,
    password
  })

  await checkUser()

  alert("Welcome to BaloTV!")

}

// LOGIN
async function login() {

  const email =
  prompt("Email")

  if (!email) return

  const password =
  prompt("Password")

  if (!password) return

  const { error } =
  await supabaseClient.auth
  .signInWithPassword({
    email,
    password
  })

  if (error) {

    alert(error.message)

    return

  }

  await checkUser()

}


// LOGOUT
async function logout() {

  await supabaseClient.auth.signOut()

  await checkUser()

}


// CREATE POST
async function createPost() {

  if (!currentUser) {

    alert(
      "Please login first"
    )

    return

  }

  const content =
  contentInput.value.trim()

  if (!content) {

    alert(
      "Enter a post"
    )

    return

  }

  postBtn.disabled = true

  postBtn.innerText =
  "Posting..."

  const {
    data: profile
  } =
  await supabaseClient
  .from("profiles")
  .select("username, avatar_url")
  .eq("id", currentUser.id)
  .single()
  
  const { error } =
  await supabaseClient
  .from("posts")
  .insert([
    {
      user_id: currentUser.id,
      username: profile?.username || currentUser.email,
      avatar_url: profile?.avatar_url || "",
      content: content
    }
  ])

  postBtn.disabled = false

  postBtn.innerText =
  "Post"

  if (error) {

    console.error(error)
  
    alert(
      JSON.stringify(error)
    )
  
    return
  
  }

  contentInput.value = ""

  loadPosts()

}


// LOAD POSTS
async function loadPosts() {

  postsContainer.innerHTML =
  "<p>Loading...</p>"

  const {
    data,
    error
  } =
  await supabaseClient
  .from("posts")
  .select("*")
  .order(
    "created_at",
    {
      ascending:false
    }
  )

  if (error) {

    postsContainer.innerHTML =
    "<p>Failed to load posts</p>"

    return

  }

  postsContainer.innerHTML = ""

  if (!data.length) {

    postsContainer.innerHTML =
    "<p>No posts yet</p>"

    return

  }

  data.forEach(post => {

    postsContainer.innerHTML += `
    <div class="feed-post">
    
      <div class="post-header">
    
        <img
          src="${post.avatar_url || 'https://via.placeholder.com/50'}"
          class="post-avatar"
        >
    
        <h3>
          ${post.username}
        </h3>
    
      </div>
    
      <p>
        ${post.content}
      </p>
    
    </div>
    `

  })

}


// MENU
function toggleMenu() {

  const menu =
  document.getElementById(
    "dropdownMenu"
  )

  menu.classList.toggle(
    "show"
  )

}


// CLOSE MENU
document.addEventListener(
  "click",
  function(event){

    const menu =
    document.getElementById(
      "dropdownMenu"
    )

    const menuBtn =
    document.querySelector(
      ".menu-btn"
    )

    if (
      menu &&
      menuBtn &&
      !menu.contains(
        event.target
      ) &&
      !menuBtn.contains(
        event.target
      )
    ) {

      menu.classList.remove(
        "show"
      )

    }

  }
)


// EVENTS

postBtn.addEventListener(
  "click",
  createPost
)

loginBtn.addEventListener(
  "click",
  openLogin
)

registerBtn.addEventListener(
  "click",
  openRegister
)

authSubmit.addEventListener(
  "click",
  submitAuth
)

closeAuth.addEventListener(
  "click",
  closeModal
)

logoutBtn.addEventListener(
  "click",
  logout
)


avatarBtn.addEventListener(
  "click",
  () => avatarInput.click()
)

avatarInput.addEventListener(
  "change",
  uploadAvatar
)



// functions

function openLogin(){

  authMode = "login"

  authTitle.innerText =
  "Login"

  authUsername.style.display =
  "none"

  authModal.classList.add(
    "show"
  )

}

function openRegister(){

  authMode = "register"

  authTitle.innerText =
  "Create Account"

  authUsername.style.display =
  "block"

  authModal.classList.add(
    "show"
  )

}

function closeModal(){

  authModal.classList.remove(
    "show"
  )

  authUsername.value = ""
  authEmail.value = ""
  authPassword.value = ""

}


async function submitAuth(){

  const email =
  authEmail.value.trim()

  const password =
  authPassword.value.trim()

  if(!email || !password){
    alert("Fill all fields")
    return
  }

  if(authMode === "login"){

    const { error } =
    await supabaseClient.auth
    .signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
      return
    }

    await checkUser()

    closeModal()

    return

  }

  const username =
  authUsername.value.trim()

  if(!username){
    alert("Choose a username")
    return
  }

  const {
    data,
    error
  } =
  await supabaseClient.auth.signUp({
    email,
    password
  })

  if(error){
    alert(error.message)
    return
  }

  await supabaseClient
  .from("profiles")
  .insert([
    {
      id:data.user.id,
      username:username
    }
  ])

  await supabaseClient.auth
  .signInWithPassword({
    email,
    password
  })

  await checkUser()

  closeModal()

}


async function uploadAvatar() {

  if (!currentUser) {
    alert("Login first")
    return
  }

  const file =
  avatarInput.files[0]

  if (!file) return

  const filePath =
  `${currentUser.id}/${Date.now()}_${file.name}`

  const { error: uploadError } =
  await supabaseClient.storage
  .from("avatars")
  .upload(filePath, file)

  if (uploadError) {
    alert(uploadError.message)
    return
  }

  const { data } =
  supabaseClient.storage
  .from("avatars")
  .getPublicUrl(filePath)

  const avatarUrl =
  data.publicUrl

  const { error } =
  await supabaseClient
  .from("profiles")
  .update({
    avatar_url: avatarUrl
  })
  .eq("id", currentUser.id)

  if (error) {
    alert(error.message)
    return
  }

  avatarPreview.src =
  avatarUrl

  alert("Profile picture updated!")
}


// START
checkUser()
loadPosts()