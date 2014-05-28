var SceneTitle = {

    name: "Title",
    
    load: function(self) {},
    
    update: function(self) {},
    
    draw: function (self) {
        canvas.font = "32px Josefin Sans";
        canvas.textAlign = "center";
        canvas.fillText("Puddle Game Extreme!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3);
        canvas.font = "24 Josefin Sans";
        canvas.fillText(action(true) + "to play!", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 1.5);
        canvas.textAlign = "left";
    },
    
    mousePressed: function(self, key, x, y) {},
    
    mouseReleased: function(self, key, x, y) {
        load(SceneGame);
    },
    
}