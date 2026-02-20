const audio = document.getElementById("audio");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const playBtn = document.getElementById("playBtn");

const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const volumeControl = document.getElementById("volumeControl");

const coverImage = document.getElementById("coverImage");


// Playlist
const songs = [
  { title: "O Meri Laila - Radio Version",
     artist: "Joi Barua",
     src: "songs/Joi Barua - O Meri Laila - Radio Version.mp3",
     cover: "covers/LailaMajnu.jpg" },

  { title: "Tum",
    artist: "Atif Aslam",
    src: "songs/Atif Aslam - Tum.mp3",
    cover: "covers/LailaMajnu.jpg" },  
    
  { title: "Aahista",
    artist: "Arijit Singh",
    src: "songs/Arijit Singh - Aahista.mp3",
    cover: "covers/LailaMajnu.jpg" },

  { title: "Hafiz Hafiz",
    artist: "Mohit Chauhan",
    src: "songs/Mohit Chauhan - Hafiz Hafiz.mp3",
    cover: "covers/LailaMajnu.jpg" }
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index) {
  songTitle.textContent = songs[index].title;
  songArtist.textContent = songs[index].artist;
  audio.src = songs[index].src;
  coverImage.src = songs[index].cover;
}



// Play / Pause
function playPause() {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;

  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
}

// Forward 5 sec
function forward5() {
  audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0);
}

// Backward 5 sec
function backward5() {
  audio.currentTime = Math.max(audio.currentTime - 5, 0);
}

// Progress Update
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";

  // Time format
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = duration ? formatTime(duration) : "0:00";
});

// Click Progress Bar Seek
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Auto next when song ends
audio.addEventListener("ended", () => {
  nextSong();
});

// Volume Control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

// Format Time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    playPause();
  }
  if (e.key === "ArrowRight") forward5();
  if (e.key === "ArrowLeft") backward5();
  if (e.key === "ArrowUp") nextSong();
  if (e.key === "ArrowDown") prevSong();
});

// Load first song
loadSong(songIndex);
