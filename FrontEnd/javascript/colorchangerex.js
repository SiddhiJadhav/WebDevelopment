var button = document.querySelector("button");
var body = document.querySelector("body");

button.addEventListener("click",function(){

var color = generateColor();


body.style.background = color;

});

function generateColor()
{
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	// console.log(red);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
