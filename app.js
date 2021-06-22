window.onload = () => {
    //declare variables
    const FPS = 60;
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    let md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {

        document.getElementsByClassName("o-pad")[0].style.display = "inline-block";
    }

    //array of dvd logo colors
    let img = new Image(), arrImages = ["dvdLogo1.png", "dvdLogo2.png", "dvdLogo3.png", "dvdLogo4.png", "dvdLogo5.png"],
        gameMsg = document.getElementById("gameMsg");
    img.src = arrImages[(Math.floor(Math.random() * 4 + 1))];


    let bsWidth = 300, bsHeight = 157, bx, by, xv, yv;

    // sets ball position to middle of canvas
    //using the documents width/height because canvas height and width is inaccurate when this is set
    bx = document.body.clientWidth / 2, by = document.body.clientHeight / 2;

    // random ball starting speed (between 50 and 100 pixels per a second)
    xv = Math.floor(Math.random() * 76 + 50) / FPS, yv = Math.floor(Math.random() * 76 + 50) / FPS;

    // random ball direction
    if (Math.floor(Math.random() * 2) === 0)
        xv = -xv;
    if (Math.floor(Math.random() * 2) === 0)
        yv = -yv;

    //keyboard controls that change direction of logo
    let recent = false;
    function keypress(code) {
        if (recent == false) {
            switch (code) {
                case "ArrowDown":
                    //Make logo change direction to downwards, if the ball is moving upwards
                    if (yv < 0) {
                        recent = true;
                        setTimeout(function () {
                            recent = false;
                        }, 1000);
                        yv = Math.abs(yv);
                        break;
                    } else
                        break;
                case "ArrowUp":
                    //Make logo change direction to upwards, if the ball is moving downwards
                    if (yv > 0) {
                        recent = true;
                        setTimeout(function () {
                            recent = false;
                        }, 1000);
                        yv = -yv;
                        break;
                    } else
                        break;
                case "ArrowLeft":
                    //Make logo change direction to left, if the ball is moving right
                    if (xv > 0) {
                        recent = true;
                        setTimeout(function () {
                            recent = false;
                        }, 1000);
                        xv = -xv;
                        break;
                    } else
                        break;
                case "ArrowRight":
                    //Make logo change direction to right, if the ball is moving left
                    if (xv < 0) {
                        recent = true;
                        setTimeout(function () {
                            recent = false;
                        }, 1000);
                        xv = Math.abs(xv);
                        break;
                    } else
                        break;
            }
        } else {
            gameMsg.innerHTML = "You can only move once per a second."
            gameMsg.style.display = "block", gameMsg.style.opacity = "100%";
            setTimeout(function () {
                gameMsg.style.opacity = "0%";
            }, 500)
        }
    }

    function drawConfetti() {
        if (party) {
            //create confetti effect using party.js
            party.confetti(party.Rect.fromScreen(), {
                    count: 300 * (window.innerWidth / 1980),
                    countVariation: 0.5,
                    angleSpan: 0,
                    yVelocity: -100,
                    yVelocityVariation: 2,
                    rotationVelocityLimit: 6,
                    scaleVariation: 0.8
                }
            );
            //resets dvdLogo position so you can't spam it
            bx = canvas.width / 2;
            by = canvas.height / 2;
        } else {
            setTimeout(drawConfetti, 50)
        }
    }

    //ensures the new dvd logo color is different then the current one
    function changeImg() {
        let returnSrc = arrImages[(Math.floor(Math.random() * 4 + 1))];
        if (returnSrc !== img.src) {
            return returnSrc;
        } else {
            changeImg();
        }
    }

    let xBounds = false;
    let yBounds = false;

    //responsible for: redrawing canvas per frame, ball movement, dvd logo color change, making the ball bounce off walls, and checking for corner hits
    function update() {
        if ((img.width > canvas.width / 3 || img.height > canvas.height / 3) && !md.mobile()) {
            gameMsg.innerHTML = "Your game area is too small, pausing game."
            gameMsg.style.display = "block";
            gameMsg.style.opacity = "100%";
            setTimeout(function () {
                gameMsg.style.opacity = "0%";
            }, 5000);
            return;
        }
        //move the ball
        bx += xv;
        by += yv;

        //bounce the ball off each wall
        if (bx - bsWidth / 2 < 0 && xv < 0) {
            yBounds === true && drawConfetti();
            xBounds = true;
            setTimeout(function () {
                xBounds = false;
            }, 50)
            xv = -xv;
            img.src = changeImg();
        }
        //checking if ball position is more than the width of the canvas and if velocity is more than 0
        if (bx + bsWidth / 2 > canvas.width && xv > 0) {
            yBounds === true && drawConfetti();
            xBounds = true;
            setTimeout(function () {
                xBounds = false;
            }, 50)
            xv = -xv;
            img.src = changeImg();
        }
        if (by - bsHeight / 2 < 0 && yv < 0) {
            xBounds === true && drawConfetti();
            yBounds = true;
            setTimeout(function () {
                yBounds = false;
            }, 50)
            yv = -yv;
            img.src = changeImg();
        }
        if (by + bsHeight / 2 > canvas.height && yv > 0) {
            xBounds === true && drawConfetti();
            yBounds = true;
            setTimeout(function () {
                yBounds = false;
            }, 50)
            yv = -yv;
            img.src = changeImg();
        }

        //draw background and dvd logo
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, bx - bsWidth / 2, by - bsHeight / 2);
    }

    //Calls the update function every 1/30th of a second
    setInterval(update, 1000 / FPS);
    // O-Pad code
    document.body.addEventListener("click", function (e) {
        if (e.target && e.target.nodeName == "A") {
            e.preventDefault();
        }
    });
    let dpads = Array.prototype.slice.call(document.getElementsByClassName('d-pad'), 0),
        opads = Array.prototype.slice.call(document.getElementsByClassName('o-pad'), 0),
        els = dpads.concat(opads);

    function dir(dir) {
        for (let i = 0; i < els.length; i++) {
            const el = els[i],
                d = el.className.indexOf('d-') !== -1,
                what = d ? 'd-pad' : 'o-pad';
            console.log(what);
            el.className = what + ' ' + dir;
        }
    }

    document.body.onkeyup = function (e) {
        console.log(e.code);
        switch (e.code) {
            case "KeyA":
            case "ArrowLeft":
                console.log(1);
                keypress("ArrowLeft");
                break;
            case "KeyD":
            case "ArrowRight":
                keypress("ArrowRight");
                break;
            case "KeyW":case "ArrowUp":
                keypress("ArrowUp");
                break;
            case "KeyS":
            case "ArrowDown":
                console.log("test")
                keypress("ArrowDown");
                break;
        }
    };

    document.body.onclick = function (e) {
        switch (e.target.className) {
            case "right":
                keypress("ArrowRight");
                break;
            case "left":
                keypress("ArrowLeft");
                break;
            case "up":
                keypress("ArrowUp")
                break;
            case "down":
                keypress("ArrowDown")
                break;
        }
    }
}