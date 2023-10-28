// YouTube Data API key
const apiKey = "AIzaSyCRgGjLgkVWhuce0BI5Sa8WNbaLaP3N-Ts";
const searchInput = document.getElementById("searchInput");

// Add an event listener for the "keydown" event on the search input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // If the "Enter" key is pressed, call the searchVideos function
    searchVideos();
  }
});

// Function to fetch recommended videos
function fetchRecommendedVideos() {
  const maxResults = 100; // Number of recommended videos to fetch
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videos = data.items;

        // Clear existing video container
        document.getElementById("videoContainer").innerHTML = "";

        videos.forEach((video) => {
          const videoId = video.id;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create video card
          const cardHtml = `
            <div class="col-md-3">
              <div class="card">
                <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
                <div class="card-body">
                  <h5 class="card-title">${videoTitle}</h5>
                  <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
                </div>
              </div>
            </div>
          `;

          // Append video card to the container
          document.getElementById("videoContainer").innerHTML += cardHtml;
        });
      } else {
        // No recommended videos found
        document.getElementById("videoContainer").innerHTML = "No recommended videos found.";
      }
    })
    .catch((error) => {
      console.log("Error fetching recommended videos:", error);
    });
}
function searchVideos() {
  const searchInput = document.getElementById("searchInput").value.trim();
  if (searchInput === "") {
    alert("Please enter a search query");
    return;
  }

  const maxResults = 100; // Number of search results to fetch
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchInput}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videos = data.items;

        // Clear existing video container
        document.getElementById("videoContainer").innerHTML = "";

        videos.forEach((video) => {
          const videoId = video.id.videoId;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create video card
          const cardHtml = `
            <div class="col-md-3">
              <div class="card">
                <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
                <div class="card-body">
                  <h5 class="card-title">${videoTitle}</h5>
                  <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
                </div>
              </div>
            </div>
          `;

          // Append video card to the container
          document.getElementById("videoContainer").innerHTML += cardHtml;
        });
      } else {
        // No search results found
        document.getElementById("videoContainer").innerHTML = "No search results found.";
      }
    })
    .catch((error) => {
      console.log("Error searching for videos:", error);
    });
}

// Function to fetch comments for a video
function fetchVideoComments(videoId) {
  const maxResults = 100; // Number of comments to fetch
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const comments = data.items;

        // Clear existing comments container
        document.getElementById("commentsContainer").innerHTML = "<h1>Comment Section</h1>";

        comments.forEach((comment) => {
          const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
          const userProfileImageUrl = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
          const authorDisplayName = comment.snippet.topLevelComment.snippet.authorDisplayName; // Add this line

          // Create comment element
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");

          // Create user image element
          const userImageElement = document.createElement("img");
          userImageElement.src = userProfileImageUrl;
          userImageElement.classList.add("user-image");

          // Create username element
          const userNameElement = document.createElement("p");
          userNameElement.textContent = `${authorDisplayName}`;
          userNameElement.classList.add("user-name"); // Add a class for styling

          // Create comment text element
          const commentTextElement = document.createElement("p");
          commentTextElement.textContent = commentText;

          // Append user image, username, and comment text elements to the comment element
          commentElement.appendChild(userImageElement);
          commentElement.appendChild(userNameElement);
          commentElement.appendChild(commentTextElement);

          // Append comment element to the container
          document.getElementById("commentsContainer").appendChild(commentElement);
        });
      } else {
        // No comments found
        document.getElementById("commentsContainer").innerHTML = "No comments found.";
      }
    })
    .catch((error) => {
      console.log("Error fetching comments:", error);
    });
}


// Function to fetch recommended videos for the sidebar
function fetchRecommendedVideosForSidebar() {
  const maxResults = 10; // Number of recommended videos to fetch
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${maxResults}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videos = data.items;

        // Clear the existing sidebar container
        const sidebarContainer = document.getElementById("sidebarContainer");
        sidebarContainer.innerHTML = "";

        videos.forEach((video) => {
          const videoId = video.id;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create a video card for the sidebar
          const cardHtml = `
            <div class="card mb-3">
              <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
              <div class="card-body">
                <h5 class="card-title">${videoTitle}</h5>
                <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
              </div>
            </div>
          `;

          // Append the video card to the sidebar container
          sidebarContainer.innerHTML += cardHtml;
        });
      } else {
        // No recommended videos found
        document.getElementById("sidebarContainer").innerHTML = "No recommended videos found.";
      }
    })
    .catch((error) => {
      console.log("Error fetching recommended videos for sidebar:", error);
    });
}

// Call the fetchRecommendedVideosForSidebar function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchRecommendedVideosForSidebar();
});

function watchVideo(videoId) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  // Replace the existing video container with the new video iframe
  document.getElementById("videoContainer").innerHTML = `
    <div class="col-md-9">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
      </div>
    </div>
  `;

  // Show the sidebar
  const sidebarContainer = document.getElementById("sidebarContainer");
  sidebarContainer.style.display = "block";

  // Show the comments container
  const commentsContainer = document.getElementById("commentsContainer");
  commentsContainer.style.display = "block";

  // Fetch comments for the video
  fetchVideoComments(videoId);

  // Fetch recommended videos for the sidebar
  fetchRecommendedVideosForSidebar();
}



// Fetch recommended videos on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchRecommendedVideos();
});