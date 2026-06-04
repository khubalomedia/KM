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

const postImage =
document.getElementById("postImage")

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

const editProfileBtn =
document.getElementById("editProfileBtn")

const profileModal =
document.getElementById("profileModal")

const closeProfile =
document.getElementById("closeProfile")

const newUsername =
document.getElementById("newUsername")

const saveProfileBtn =
document.getElementById("saveProfileBtn")

const avatarUpload =
document.getElementById("avatarUpload")

function toggleComments(postId){

  const box =
  document.getElementById(
    `all-comments-${postId}`
  )

  if(box.style.display === "none"){
    box.style.display = "block"
  }else{
    box.style.display = "none"
  }

}


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

    avatarPreview.style.display =
    "block"
  
    loginBtn.style.display =
    "none"
  
    registerBtn.style.display =
    "none"
  
    logoutBtn.style.display =
    "inline-block"

    editProfileBtn.style.display =
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

    editProfileBtn.style.display =
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

  let imageUrl = ""

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

  if (
    postImage.files &&
    postImage.files[0]
  ) {
  
    const file =
    postImage.files[0]
  
    const filePath =
    `${currentUser.id}/${Date.now()}_${file.name}`
  
    const {
      error: uploadError
    } =
    await supabaseClient
    .storage
    .from("posts")
    .upload(filePath, file)
  
    if(uploadError){
      alert(uploadError.message)
      return
    }
  
    const { data } =
    supabaseClient
    .storage
    .from("posts")
    .getPublicUrl(filePath)
  
    imageUrl =
    data.publicUrl
  
  }
  
  const { error } =
  await supabaseClient
  .from("posts")
  .insert([
  {
    user_id: currentUser.id,
    username: profile?.username || currentUser.email,
    avatar_url: profile?.avatar_url || "",
    content: content,
    image_url: imageUrl,
    likes: 0
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



//LIKES

async function likePost(postId){

  

  const {
    data: post,
    error: fetchError
  } =
  await supabaseClient
  .from("posts")
  .select("likes")
  .eq("id", postId)
  .single()

  if(fetchError){
    alert(fetchError.message)
    return
  }

  const {
    error
  } =
  await supabaseClient
  .from("posts")
  .update({
    likes: (post.likes || 0) + 1
  })
  .eq("id", postId)

  if(error){
    alert(error.message)
    return
  }

  loadPosts()
}


//COMMENTS

async function addComment(postId){

  if(!currentUser){
    alert("Login first")
    return
  }

  const input =
  document.getElementById(
    `comment-${postId}`
  )

  const text =
  input.value.trim()

  if(!text) return

  const {
    data: profile
  } =
  await supabaseClient
  .from("profiles")
  .select("username")
  .eq("id", currentUser.id)
  .single()

  await supabaseClient
  .from("comments")
  .insert([
    {
      post_id: postId,
      username: profile.username,
      content: text
    }
  ])


  const commentsBox =
document.querySelector(
  `#comment-${postId}`
).parentElement.querySelector(
  ".comments"
)

commentsBox.innerHTML += `
<div class="comment">
  <b>${profile.username}</b>
  <span>${text}</span>
</div>
`

input.value = ""

  

}

function timeAgo(date){

  const seconds =
  Math.floor(
    (new Date() - new Date(date))
    / 1000
  )

  let interval =
  Math.floor(seconds / 31536000)

  if(interval > 1)
    return interval + "y ago"

  interval =
  Math.floor(seconds / 2592000)

  if(interval > 1)
    return interval + "mo ago"

  interval =
  Math.floor(seconds / 86400)

  if(interval > 1)
    return interval + "d ago"

  interval =
  Math.floor(seconds / 3600)

  if(interval > 1)
    return interval + "h ago"

  interval =
  Math.floor(seconds / 60)

  if(interval > 1)
    return interval + "m ago"

  return "Just now"
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
  .order("created_at", {
    ascending: false
  })
  

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

  for (const post of data) {

    const {
      data: comments
    } = await supabaseClient
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", {
        ascending: true
      })

    postsContainer.innerHTML += `
    <div class="feed-post">
    
      <div class="post-header">
    
    <img
       src="${post.avatar_url || 'images/default-avatar.png'}"
       class="post-avatar"
    >

    <h3>
       ${post.username}
   </h3>
    
      </div>


   <div class="feed-time">
     ${ timeAgo(post.created_at)}
  </div>


  ${
    currentUser &&
    currentUser.id === post.user_id
    ?
    `
    <button
      type="button"
      onclick="deletePost('${post.id}')"
      class="delete-btn"
    >
      🗑 Delete
    </button>
    `
    :
    ""
  }





<p>
  ${post.content}
</p>

${
  post.image_url
  ?
  `<img
    src="${post.image_url}"
    class="feed-image"
  >`
  :
  ""
}



<div class="feed-actions">

<button
  type="button"
  onclick="likePost('${post.id}')"
  class="action-btn"
>
  ❤️ ${post.likes || 0} Likes
</button>


<div class="comments">
${
  comments?.slice(0,1).map(comment => `
      <div class="comment">
        <b>${comment.username}</b>
        <span>${comment.content}</span>
      </div>
  `).join("") || ""
}
</div>



<input
  id="comment-${post.id}"
  placeholder="Write a comment..."
>

<button
  onclick="addComment('${post.id}')"
  class="comment-btn"
>
  💬 Comment
</button>


</div>




</div>

    
    </div>
    `

  }

}


async function deletePost(postId){

  if(
    !confirm(
      "Delete this post?"
    )
  ) return

  const { error } =
  await supabaseClient
  .from("posts")
  .delete()
  .eq("id", postId)

  if(error){
    alert(error.message)
    return
  }

  loadPosts()
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


editProfileBtn.addEventListener(
  "click",
  openProfileModal
)

closeProfile.addEventListener(
  "click",
  closeProfileModal
)

saveProfileBtn.addEventListener(
  "click",
  saveProfile
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
  .from("Avatars")
  .upload(filePath, file)

  if (uploadError) {
    alert(uploadError.message)
    return
  }

  const { data } =
  supabaseClient.storage
  .from("Avatars")
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
  
  // Update all old posts too


  await supabaseClient
  .from("profiles")
  .update({
    avatar_url: avatarUrl
  })
  .eq("id", currentUser.id)


  const { error: postError } =
  await supabaseClient
  .from("posts")
  .update({
    username: username,
    avatar_url:
      avatarUrl || avatarPreview.src
  })
  .eq("user_id", currentUser.id)
  
  if (postError) {
    alert(postError.message)
    return
  }

  avatarPreview.src =
  avatarUrl

  alert("Profile picture updated!")
}


function openProfileModal(){

  profileModal.classList.add(
    "show"
  )

}

function closeProfileModal(){

  profileModal.classList.remove(
    "show"
  )

}



async function saveProfile(){

  const username =
  newUsername.value.trim()

  if(!username){

    alert("Enter username")

    return

  }

  let avatarUrl = null

  // Upload avatar if selected
  if(
    avatarUpload.files &&
    avatarUpload.files[0]
  ){

    const file =
    avatarUpload.files[0]

    const fileName =
    `${currentUser.id}-${Date.now()}`

    const {
      error: uploadError
    } =
    await supabaseClient
    .storage
    .from("Avatars")
    .upload(
      fileName,
      file,
      {
        upsert:true
      }
    )

    if(uploadError){

      alert(uploadError.message)

      return

    }

    const {
      data
    } =
    supabaseClient
    .storage
    .from("Avatars")
    .getPublicUrl(fileName)

    avatarUrl =
    data.publicUrl

  }

  const updateData = {
    username: username
  }

  if(avatarUrl){

    updateData.avatar_url =
    avatarUrl

  }

  const {
    error
  } =
  await supabaseClient
    .from("profiles")
    .update(updateData)
    .eq("id", currentUser.id)
  
  if(error){
    alert(error.message)
    return
  }

  await checkUser()

  await loadPosts()

  closeProfileModal()

  alert(
    "Profile updated!"
  )

}


// START
checkUser()
loadPosts()