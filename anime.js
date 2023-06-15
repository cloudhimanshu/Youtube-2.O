// YouTube Data API key
const apiKey = "AIzaSyA9-BWw7UzkAXwc_UoOlNl08KjHZnsrudc";

// Function to fetch recommended videos
function fetchRecommendedVideos() {
  const maxResults = 111; // Number of recommended videos to fetch
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
  const maxResults = 11110; // Number of comments to fetch
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${maxResults}&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const comments = data.items;

        // Clear existing comments container
        document.getElementById("commentsContainer").innerHTML = "";

        comments.forEach((comment) => {
          const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
          const userProfileImageUrl = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;

          // Create comment element
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");

          // Create user image element
          const userImageElement = document.createElement("img");
          userImageElement.src = userProfileImageUrl;
          userImageElement.classList.add("user-image");

          // Create comment text element
          const commentTextElement = document.createElement("p");
          commentTextElement.textContent = commentText;

          // Append user image and comment text elements to the comment element
          commentElement.appendChild(userImageElement);
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

        // Clear existing sidebar container
        document.getElementById("sidebarContainer").innerHTML = "";

        videos.forEach((video) => {
          const videoId = video.id;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create video card for the sidebar
          const cardHtml = `
            <div class="card mb-3">
              <img src="${videoThumbnail}" class="card-img-top" alt="${videoTitle}">
              <div class="card-body">
                <h5 class="card-title">${videoTitle}</h5>
                <button class="btn btn-primary" onclick="watchVideo('${videoId}')">Watch Video</button>
              </div>
            </div>
          `;

          // Append video card to the sidebar container
          document.getElementById("sidebarContainer").innerHTML += cardHtml;
        });
      } else {
        // No recommended videos found
        document.getElementById("sidebarContainer").innerHTML = "No recommended videos found.";
      }
    })
    .catch((error) => {
      console.log("Error fetching recommended videos for sidebar:", error);
    });
     const currentVideoId = "YOUR_CURRENT_VIDEO_ID";
    fetchRecommendedVideosForSidebar(currentVideoId);
}

// Function to watch video
function watchVideo(videoId) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  // Replace the existing video container with the new video iframe
  document.getElementById("videoContainer").innerHTML = `
    <div class="row">
      <div class="col-md-9">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
        </div>
      </div>
      <div class="col-md-3">
        <div id="sidebarContainer">
          <!-- Recommended videos will be dynamically added here -->
        </div>
      </div>
    </div>
  `;

  // Fetch comments for the video
  fetchVideoComments(videoId);

  // Fetch recommended videos for the sidebar
  fetchRecommendedVideosForSidebar();
}

// Fetch recommended videos on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchRecommendedVideos();
});