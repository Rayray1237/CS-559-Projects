function setup() {
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  var slider2 = document.getElementById('slider2');
  slider1.value = 0;
  slider2.value = 0;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    var dx = slider1.value;
    var dy = slider2.value;

    function drawsqaure(color) {
      context.beginPath();
      context.rect(300, 200, 150, 150);
      context.fillStyle = color;
      context.fill();
      context.save();

      context.beginPath();
      context.rect(350, 240, 150, 150);
      context.fillStyle = "black";
      context.fill();
      context.save();
    }

    function drawcircle(color) {
      context.beginPath();
      context.arc(200, 275, 75, 0, 2 * Math.PI);
      context.fillStyle = 'Green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = 'black';
      context.stroke()
    }

    function drawTriangles(color) {
      context.beginPath();
      context.moveTo(675, 300);
      context.lineTo(525, 200);
      context.lineTo(525, 400);
      context.closePath();
      context.fillStyle = "Green";
      context.fill();
      context.stroke();
    }

    function drawWord(color) {
      context.strokeStyle = "Green";
      context.lineWidth = "10";
      context.beginPath();
      context.moveTo(120, 103);
      context.lineTo(120, 30);
      context.lineTo(150, 95);
      context.lineTo(150, 25);
      context.moveTo(165, 40);
      context.lineTo(165, 100);
      context.lineTo(185, 100);
      context.moveTo(165, 70);
      context.lineTo(177, 70);
      context.moveTo(163, 42);
      context.lineTo(185, 42);
      context.moveTo(190, 105);
      context.lineTo(208, 45);
      context.lineTo(225, 105);
      context.moveTo(192, 75);
      context.lineTo(225, 75);
      context.moveTo(247, 104);
      context.lineTo(247, 32);
      context.moveTo(225, 37);
      context.lineTo(270, 37);
      context.stroke();
    }
    drawcircle("Pink");
    drawTriangles("Orange");
    drawsqaure("Green");
    context.save();
    context.translate(dx, dy);
    drawWord("Green")
    context.restore();
  }
  slider1.addEventListener("input", draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
