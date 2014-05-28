/* Create canvas object */
var canvasElement = document.getElementById("game-canvas");
var canvas = canvasElement.getContext("2d");

/* Declare constants */
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;
var FPS = 60;
var BG_COLOUR = "#8CF";

/* Declare global variables */
var gameOver = false;
var scene;

load(SceneTitle);

function load(s) {
    scene = s;
    scene.load(scene);
}

/* Word for touch/press/click */
function action(capitalise) {
    capitalise = typeof capitalise !== 'undefined' ? capitalise : false;
    var word = "click";
    
    if (capitalise) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return word;
    }
};

/* Mouse pressed */
function mousePressed(key, x, y) {
    if (x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT) return;
    scene.mousePressed(scene, key, x, y);
};

/* Mouse released */
function mouseReleased(key, x, y) {
    if (x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT) return;
    scene.mouseReleased(scene, key, x, y);
};

/* Update */
function update() {
    scene.update(scene);
};

/* Draw */
function draw() {
    // Clear to background colour
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = BG_COLOUR;
    canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#000";
    // Drawing functions
    scene.draw(scene);
};

/* Set up callbacks to happen */
setInterval(function() {
    update();
    draw();
}, 1000/FPS);

document.onmousedown = function(event) {
    var event = event || window.event;
    var button = event.which || event.button;
    var mouseX = (event.clientX || event.pageX);
    var mouseY = (event.clientY || event.pageY);
    mouseX += document.body.scrollLeft;
    mouseY += document.body.scrollTop;
    mouseX -= document.getElementById("game-window").offsetLeft;
    mouseY -= document.getElementById("game-window").offsetTop;
    mousePressed(button, mouseX, mouseY);
};
document.onmouseup = function(event) {
    var event = event || window.event;
    var button = event.which || event.button;
    var mouseX = (event.clientX || event.pageX);
    var mouseY = (event.clientY || event.pageY);
    mouseX += document.body.scrollLeft;
    mouseY += document.body.scrollTop;
    mouseX -= document.getElementById("game-window").offsetLeft;
    mouseY -= document.getElementById("game-window").offsetTop;
    mouseReleased(button, mouseX, mouseY);
};