"declare variables"
const FPS = 60;
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
let level = 0;
let score = 0;
let browserResize = false;
let tooSmall = false;
let start = false;
"array of dvd logo colors"
let img = new Image();
let arrImages = [
    //"dvdLogo1.png",
    //"dvdLogo2.png",
    //"dvdLogo3.png",
    //"dvdLogo4.png",
    //"dvdLogo5.png",
    "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",
    "https://media.discordapp.net/attachments/994745529038811167/1008139530756432043/unknown.png",
    "https://c.tenor.com/07fbSQZWPikAAAAC/chungeth-rithik-reddy.gif",
    "https://media.discordapp.net/attachments/1009930262412546058/1009930311368462437/unknown.png?width=544&height=676",
    "https://i.pinimg.com/736x/22/b7/3d/22b73ddfc4cbe22a4a6a4799bb37488b.jpg",
    "https://media.discordapp.net/attachments/760789183601573898/1013240861850599555/unknown.png",
    "https://media.discordapp.net/attachments/760789183601573898/1013238369016360990/unknown.png",
    "https://media.discordapp.net/attachments/760789183601573898/1013237266413522974/unknown.png"
];

const memes = [
    "https://cdn.discordapp.com/attachments/819678843760672808/1015661502440681613/hit_the_griddy_for_ukraine.mp4",
    "https://cdn.discordapp.com/attachments/1009884051529805924/1015759208941105252/Dubstep.mov",
    "https://cdn.discordapp.com/attachments/1009884051529805924/1015759202943254638/kitten.mp4",
    "https://cdn.discordapp.com/attachments/1009884051529805924/1015759183762702366/Window.mov",
    "https://cdn.discordapp.com/attachments/760789183601573898/1015379014317256814/Grandma.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1015375630013038613/Boobs.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1014651466125955142/v09044g40000cc3r3rjc77uaicfcpcug.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1013244241075523684/pizza.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1013191998083182632/Pakistan.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1013190900073119896/Traffic.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1013190682602643517/Fard.mp4",
    "https://cdn.discordapp.com/attachments/926839309707902976/1011494379510321213/video0.mp4",
    "https://media.discordapp.net/attachments/918758459531481098/1012655076592078908/1TB_CHILD_PORN_GIVEAWAY-1.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1011334620752654498/Guacamole_penis-did_you_hear_it.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1010265541845471242/MoldyMemes-moldy_cat.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1007764438188838923/LesbianInsectBrothel-Ayo_mr_breast---_.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1007008692115341312/MoldyMemes-cet.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1006672162586906884/MoldyMemes-cat.mp4",
    "https://cdn.discordapp.com/attachments/976894011962961970/1005138348714754128/output.mp4",
    "https://cdn.discordapp.com/attachments/760789183601573898/1005098052815691907/patrick1.mp4"
];

const memesAndSlavery = [];

let currentSlavery = memes;

const boobs = document.querySelector('video#fuckoff');
function fuckOff(dontCum) {

    `console.groupCollapsed("Memes and slavery");
    console.table(memes);
    console.table(memesAndSlavery);
    console.groupEnd();`

    dontCum ??= false;
    
    const vagina = currentSlavery === memes? memesAndSlavery:memes;
    if (currentSlavery.length <= 0) currentSlavery = vagina;

    const dick = currentSlavery.splice(Math.floor(Math.random() * (currentSlavery.length - 1)), 1);
    vagina.push(dick);

    boobs.setAttribute('src',
        dick
    );

    !dontCum && boobs.play();
}

fuckOff(true);

boobs.addEventListener('ended', () => {
    fuckOff();
    "Penis";
});

"ball size"
let bsWidth = 300;
let bsHeight = 150;

"ball position x, y"
let bx, by;

"ball velocity x, y (in pixels per a second, aka how many pixels it moves per frame)"
let xv, yv;

" sets ball position to middle of canvas"
"using the documents width/height because canvas height and width is inaccurate when this is set"
bx = document.body.clientWidth / 2;
by = document.body.clientHeight / 2;

" random ball starting speed (between 50 and 100 pixels per a second)"
xv = 1;
yv = 1;

" random ball direction"
if (Math.floor(Math.random() * 2) === 0) {
    xv = -xv;
}
if (Math.floor(Math.random() * 2) === 0) {
    yv = -yv;
}

let gameMsg = document.getElementById("gameMsg");
"keyboard controls that change direction of logo"
let recent = false;
document.addEventListener('keydown', function (event) {
    if (start == true) {
        if (browserResize == false) {
            if (recent == false) {
                switch (event.code) {
                    case "KeyS":
                    case "ArrowDown":
                        "Make logo change direction to downwards, if the ball is moving upwards"
                        if (yv < 0) {
                            score += 1;
                            recent = true;
                            setTimeout(function () {
                                recent = false;
                            }, 1000);
                            yv = Math.abs(yv);
                            break;
                        } else {
                            break;
                        }
                    case "KeyW":
                    case "ArrowUp":
                        "Make logo change direction to upwards, if the ball is moving downwards"
                        if (yv > 0) {
                            score += 1;
                            recent = true;
                            setTimeout(function () {
                                recent = false;
                            }, 1000);
                            yv = -yv;
                            break;
                        } else {
                            break;
                        }
                    case "KeyA":
                    case "ArrowLeft":
                        "Make logo change direction to left, if the ball is moving right"
                        if (xv > 0) {
                            score += 1;
                            recent = true;
                            setTimeout(function () {
                                recent = false;
                            }, 1000);
                            xv = -xv;
                            break;
                        } else {
                            break;
                        }
                    case "KeyD":
                    case "ArrowRight":
                        "Make logo change direction to right, if the ball is moving left"
                        if (xv < 0) {
                            score += 1;
                            recent = true;
                            setTimeout(function () {
                                recent = false;
                            }, 1000);
                            xv = Math.abs(xv);
                            break;
                        } else {
                            break;
                        }
                }
            } else {
                gameMsg.innerHTML = "Stop spamming, cunt"
                gameMsg.style.display = "block";
                gameMsg.style.opacity = "100%";
                setTimeout(function () {
                    gameMsg.style.opacity = "0%";
                }, 500)
            }
        } else {
            gameMsg.innerHTML = "You cannot resize the window while the game is running. Refresh your browser to restart."
            gameMsg.style.display = "block";
            gameMsg.style.opacity = "100%";
        }
    }
});

function drawConfetti() {
    if (start != false) {
        " This is where you win lol"
        if (party) {
            " FUCK YOUR CONFETTI"
            /*party.confetti(party.Rect.fromScreen(), {
                    count: 300 * (window.innerWidth / 1980),
                    countVariation: 0.5,
                    angleSpan: 0,
                    yVelocity: -100,
                    yVelocityVariation: 2,
                    rotationVelocityLimit: 6,
                    scaleVariation: 0.8
                }
            );*/
            gameMsg.innerHTML = "Fuck you"
            gameMsg.style.display = "block";
            gameMsg.style.opacity = "100%";
            setTimeout(function () {
                gameMsg.style.opacity = "0%";
            }, 2000)

            " Random Lmao"
            level += 1+Math.floor(Math.random() * 2);

            xv = xv * (1.1 - (Math.random() * 0.1));
            yv = yv * (1.1 - (Math.random() * 0.1));

            "resets dvdLogo position so you can't spam it"
            bx = canvas.width / 2;
            by = canvas.height / 2;
        } else {
            setTimeout(drawConfetti, 50)
        }
    }
}

"ensures the new dvd logo color is different then the current one"
function changeImg() {
    if (arrImages.length === 1) return arrImages[0];

    const i = arrImages.findIndex(s => img.src.endsWith(s));
    const current = i >= 0? arrImages.splice(i, 1)[0] : undefined;

    const returnSrc = arrImages[Math.floor((Math.random() * (arrImages.length - 1)) + 0.5)];
    
    i >= 0 && arrImages.push(current);
    return returnSrc;
}

let xBounds = false;
let yBounds = false;

"responsible for: redrawing canvas per frame, ball movement, dvd logo color change, making the ball bounce off walls, and checking for corner hits"
function update() {
    const fuckYouW = bsWidth;
    const fuckYouH = bsHeight;

    document.body.querySelector("#level i").innerHTML = level;
    document.body.querySelector("#score i").innerHTML = score;
    if (document.body.clientWidth < img.width * 3 || document.body.clientHeight < img.height * 3) {
        " Don't care, didn't ask"
        "tooSmall = true;"
    }
    if (browserResize == false) {
        if (tooSmall == false) {
            "move the ball"
            if (start) {
                bx += xv;
                by += yv;
            }

            "bounce the balls off each wall"
            if (bx - fuckYouW / 2 < 0 && xv < 0) {
                yBounds === true && drawConfetti();
                xBounds = true;
                setTimeout(function () {
                    xBounds = false;
                }, 50)
                xv = -xv;
                try {
                    img.src = changeImg();
                    img.setAttribute('width', 100);
                    img.setAttribute('height', 200);
                } catch {}
            }
            "checking if balls position is more than the width of the canvas and if velocity is more than 0"
            if (bx + fuckYouW / 2 > canvas.width && xv > 0) {
                yBounds === true && drawConfetti();
                xBounds = true;
                setTimeout(function () {
                    xBounds = false;
                }, 50)
                xv = -xv;
                try {
                    img.src = changeImg();
                    img.setAttribute('width', 100);
                    img.setAttribute('height', 200);
                } catch {}
            }
            if (by - fuckYouH / 2 < 0 && yv < 0) {
                xBounds === true && drawConfetti();
                yBounds = true;
                setTimeout(function () {
                    yBounds = false;
                }, 50)
                yv = -yv;
                try {
                    img.src = changeImg();
                    img.setAttribute('width', 100);
                    img.setAttribute('height', 200);
                } catch {}
            }
            if (by + fuckYouH / 2 > canvas.height && yv > 0) {
                xBounds === true && drawConfetti();
                yBounds = true;
                setTimeout(function () {
                    yBounds = false;
                }, 50)
                yv = -yv;
                try {
                    img.src = changeImg();
                } catch {}
            }

            "draw background and dvd logo"
            context.fillStyle = "black";
            context.clearRect(0, 0, canvas.width, canvas.height);
            try {
                context.drawImage(img, bx - bsWidth / 2, by - bsHeight / 2, bsWidth, bsHeight);
            } catch {}
        } else {
            gameMsg.innerHTML = "Your dick is too small. Resize your browser and refresh the page. Mobile is currently not supported."
            gameMsg.style.display = "block";
            gameMsg.style.position = "absolute";
            gameMsg.style.top = "50%";
            gameMsg.style.margin = "auto";
            gameMsg.style.opacity = "100%";
            document.body.style.backgroundColor = "black";
        }
    } else {
        gameMsg.innerHTML = "You cannot resize the window while the game is running. Refresh your browser to restart."
        gameMsg.style.display = "block";
        gameMsg.style.position = "absolute";
        gameMsg.style.top = "50%";
        gameMsg.style.margin = "auto";
        gameMsg.style.opacity = "100%";
        document.body.style.backgroundColor = "black";
    }
    window.requestAnimationFrame(update);
}

" Resizing is gay"
/*window.addEventListener('resize', function () {
    browserResize = true;
    document.querySelector("#start").style.display = "none";
    document.querySelector("#level").style.display = "none";
    document.querySelector("#score").style.display = "none";
})*/

img.src = changeImg();
img.width = 200;
img.height = 100;

"Calls the update function every 1/30th of a second"
window.requestAnimationFrame(update);
