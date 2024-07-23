function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	var tParam = slider1.value*0.01;
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}
	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function uglyCar(color,Tx) {
	    context.beginPath();
		context.strokeStyle = "black";
	    context.fillStyle = color;
		context.lineCap = "round";
		context.lineWidth = 1;
		
		
	    moveToTx([-0.1,-0.1],Tx);
	    lineToTx([-0.1,0.1],Tx);
        lineToTx([0.1,0.1],Tx);
		lineToTx([0.08,0.13],Tx);
		lineToTx([0.1,0.1],Tx);
      	lineToTx([0.2,0.05],Tx);
		lineToTx([0.2,-0.05],Tx);
	    lineToTx([0.1,-0.1],Tx);
		lineToTx([0.08,-0.13],Tx);
		lineToTx([0.1,-0.1],Tx);
		lineToTx([-0.1,-0.1],Tx);
		context.stroke();
	    context.fill();
		
		moveToTx([0.05,0.05],Tx);
		lineToTx([0.07,0.07],Tx);
		lineToTx([0.07,-0.07],Tx);
		lineToTx([0.05,-0.05],Tx);
		lineToTx([0.05,0.05],Tx);
		context.stroke();

	
	}
	
	var C0 = function(t) {
            var x = 0;
            var y = t;
            return [x,y];
	}
	
	var C0_tangent = function(t) {
	        var x = 0;
	        var y = 1;
	        return [x,y];
	}
	
	var C1 = function(t) {
            var x = 0.5*Math.cos(1 * Math.PI * t)+0.5;
            var y = 0.5*Math.sin(-1 * Math.PI * t)+1;
            return [x,y];
	}
	
	var C1_tangent = function(t) {
	        var x = -0.5*Math.PI*Math.sin(1 * Math.PI * t);
	        var y = -0.5*Math.PI*Math.cos(-1 * Math.PI * t);
	        return [x,y];
	}
	
	var C2 = function(t) {
	        var x = 1;
	        var y = 3-t;
	        return [x,y];
	}
	
	var C2_tangent = function(t) {
	        var x = 0;
	        var y = -1;
	        return [x,y];
	}
	
	var C3 = function(t) { 
	        var x = -0.5*Math.cos(1 * Math.PI * (4-t))+0.5;
	        var y = -0.5*Math.sin(1 * Math.PI * (4-t));
	        return [x,y];
	}
	
	var C3_tangent = function(t) {
	        var x = -0.5*Math.PI*Math.sin(1 * Math.PI * (4-t));
	        var y = 0.5*Math.PI*Math.cos(1 * Math.PI * (4-t));
	        return [x,y];
	}
	
	var Ccomp = function(t) {
            if(t<1) {
		return C0(t);
            }
			
			else if(t>=1 && t<2){
		return C1(t);
            }
			
			else if(t>=2 && t<3){
			return C2(t);
			}
			
			else{
			return C3(t);
			}
	}
	
	var Ccomp_tangent = function(t) {
	        if(t<1) {
		return C0_tangent(t);
	        }
			
			else if(t>=1 && t<2){
		return C1_tangent(t);
	        }
			
			else if(t>=2 && t<3){
			return C2_tangent(t);
			}
			
			else{
			return C3_tangent(t);
			}
	}

	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
		context.lineWidth= 60;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		lineToTx(C(t),Tx);
            }
			
            context.stroke();
	}
	
	function drawTrajectory2(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle="Green";
		context.lineWidth= 2;
	    context.beginPath();
	    moveToTx(C(t_begin),Tx);
	        for(var i=1;i<=intervals;i=i+10){
		var t1=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		var t2=((intervals-i-5)/intervals)*t_begin+((i+5)/intervals)*t_end;
		moveToTx(C(t1),Tx);
		lineToTx(C(t2),Tx);
		context.stroke();
		
	        }
		
	}
	
	var road_to_canvas = mat3.create();
	mat3.fromTranslation(road_to_canvas,[300,360]);
	mat3.scale(road_to_canvas,road_to_canvas,[220,-220]); 
	
	drawTrajectory(0.0,1.0,500,C0,road_to_canvas,"Black");
	drawTrajectory(1.0,2.0,500,C1,road_to_canvas,"black");
	drawTrajectory(2.0,3.0,500,C2,road_to_canvas,"black");
	drawTrajectory(3.0,4.0,500,C3,road_to_canvas,"black");
	
	var line_to_canvas = mat3.create();
	mat3.fromTranslation(line_to_canvas,[300,360]);
	mat3.scale(line_to_canvas,line_to_canvas,[220,-220]); 
	
	drawTrajectory2(0.0,1.0,100,C0,line_to_canvas,"green");
	drawTrajectory2(1.0,2.0,100,C1,line_to_canvas,"green");
	drawTrajectory2(2.0,3.0,100,C2,line_to_canvas,"grenn");
	drawTrajectory2(3.0,4.0,100,C3,line_to_canvas,"green");
	
	var car_to_road = mat3.create();
	mat3.fromTranslation(car_to_road,Ccomp(tParam));
	
	var car_to_canvas = mat3.create();
	var tangent = Ccomp_tangent(tParam);
	var angle = Math.atan2(tangent[1],tangent[0]);
	mat3.rotate(car_to_road,car_to_road,angle);
	mat3.scale(car_to_road,car_to_road,[0.8,0.8]); 
	mat3.multiply(car_to_canvas, road_to_canvas, car_to_road);
	uglyCar("rgb(32, 165, 9)",car_to_canvas);
	
    }

    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;