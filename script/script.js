var sketchPad = ( function(){
    "use strict";
  
  var sketchPen;

  var startPad = function(){
      padArea.start ();
      sketchPen = new component(1,1,black,0,0);
  }
  
  var padArea = {
      canvas : document.createElement("canvas")
      start : function() {
          this.canvas.width = 850;
          this.canvas.height = 750;
          this.context = this.canvas.getContext ("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[0]);
          this.interval = setInterval(updatePadArea, 20);
          window.addEventListener('keydown', function(e) {
              sketchPad.keys = (sketchPad.keys || [])
              sketchPad.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function(e) {
              sketchPad.keys[e.keyCode] = false;
          })
      }
  }
  
  var component = function(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;
      this.x = x;
      this.y = y;
      ctx = padArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      this.newPos = function() {
          this.x += this.speedX;
          this.y += this.speedY;
      }

  var updatePadArea = function() {
      sketchPad.speedX = 0;
      sketchPad.speedY = 0;
      if (sketchPad.key && sketchPad.key[65]){moveLeft();}
      if (sketchPad.key && sketchPad.key[68]){moveRight();}
      if (sketchPad.key && sketchPad.key[74]){moveUp();}
      if (sketchPad.key && sketchPad.key[76]){moveDown();}
      if (sketchPad.key && sketchPad.key[32]){clearPad();}
      sketchPen.newPos();
      sketchPen.update();
  }

  var clearPad = function() {
      padArea.clear();
      sketch.Pen = undefined;
  }

  var moveUp = function() {
      sketchPen.speedY -= 1;
  }

  var moveDown = function() {
      sketchPen.speedY += 1;
  }

  var moveRight = function() {
      sketchPen.speedX += 1;
  }
  
  var moveLeft = function() {
      sketchPen.speedX -= 1;
  }

})