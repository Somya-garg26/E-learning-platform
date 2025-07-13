console.log("JS file loaded");

let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');




const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}



let viewCommentsBtn = document.getElementById('view-comments-btn');
let commentsList = document.querySelector('.comments-list');

viewCommentsBtn.onclick = () => {
   if (commentsList.style.display === 'none') {
      commentsList.style.display = 'block';
      viewCommentsBtn.innerText = 'hide comments';
   } else {
      commentsList.style.display = 'none';
      viewCommentsBtn.innerText = 'view comments';
   }
};

document.addEventListener("DOMContentLoaded", function () {
   const saveBtn = document.getElementById("save-playlist-btn");

   if (saveBtn) {
      saveBtn.addEventListener("click", function () {
         alert("✅ Playlist has been saved to your profile!");
      });
   } else {
      console.log("❌ Save Playlist button not found.");
   }
});

const message = document.createElement("div");
message.className = "save-msg";
message.textContent = "✅ Playlist Saved!";
saveBtn.after(message);

setTimeout(() => {
   message.remove();
}, 2000);

document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', function () {
    const id = this.getAttribute('data-video-id');
    let watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];
    
    if (!watched.includes(id)) {
      watched.push(id);
      localStorage.setItem('watchedVideos', JSON.stringify(watched));
    }
  });
});


function updateProgress() {
  const watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];
  const totalVideos = document.querySelectorAll('.box').length;
  document.getElementById('playlistProgress').value = watched.length;
  document.getElementById('playlistProgress').max = totalVideos;
}

updateProgress();


// Track watched videos
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', function () {
    const id = this.getAttribute('data-video-id');
    let watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];

    if (!watched.includes(id)) {
      watched.push(id);
      localStorage.setItem('watchedVideos', JSON.stringify(watched));
    }
  });
});

// Calculate and update progress
function updateProgressBar() {
  const totalVideos = document.querySelectorAll('.box').length;
  const watched = JSON.parse(localStorage.getItem('watchedVideos')) || [];
  const watchedCount = watched.length;

  const progress = (watchedCount / totalVideos) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// Call it on page load
updateProgressBar();


document.addEventListener("DOMContentLoaded", () => {
   const searchForm = document.getElementById("search-form");
   const searchInput = document.getElementById("search-input");

   if (searchForm && searchInput) {
      searchForm.addEventListener("submit", function (e) {
         e.preventDefault();
         const query = searchInput.value.toLowerCase().trim();
         if (query) {
            localStorage.setItem("searchQuery", query);
            window.location.href = "courses.html";
         }
      });
   }

   const courseBoxes = document.querySelectorAll(".courses .box");
   const query = localStorage.getItem("searchQuery");

   if (courseBoxes.length && query) {
      let matchFound = false;
      courseBoxes.forEach((box) => {
         const title = box.querySelector(".title").textContent.toLowerCase();
         if (title.includes(query)) {
            box.style.display = "block";
            matchFound = true;
         } else {
            box.style.display = "none";
         }
      });

      if (!matchFound) {
         const noResult = document.createElement("h3");
         noResult.textContent = "No courses found.";
         noResult.style.textAlign = "center";
         noResult.style.marginTop = "2rem";
         document.querySelector(".courses .box-container").appendChild(noResult);
      }

      localStorage.removeItem("searchQuery");
   }
});

document.addEventListener("DOMContentLoaded", () => {
   const searchForm = document.getElementById("search-form");
   const searchInput = document.getElementById("search-input");

   // Save search query and redirect
   if (searchForm && searchInput) {
      searchForm.addEventListener("submit", (e) => {
         e.preventDefault();
         const query = searchInput.value.trim().toLowerCase();
         if (query) {
            localStorage.setItem("searchQuery", query);
            window.location.href = "courses.html";
         }
      });
   }

   // On courses.html — filter courses by query
   const boxContainer = document.querySelector(".courses .box-container");
   const allCourses = document.querySelectorAll(".courses .box");
   const query = localStorage.getItem("searchQuery");

   if (query && allCourses.length) {
      let match = false;
      allCourses.forEach((course) => {
         const title = course.querySelector(".title").textContent.toLowerCase();
         if (title.includes(query)) {
            course.style.display = "block";
            match = true;
         } else {
            course.style.display = "none";
         }
      });

      if (!match) {
         const msg = document.createElement("h3");
         msg.textContent = "No matching courses found.";
         msg.style.textAlign = "center";
         msg.style.marginTop = "2rem";
         boxContainer.appendChild(msg);
      }

      localStorage.removeItem("searchQuery");
   }
});










