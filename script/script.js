    "use strict";
  
  var sketchPen;

  var startPad = function () {
      sketchPen = new component(3,3,"black",0,0);
      padArea.start ();
  }
  
  var padArea = {
      canvas : document.createElement("canvas"),
      start : function() {
          this.canvas.width = 850;
          this.canvas.height = 600;
          this.context = this.canvas.getContext ("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[0]);
          this.interval = setInterval(updatePadArea, 20);
          window.addEventListener('keydown', function(e) {
              padArea.keys = (padArea.keys || [])
              padArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function(e) {
              padArea.keys[e.keyCode] = false;
          })
      },
      clear : function(){
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  function component(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;
      this.x = x;
      this.y = y;
      this.update = function() {
        var ctx = padArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      this.newPos = function() {
          this.x += this.speedX;
          this.y += this.speedY;
      }
  }
  function updatePadArea() {
      sketchPen.speedX = 0;
      sketchPen.speedY = 0;
      if (padArea.keys && padArea.keys[68]){sketchPen.speedX += 1;}
      if (padArea.keys&& padArea.keys[74]){sketchPen.speedY -= 1;}
      if (padArea.keys && padArea.keys[76]){sketchPen.speedY += 1;}
      if (padArea.keys && padArea.keys[65]){sketchPen.speedX -= 1;}
      if (padArea.keys&& padArea.keys[32]){
          padArea.clear();
          sketch.Pen = undefined;
      }
      sketchPen.newPos();
      sketchPen.update();
  }
