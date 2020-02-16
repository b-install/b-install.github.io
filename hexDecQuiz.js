/*
 * This program quizzes you on conversions from hexadecimal to decimal.
 */
 
var NUMBER_BASE = 16;
var MAX_HEX_LENGTH = 4;

function start()
{
    var hexlen = 0;
    while(hexlen < 1 || hexlen > MAX_HEX_LENGTH)
    {
        hexlen = readInt("How long do you want the hex digits to be? (max " + MAX_HEX_LENGTH + ")");
    }
    
    var guess = 0, count = 0, numCorrect = 0;
    
    while (guess != -1){
        var hexString = randomHex(hexlen);
        //var hexString = "bea2"; //test case. The answer is 48802
        
        println("Score: " + numCorrect + " / " + count + " | Enter -1 to quit");
        guess = readInt(hexString + " (hex) = ");
        CodeHSConsole.clear(); //clears previous answers once a new answer is entered

        var decimalValue = hexToDecimal(hexString);
        
        if(guess == decimalValue){
            print("CORRECT! ");
            numCorrect++;
        }
        else{
            print("INCORRECT! ");
        }
        println(hexString + " (hex) = " + decimalValue + " (decimal)");
        println(" ");
        count++;
    }
    count--; //user didn't answer the last question because they entered -1 to quit
    CodeHSConsole.clear();
    println("Final score: " + numCorrect + " / " + count);
}
 
function randomHex(len) { //generates a hexadecimal string of a given length
    var current = Randomizer.nextInt(1, 15); //the first character has a minimum value of 1, ensuring that the number will always have a length of len
    var num = current.toString(16);
    
    for(var i = 1; i < len; i++){ //adapted from Randomizer.nextHex in CodeHS library
        current = Randomizer.nextInt(0, 15);
        num = num + current.toString(16);
    }
    return num;
    
    
}
 
function hexToDecimal(hexString) //This function was taken from CodeHS 7.5.3
{
    // Get the number of places in this hex number
    var numPlaces = hexString.length;
    
    // Get the current exponent starting with far left
    var currentExponent = numPlaces - 1;
    
    var decimalValue = 0;
    
    // Loop over each character of the hex string
    // and add the value of each place to the decimal value
    for(var i = 0; i < hexString.length; i++)
    {
        // Get the value of this place (16 ^ current exponent)
        var placeValue = Math.pow(NUMBER_BASE, currentExponent);
        
        // Get the value of the current hex digit
        var currentDigit = hexString.charAt(i);
        var digitValue = parseInt(currentDigit, NUMBER_BASE);
        
        // Print out the value at this place
        print(digitValue + " * (" + placeValue + ")");
        if(i != hexString.length - 1)
        {
            print(" + ");
        }
        
        // Add this value to the decimal result
        decimalValue += digitValue * placeValue;
        
        // Decrease the exponent by one for the next place
        currentExponent--;
    }
    
    println(" = " + decimalValue);
    
    return decimalValue;
}