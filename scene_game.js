var SceneGame = {

    name: "Game",
    
    resetLeaves: function(self) {
        self.leaves = [];
        var leafCount = 2 + 2 * Math.random();
        for (var i = 0; i < leafCount; i ++) {
            /* Make random leaf */
            var leaf = {
                x: 32 + Math.floor(Math.random() * (CANVAS_WIDTH - 64)),
                y: 32 + Math.floor(Math.random() * (CANVAS_HEIGHT - 64)),
                vx: 0,
                vy: 0,
                angle: Math.random() * Math.PI,
                image: document.getElementById("res-leaf"),
            };
            self.leaves.push(leaf);
        }
        self.gameWon = false;
    },
    
    load: function(self) {
        self.leaves = [];
        self.resetLeaves(self);
        self.ripples = [];
        self.goalSize = 32 * (self.leaves.length + 1);
        self.leavesInCircle = 0;
    },
    
    update: function(self) {
        for (var i = self.ripples.length - 1; i >= 0; i --) {
            self.ripples[i].size += 1;
            self.ripples[i].opac -= 2;
            if (self.ripples[i].opac <= 0) {
                self.ripples.splice(i, 1);
            }
        }
        var leafCount = 0;
        for (var i = 0; i < self.leaves.length; i ++) {
            self.leaves[i].x += self.leaves[i].vx;
            self.leaves[i].y += self.leaves[i].vy;
            self.leaves[i].vx *= 0.95;
            self.leaves[i].vy *= 0.95;
            
            var dx = self.leaves[i].x - CANVAS_WIDTH / 2;
            var dy = self.leaves[i].y - CANVAS_HEIGHT / 2;
            if (dx*dx + dy*dy < self.goalSize*self.goalSize) {
                leafCount += 1;
            }
        }
        self.leavesInCircle = leafCount;
        self.gameWon = (self.leavesInCircle === self.leaves.length);
    },
    
    draw: function(self) {
        for (var i = 0; i < self.ripples.length; i ++) {
            canvas.globalAlpha = Math.max(0, self.ripples[i].opac / 255);
            canvas.strokeStyle = "#fff";
            canvas.beginPath();
            canvas.arc(self.ripples[i].x, self.ripples[i].y, self.ripples[i].size, 0, 2*Math.PI);
            canvas.stroke();
            canvas.globalAlpha = 1;
        }
        canvas.globalAlpha = 0.3;
        canvas.strokeStyle = "#fff";
        canvas.fillStyle = "#fff";
        canvas.beginPath();
        canvas.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, self.goalSize, 0, 2*Math.PI);
        canvas.stroke();
        if (self.gameWon) {
            canvas.fill();
        }
        canvas.globalAlpha = 1;
        for (var i = 0; i < self.leaves.length; i ++) {
            canvas.translate(self.leaves[i].x, self.leaves[i].y);
            canvas.rotate(self.leaves[i].angle);
            canvas.fillStyle = "#fff";
            canvas.strokeStyle = "#fff";
            canvas.drawImage(self.leaves[i].image, -49/2, -50/2);
            canvas.rotate(-self.leaves[i].angle);
            canvas.translate(-self.leaves[i].x, -self.leaves[i].y);
        }
        canvas.fillStyle = "#000";
        canvas.fillText(self.leavesInCircle, 0, 32);
    },
    
    mouseReleased: function(self, key, mx, my) {},
    
    mousePressed: function(self, key, mx, my) {
        var finisher = false;
        if (self.gameWon) {
            var dx = (mx - CANVAS_WIDTH / 2);
            var dy = (my - CANVAS_HEIGHT / 2);
            if (dx*dx + dy*dy < self.goalSize*self.goalSize) {
                finisher = true;
            }
            if (finisher) {
                for (var i = 0; i < self.leaves.length; i++) {
                    dx = (self.leaves[i].x - CANVAS_WIDTH / 2);
                    dy = (self.leaves[i].y - CANVAS_HEIGHT / 2);
                    var angle = Math.atan2(dy, dx);
                    var force = 20;
                    self.leaves[i].vx += force * Math.cos(angle);
                    self.leaves[i].vy += force * Math.sin(angle);
                }
                setTimeout(function(){self.resetLeaves(self)}, 1000);
            }
        } 
        if (!finisher) {
            var newRipple = { 
                x: mx, 
                y: my, 
                size: 0, 
                opac: 255,
            };
            self.ripples.push(newRipple);
            for (var i = 0; i < self.leaves.length; i++) {
                var dx = (self.leaves[i].x - mx);
                var dy = (self.leaves[i].y - my);
                var distanceSquared = dx * dx + dy * dy;
                var angle = Math.atan2(dy, dx);
                var force = Math.max(0, Math.min(3, 1000 / distanceSquared));
                self.leaves[i].vx += force * Math.cos(angle);
                self.leaves[i].vy += force * Math.sin(angle);
            }
        }
    },
    
}