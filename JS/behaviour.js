//All songs

let AllSongs = [{
        name: "Hymn For the Weekend",
        path: "/Media/Audio/Audio 1.mp3",
        artist: "ColdPlay",
        cover: "/Media/Images/image 1.jpg"
    },

    {
        name: "Make Me Move",
        path: "/Media/Audio/Audio 2.mp3",
        artist: "Culture Code - Karra [NCS Release]",
        cover: "/Media/Images/image 2.jpg"
    },

    {
        name: "All Of Me",
        path: "/Media/Audio/Audio 3.mp3",
        artist: "John Legend",
        cover: "/Media/Images/image 3.jpg"
    },

    {
        name: "On and On",
        path: "/Media/Audio/Audio 4.mp3",
        artist: "Cartoon Ft. Daniel Levi",
        cover: "/Media/Images/image 4.jpg"
    },

    {
        name: "2002",
        path: "/Media/Audio/Audio 5.mp3",
        artist: "Anne Marie",
        cover: "/Media/Images/image 5.jpg"
    }
]

var track = document.createElement("audio");
track.src = AllSongs[0].path;



//Play-Pause


var rotate = document.getElementById("anim");
var playpause = document.getElementById("playpause");
var isPlaying = false;
var song_index = 0;


//UI Display Elements
var song_name = document.getElementById("name").querySelector("h2");
var artist_name = document.getElementById("art").querySelector("h3");
var cover_image = document.querySelector("#anim");

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
    track.load();
    cover_image.src = AllSongs[index].cover;
}

function pauseMusic() {
    track.pause();
    isPlaying = false;
}


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

//Prev Song

const previous = document.getElementById("prev");
previous.addEventListener("click", function() {

    if (song_index <= 0) {
        song_index = total_songs - 1;
    } else {
        song_index--;
    }
    loadMusic(song_index);
    if (isPlaying) {
        track.play();
        playpause.querySelector("#playpause button i").classList.replace("fa-play", "fa-pause");
    }
})

//changing volume
const showVol = document.getElementById("sound-percent");
const volume_input = document.getElementById("volume-value");
showVol.innerText = volume_input.value;
track.volume = (volume_input.value) / 100;

function volumeChange() {
    showVol.innerText = volume_input.value;
    if (volume_input.value == 0) {
        showVol.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }
    track.volume = (volume_input.value) / 100;
}

//volume change buttons
var increase_vol = document.getElementById("positive");
var decrease_vol = document.getElementById("negative");

function increaseVol() {
    var vol = volume_input.value;
    vol++;
    volume_input.value = vol;
    showVol.innerText = vol;
    track.volume = vol / 100;
}

function decreaseVol() {
    var vol = volume_input.value;
    if (volume_input.value == 0) {
        showVol.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        vol = 0;
    } else {
        vol--;
        showVol.innerText = vol;
    }
    volume_input.value = vol;
    track.volume = vol / 100;
}

//Progress bar
const prog_bar = document.getElementById("progress");

const floor = document.getElementById("floor");
const ceiling = document.getElementById("ceiling");

track.addEventListener("loadeddata", () => {
    //ceiling
    if (parseInt(track.duration) >= 60) {
        var mm = parseInt(track.duration / 60);
        var ss = parseInt(track.duration % 60);
        if (mm >= 10) {
            if (ss >= 10) {
                ceiling.innerText = `${mm}:${ss}`;
            } else {
                ceiling.innerText = `${mm}:0${ss}`;
            }
        } else {
            if (ss >= 10) {
                ceiling.innerText = `0${mm}:${ss}`;
            } else {
                ceiling.innerText = `0${m}:0${ss}`;
            }
        }
    } else {
        var ss = parseInt(track.duration);
        if (ss >= 10) {
            ceiling.innerText = `00:${ss}`;
        } else {
            ceiling.innerText = `00:0${ss}`;
        }
    }
    setInterval(() => {
        //floor
        if (parseInt(track.currentTime) >= 60) {
            var m = parseInt(track.currentTime / 60);
            var s = parseInt(track.currentTime % 60);
            if (m >= 10) {
                if (s >= 10) {
                    floor.innerText = `${m}:${s}`;
                } else {
                    floor.innerText = `${m}:0${s}`;
                }

            } else {
                if (s >= 10) {
                    floor.innerText = `0${m}:${s}`;
                } else {
                    floor.innerText = `0${m}:0${s}`;
                }
            }

        } else {
            var s = parseInt(track.currentTime);
            if (s >= 10) {
                floor.innerText = `00:${s}`;
            } else {
                floor.innerText = `00:0${s}`;
            }
        }

        prog_bar.value = track.currentTime * (100 / track.duration);
        if (prog_bar.value == 100) {

            //Autoplay After the full song
            if (isAuto) {
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
            } else {
                pauseMusic();
                prog_bar.value = 0;
                rotate.classList.remove("rotate-anim");
                playpause.querySelector("#playpause button i").classList.replace("fa-pause", "fa-play");
            }
        }
    }, 500);


});

function duration_change() {
    track.currentTime = track.duration * (prog_bar.value / 100)
}

//Autoplay trigger

const autoPlay = document.getElementById("auto-play");
var isAuto = false;

function auto() {

    isAuto = !isAuto;

}

//key binding

window.addEventListener("keydown", (key) => {

    if (key.keyCode == 32) {
        playpause.click();
    }

    if (key.keyCode == 37) {
        previous.click();
    }

    if (key.keyCode == 39) {
        next.click();
    }
});