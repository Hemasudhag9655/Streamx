// ---------- BANNER PLAY BUTTON (NO player.html) ----------
function playMovie(moviePath) {
  const modal = document.getElementById("trailerModal");
  const trailerFrame = document.getElementById("trailerFrame");

  if (!modal || !trailerFrame) return;

  // Add autoplay safely
  const separator = moviePath.includes("?") ? "&" : "?";
  trailerFrame.src = moviePath + separator + "autoplay=1&mute=1";

  modal.style.display = "flex";
}


// ---------- BANNER SLIDER LOGIC ----------
const banners = document.querySelectorAll('.banner-item');
let currentIndex = 0;

function showBanner(index) {
  banners.forEach((banner, i) => {
    const video = banner.querySelector('.banner-video');

    if (i === index) {
      banner.classList.add('active');

      if (video) {
        // Reset video state
        video.pause();
        video.currentTime = 0;
        video.style.opacity = 0;

        // Netflix-style delay before video starts
        setTimeout(() => {
          if (banner.classList.contains('active')) {
            video.play().catch(error => console.log("Autoplay blocked or no src"));
            video.style.opacity = 1;
          }
        }, 2000);
      }
    } else {
      banner.classList.remove('active');
      if (video) {
        video.pause();
        video.style.opacity = 0;
      }
    }
  });
}

// Auto-advance slider every 5 seconds
const autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % banners.length;
  showBanner(currentIndex);
}, 5000);

// Manual Navigation
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn) {
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % banners.length;
    showBanner(currentIndex);
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    showBanner(currentIndex);
  };
}

// ---------- TRAILER MODAL LOGIC ----------
const movies = document.querySelectorAll(".movie-poster");
const modal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");
const closeBtn = document.querySelector(".close");

movies.forEach(movie => {
  movie.addEventListener("click", () => {
    const url = movie.dataset.trailer;
    if (url && modal && trailerFrame) {
      // Logic to check if URL already has '?' to prevent broken links
      const separator = url.includes('?') ? '&' : '?';
      trailerFrame.src = `${url}${separator}autoplay=1&mute=1`;
      modal.style.display = "flex";
    }
  });
});

// Close modal functions
const closeModal = () => {
  if (modal && trailerFrame) {
    modal.style.display = "none";
    trailerFrame.src = ""; // Stops video playback
  }
};

if (closeBtn) closeBtn.onclick = closeModal;

// Close when clicking outside the video
window.onclick = (e) => {
  if (e.target === modal) closeModal();
};

// ---------- ROW SCROLLING ----------
function scrollMovies(direction) {
  // Find the button that was clicked
  const button = event.target;

  // Find the closest section (.row)
  const rowSection = button.closest(".row");

  if (!rowSection) return;

  // Find movies container inside that section
  const moviesRow = rowSection.querySelector(".movies");

  if (!moviesRow) return;

  const scrollAmount = moviesRow.clientWidth * 0.8;

  moviesRow.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}


// ---------- EMAIL VALIDATION (For Landing Pages) ----------
function handleGetStarted() {
  const emailInput = document.getElementById("emailInput");

  if (!emailInput) return;

  const email = emailInput.value.trim();

  // Simple email pattern check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    alert("Email should be given");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // If email is valid → go to home page
  window.location.href = "streamx.html";
}

function scrollTrending(direction) {
  const row = document.getElementById("trendingRow");

  if (!row) return;

  const scrollAmount = row.clientWidth * 0.7;

  row.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

