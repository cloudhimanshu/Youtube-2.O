// YouTube Data API key
const apiKey = "AIzaSyBExZ6bdiUfjYAIHc4Ginbt9itZ_F_yR1A";

// Fetch YouTube public videos
function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=6&key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videos = data.items;

        videos.forEach((video) => {
          const videoId = video.id;
          const videoTitle = video.snippet.title;
          const videoThumbnail = video.snippet.thumbnails.medium.url;

          // Create video card
          const cardHtml = `
            <div class="col-md-4">
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
      }
    })
    .catch((error) => {
      console.log("Error fetching videos:", error);
    });
}

// Function to watch video
function watchVideo(videoId) {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  // Create modal to watch video
  const modalHtml = `
    <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="videoModalLabel">Watch Video</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to the body
  document.body.innerHTML += modalHtml;

  // Show the modal
  $("#videoModal").modal("show");
}

// Fetch videos on page load
document.addEventListener("DOMContentLoaded", function () {
  fetchVideos();
});
