//All songs

let AllSongs = [{
        name: "First Song",
        path: "/Media/Audio/Audio 1.wav",
        artist: "Artist 1",
        cover: "/Media/Images/image 1.png"
    },

    {
        name: "Second Song",
        path: "/Media/Audio/Audio 2.wav",
        artist: "Artist 2",
        cover: "/Media/Images/image 2.png"
    },

    {
        name: "Third Song",
        path: "/Media/Audio/Audio 3.wav",
        artist: "Artist 3",
        cover: "/Media/Images/image 3.jpg"
    }
]





//Play-Pause


var rotate = document.getElementById("anim");
var playpause = document.getElementById("playpause");
var isPlaying = false;
var song_index = 0;

//UI Display Elements
var song_name = document.getElementById("name").querySelector("h2");
var artist_name = document.getElementById("art").querySelector("h3");
var cover_image = document.querySelector("#anim");

var track = document.createElement("audio");

function playAnimation() {
    if (rotate.classList.contains("rotate-anim")) {

        rotate.classList.remove("rotate-anim");
        playpause.querySelector("#playpause button i").classList.replace("fa-pause", "fa-play");

    } else {
        rotate.classList.add("rotate-anim");
        playpause.querySelector("#playpause button i").classList.replace("fa-play", "fa-pause");
    }
}

function toPlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        loadMusic(song_index);
        track.play();
        isPlaying = true;
    }
}

playpause.addEventListener("click", function() {

    playAnimation();
    toPlay();
})

function loadMusic(index) {
    song_name.innerText = AllSongs[index].name;
    artist_name.innerText = AllSongs[index].artist;
    track.src = AllSongs[index].path;
    cover_image.src = AllSongs[index].cover;
}

function pauseMusic() {
    track.pause();
    isPlaying = false;
}

//Show volume

// const numericVol = document.getElementById("volume-value");
// const text = document.getElementById("volumeData");

// text.value = numericVol.value;

// numericVol.oninput = (() => {

//     text.value = numericVol.value;
// })


//Next Song

var total_songs = AllSongs.length;
const next = document.getElementById("next");
next.addEventListener("click", function() {

    if (song_index >= total_songs - 1) {
        song_index = 0;
    } else {
        song_index++;
    }
    loadMusic(song_index);
    if (isPlaying) {
        track.play();
        playpause.querySelector("#playpause button i").classList.replace("fa-play", "fa-pause");
    }
})