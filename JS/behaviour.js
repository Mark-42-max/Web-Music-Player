// Rotate image animation on play and pause rotation on pause


var rotate = document.getElementById("anim");
var playpause = document.getElementById("playpause");

playpause.onclick = function() {

    if (rotate.classList.contains("rotate-anim")) {

        rotate.classList.remove("rotate-anim");
    } else {
        rotate.classList.add("rotate-anim");
    }
}

//Progress bar