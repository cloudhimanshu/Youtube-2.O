const toggleSwitch = document.getElementById('toggleSwitch');
const body = document.body;

// Check the user's preference for dark mode
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        toggleSwitch.checked = true;
    }
}

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const verticalMenu = document.getElementById("verticalMenu");
  
    hamburgerMenu.addEventListener("click", function () {
      verticalMenu.classList.toggle("show-vertical-menu");
    });
  });
  

  
  window.addEventListener('error', function (e) {
    // Check if it's a 404 error
    if (e && e.message && e.message.includes('404')) {
      const errorContainer = document.getElementById('errorContainer');
      const errorMessage = document.getElementById('errorMessage');

      // Display the error message in the container
      errorMessage.textContent = '404 - Not Found';
      errorContainer.style.display = 'block';
    }
  });
