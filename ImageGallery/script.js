const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const filterButtons = document.querySelectorAll(".filter-btn");
const imageBoxes = document.querySelectorAll(".image-box");
const likeButtons = document.querySelectorAll(".like-btn");

let currentIndex = 0;

// favourites array localStorage se load hoga
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// ---------------- LIGHTBOX FUNCTION ----------------
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = imageBoxes[currentIndex].querySelector("img").src;
}

// Open lightbox on image click
imageBoxes.forEach((box, index) => {
  box.querySelector("img").addEventListener("click", () => {
    openLightbox(index);
  });
});

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % imageBoxes.length;
  lightboxImg.src = imageBoxes[currentIndex].querySelector("img").src;
});

// Previous image
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + imageBoxes.length) % imageBoxes.length;
  lightboxImg.src = imageBoxes[currentIndex].querySelector("img").src;
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % imageBoxes.length;
      lightboxImg.src = imageBoxes[currentIndex].querySelector("img").src;
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + imageBoxes.length) % imageBoxes.length;
      lightboxImg.src = imageBoxes[currentIndex].querySelector("img").src;
    }
    if (e.key === "Escape") {
      lightbox.style.display = "none";
    }
  }
});

// ---------------- LIKE FUNCTION ----------------
function updateLikeButtons() {
  imageBoxes.forEach((box) => {
    const imgSrc = box.querySelector("img").src;
    const btn = box.querySelector(".like-btn");

    if (favourites.includes(imgSrc)) {
      btn.classList.add("liked");
      btn.innerHTML = "♥";
    } else {
      btn.classList.remove("liked");
      btn.innerHTML = "♡";
    }
  });
}

// Like button click
likeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // lightbox open na ho

    const imgSrc = btn.parentElement.querySelector("img").src;

    if (favourites.includes(imgSrc)) {
      favourites = favourites.filter(item => item !== imgSrc);
    } else {
      favourites.push(imgSrc);
    }

    localStorage.setItem("favourites", JSON.stringify(favourites));
    updateLikeButtons();
  });
});

// ---------------- FILTER FUNCTION ----------------
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const category = btn.dataset.category;

    imageBoxes.forEach((box) => {
      const imgSrc = box.querySelector("img").src;

      if (category === "all") {
        box.style.display = "block";
      }
      else if (category === "liked") {
        if (favourites.includes(imgSrc)) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
      else {
        if (box.dataset.category === category) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    });

  });
});

// First load update
updateLikeButtons();
