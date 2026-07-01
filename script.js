// Get Elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Songs List
const songs = [
    {
        name: "Song Title 1",
        artist: "Artist 1",
        src: "songs/song1.mp3"
    },
    {
        name: "Song Title 2",
        artist: "Artist 2",
        src: "songs/song2.mp3"
    }
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(index) {
    title.textContent = songs[index].name;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;
}

// Play Song
function playSong() {
    audio.play();
    playBtn.innerHTML = "⏸";
    isPlaying = true;
}

// Pause Song
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "▶";
    isPlaying = false;
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

// Play / Pause Button
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Next & Previous Buttons
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress Bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Seek Song
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Auto Play Next Song
audio.addEventListener("ended", nextSong);

// Load First Song
loadSong(songIndex);
