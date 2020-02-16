
//window.onload = function() {



var can = document.getElementById("canvas_");
var ctx = can.getContext("2d");


var PET_DIM = 20; //starting size
var GROWTH_RATE = 0.5;
var brown = "#654321"

var h = can.getAttribute('height');
var w = can.getAttribute('width');

//pet stats
var pet; //the pet graphical object
var poops = []; //array to contain all poops in the cage

var health;
var happiness;
var petted;
var fed;
var age;
var alive = false;
var petSize = PET_DIM;
var name = "Pixel";

var degradeRate = 1;
var poopSize = 0;
var message = " ";
var message2 = " ";


//scorekeeping
var maxAge = 0;
var fedCount = 0;
var loveCount = 0;
var poopCount = 0;

//movement
var dx = -PET_DIM/2;
var dy = PET_DIM/2;

function start(){
    //makePet(PET_DIM, w/2, h/2);
    live();
   can.addEventListener("click", click, false);
}

function randomCare(){ //randomly feeds, pets, and cleans up
    if(Randomizer.nextBoolean(0.2)){
        love();
    }
    if(Randomizer.nextBoolean(0.3)){
        feed();
    }
    
    if(Randomizer.nextBoolean(0.1) && poops.length > 0){
        var i = Randomizer.nextInt(0, poops.length);
        remove(poops[i]);
    }
}




function makePet(size, x, y){
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(x, y, size, size);
}

function live(){ //makes Pixel live by resetting stats and size
    makePet(PET_DIM, w/4, h/2);

    alive = true;
    health = 20;
    petted = 0;
    fed = 0;
    age = 0;
    happiness = 50;
    petSize = PET_DIM;
    poops=[];
    setInterval(updatePet, 1000);
    //setInterval(randomCare, 3000);
}

function die(){
    message = "Dead";
    var alive = false;
    stopAllTimers();
    pet.setColor(Color.BLACK);
    //setTimeout(live, 5000);
    if(age>maxAge){
        maxAge = age;
    }
    status();
    can.addEventListener("click", revive, false);
}

function revive(){
    can.addEventListener("click", click, false);
    live();
}

function updatePet(){
    status();
    degradeRate = 1 + (poops.length/10);
    petSize += GROWTH_RATE;
    age++;
    
    if(happiness <= 0){
        message2 = name + " died of sadness";
        die;
        return;
    }
    
    if(health <= 0){
        message2 = name + " died of poor health";
        die();
        return;
    }
    
    if(fed >  50 || poopSize > petSize){
        message2 = name + " died of overfeeding";
        die();
        return;
    }
    
    
    //grows pet
    var roundedSize = Math.floor(petSize);
    if(roundedSize > petSize){
        makePet(roundedSize, pet.getX(), pet.getY());
    }
    

    //moves the pet
    checkWalls();
    pet.move(dx, dy);
    degradeHealth();

}

function degradeHealth(){

    if(petted > 0){
        petted--;
        happiness++;
        health++;
        
    }
    if(fed > 0){
        health++;
        fed--;
        poopSize++;
    }else{
        poop();
    }
    
    if(happiness > 100){
        happiness = 100;
    }
    health -= Math.floor(degradeRate);
    happiness --;
}

function poop(){
    var dookie = new Rectangle(poopSize, poopSize);
    dookie.setPosition(pet.getX(), pet.getY());
    dookie.setColor(brown);
    add(dookie);
    poops.push(dookie);
    poopCount++;
    poopSize = 0;
}

function click(e){
    var x = e.pageX-radius;
    var y = e.pageY-radius;

    var elem = getElementAt(x, y);
    if(elem){
        var p = poops.indexOf(elem);
        if(p > -1){
            displayMessage("Removing poop");
            remove(elem);
            poops.splice(p, 1);
        }else if(elem == pet && alive && petted < 20){
            love();
        }else if(elem == pet && alive && petted > 0){
            happiness--;
            message = name + "doesn't want to be pet right now";
        }
    }

}

function displayMessage(newMessage){
    
    if(message == " "){
        message = newMessage;
        setTimeout(function(){message = " ";}, 5000);
    }else if(message2 == " "){
        message2 = newMessage;
        setTimeout(function(){message2 = " ";}, 5000);
    }else{
        message = newMessage;
        setTimeout(function(){message = " ";}, 5000);
    }
}



function love(){ //pets the pet
    displayMessage("Petting...");
    petted +=5;
    loveCount++;
}

function feed(){ //feeds the pet
    displayMessage("Feeding...");
    fed = Math.floor(petSize/4);
    fedCount++;
    petSize += GROWTH_RATE;
}

function status(){ //prints out current stats of pet in console
    document.getElementById('ageStat').innerHTML="Age: " + age + " (max: " + maxAge + ")";
    document.getElementById('healthStat').innerHTML="Health: " + health;
    document.getElementById('pettedStat').innerHTML="Petted: " + petted;
    document.getElementById('fedStat').innerHTML="Fed: " + fed;
    document.getElementById('happyStat').innerHTML="Happy: " + happiness;
    document.getElementById('message1Stat').innerHTML=message;
    document.getElementById('message2Stat').innerHTML=message2;
}

function checkWalls(){
    // Bounce off right wall
    if(pet.getX() + petSize >= w){
        dx = -dx;
        pet.setPosition(w - petSize, pet.getY());
    }
    
    // Bounce off left wall
    if(pet.getX() <= 0){
        dx = -dx;
        pet.setPosition(0, pet.getY());
    }
    
    // Bounce off bottom wall
    if(pet.getY() + petSize >= h){
        dy = -dy;
        pet.setPosition(pet.getX(), h - petSize);
    }
    
    // Bounce off top wall
    if(pet.getY() <= 0){
        dy = -dy;
        pet.setPosition(pet.getX(), 0);
    }
}







    //if (typeof start === 'function') {
   //     start();
    //}
//};