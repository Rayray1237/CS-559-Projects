function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var slider1 = document.getElementById('slider1');
  var slider2 = document.getElementById('slider2');
  slider1.value = 0;
  slider2.value = 0;
  var movement = 0;

  function draw() {
    canvas.width = canvas.width;

  
    var mouthSlider = slider1.value;
    var moveSpeed = slider2.value;

    function setTran(Tx) {
        context.setTransform(Tx[0],Tx[1],Tx[3],Tx[4],Tx[6],Tx[7]);
    }

   
    movement = (movement + (1 * moveSpeed)) % 1200;

    
    context.font = "100px Impact";

    var kirbyText = mat3.create();

    if(movement % 300 < 150) {

        mat3.scale(kirbyText, kirbyText, [2, 2]);
        setTran(kirbyText);

        context.fillText("Eating Time", 10, 100);
    } else {

        setTran(kirbyText);

        context.fillText("Eating Time", 200, 170);
    }
    
    
    var KirbyToCanvas = mat3.create();
    mat3.fromTranslation(KirbyToCanvas, [movement, 0]);
    setTran(KirbyToCanvas);

    function kirby(KirbyToCanvas) {
        context.lineWidth = 3;

        var kirbyBase = mat3.create();
        mat3.fromTranslation(kirbyBase, [-100, 170]);
        var kirbyTorso = mat3.create();
        mat3.multiply(kirbyTorso, KirbyToCanvas, kirbyBase);

    
        var kirbyBackHand = mat3.create();
        mat3.rotate(kirbyBackHand, kirbyBackHand, ((movement % 60) * Math.PI / 180 ) - 220);
        mat3.multiply(kirbyBackHand, kirbyTorso, kirbyBackHand);
        setTran(kirbyBackHand);

        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = "#00eeff";
        context.lineWidth = 3;

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

 
        var kirbyBackLeg = mat3.create();
        mat3.rotate(kirbyBackLeg, kirbyBackLeg, ((movement % 60) * Math.PI / 180) - 70);
        mat3.multiply(kirbyBackLeg, kirbyTorso, kirbyBackLeg);
        setTran(kirbyBackLeg);

        context.beginPath();
        context.fillStyle = "#00eeff";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        setTran(kirbyTorso);

        context.beginPath();
        context.fillStyle = "#00eeff";
        context.arc(0, 0, 100, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();

   
        kirbyMouth(kirbyTorso);

     
        var kirbyFrontHand = mat3.create();
        mat3.rotate(kirbyFrontHand, kirbyFrontHand, ((-movement % 60) * Math.PI / 180 ) - 200);
        mat3.multiply(kirbyFrontHand, kirbyTorso, kirbyFrontHand);
        setTran(kirbyFrontHand);

        context.beginPath();
        context.fillStyle = "#00eeff";

        context.ellipse(-100, 0, 30, 20, 0, Math.PI / 3, Math.PI * 1.65);
        context.fill();
        context.stroke();
        context.closePath();

  
        var kirbyFrontLeg = mat3.create();
        mat3.rotate(kirbyFrontLeg, kirbyFrontLeg, ((-movement % 60) * Math.PI / 180) - 270);
        mat3.multiply(kirbyFrontLeg, kirbyTorso, kirbyFrontLeg);
        setTran(kirbyFrontLeg);

        context.beginPath();
        context.fillStyle = "#00eeff";

        context.ellipse(0, 100, 50, 30, 0, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();

        kirbyEyes(kirbyTorso);

        drawAir(kirbyTorso);
    }

  
    function kirbyEyes(kirbyTorso) {
        var kirbyEyeX = 80;
        var kirbyEyeY = 0;

        var kirbyEyes = mat3.create();
        mat3.rotate(kirbyEyes, kirbyEyes, (-mouthSlider - 10) * Math.PI / 180);
        mat3.multiply(kirbyEyes, kirbyTorso, kirbyEyes);
        setTran(kirbyEyes);

        context.beginPath();
        context.fillStyle = "#000000";
        context.ellipse(kirbyEyeX, kirbyEyeY, 10, 20, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#4dff00";
        context.ellipse(kirbyEyeX, kirbyEyeY, 7, 17, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(kirbyEyeX, kirbyEyeY, 9, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#c800ff";
        context.ellipse(kirbyEyeX, kirbyEyeY - 8, 6, 9, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

   
    function kirbyMouth(kirbyTorso) {
        var kirbyMouth = mat3.create();
        mat3.scale(kirbyMouth, kirbyMouth, [Math.max(mouthSlider / 2.5, 0), Math.max(mouthSlider, 0)]);
        mat3.multiply(kirbyMouth, kirbyTorso, kirbyMouth);
        setTran(kirbyMouth);

        context.beginPath();
        context.fillStyle = "#000000";
        context.ellipse((90 - mouthSlider / 2.5) / Math.max(mouthSlider / 2.5, 0), 0, 1.1, 1.05, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = "#aa1751";
        context.ellipse((90 - mouthSlider / 2.5) / Math.max(mouthSlider / 2.5, 0), 0, 1, 1, 0, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

   
    function drawAir(kirbyTorso) {
        var airBase = mat3.create();
        mat3.translate(airBase, kirbyTorso, [150, 0]);

        var airSpin = mat3.create();
        mat3.rotate(airSpin, airSpin, movement * 1 * Math.PI / 180);
        mat3.scale(airSpin, airSpin, [Math.max(mouthSlider / 60, 0), Math.max(mouthSlider / 60, 0)]);
        mat3.multiply(airSpin, airBase, airSpin);
        setTran(airSpin);

        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = randRGB();

        for (var i = 0; i < 20; i++) {
            context.rect(100*Math.random() - 50, 100*Math.random() - 50, 10, 10);
        }

        context.fill();
        context.stroke();
        context.closePath();
    }

    
    function randRGB() {
        return 'rgb(' + 255*Math.random() + ',' + 255*Math.random() + ',' + 255*Math.random() + ')';
    }

   
    kirby(KirbyToCanvas);

    window.requestAnimationFrame(draw);
  }
  window.requestAnimationFrame(draw);
}
window.onload = setup;