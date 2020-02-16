
		//window.onload = function() {
		var count = 0;
		var ballCount = 0;
		var person = {
  			firstName: "John",
  			lastName : "Doe",
  			id       : 5566,
  			fullName : function() {
    			return this.firstName + " " + this.lastName;
  			}
		};
		var person2 = new Person;
		var canvas = document.getElementById("canvas_");


		function dick(){

			document.getElementById('demo').innerHTML="fucked!";
			count++;
			window.alert("fucked " + count + " times");
		}
		

		function start(){
			//drawCircle(10, getWidth()/2, getHeight()/2, Color.red);
			
			document.getElementById("canvas_").addEventListener("click", click, false)
		}

		function click(e){
			//drawCircle(10, e.getX(), getHeight()/2, Color.red);
			var radius = 10;
			var x = e.pageX-radius;
			var y = e.pageY-radius;

			document.getElementById('demo').innerHTML="balled! " + ballCount;
			//drawCircle(10, x, y, Randomizer.nextColor());
			makePet(10, x, y);
			ballCount++;
		}

		function drawCircle(radius, x, y, color){
			var ball = new Circle(radius);
			ball.setPosition(x, y);
			ball.setColor(color);
			add(ball);
		}

		function makePet(size, x, y){
		    //remove(pet);
		    pet = new Rectangle(size, size);
		    pet.setPosition(x, y);
		    pet.setColor(Color.BLUE);
		    add(pet);
		}














		//if (typeof start === 'function') {
	    //start();
    	//}
//};
	