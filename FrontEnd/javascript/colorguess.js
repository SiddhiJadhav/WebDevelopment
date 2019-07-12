var numsquares=6;

var colors = generateRandomColor(numsquares);

var squares = document.querySelectorAll(".square");
var pickedColor = pickcolor();
var colorDisplay = document.querySelector("#colorDisplay")
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1");
var resetbutton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easybtn");
var hardBtn = document.querySelector("#hardbtn");

easyBtn.addEventListener("click",function(){
	hardBtn.classList.remove("selected");
	easyBtn.classList.add("selected");
	numsquares=3;
	resetAll(numsquares);
});

hardBtn.addEventListener("click",function(){
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	numsquares=6;
	resetAll(numsquares);
});


resetbutton.addEventListener("click",function(){
	resetAll(numsquares);
});

function resetAll(numsquares)
{
	colors = generateRandomColor(numsquares);
	pickedColor = pickcolor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	for(var i = 0;i<squares.length;i++)
	{
		if(colors[i])
		{
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.backgroundColor = "#232323";
		}
	}
	
	h1.style.backgroundColor = "steelblue";
	resetbutton.textContent = "New Colors";
}

colorDisplay.textContent = pickedColor;

for (var i =  0; i <squares.length; i++) {
	//add initial colors
	squares[i].style.backgroundColor=colors[i];

	//add click listener
	squares[i].addEventListener("click",function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare with pickedColor
		if(clickedColor === pickedColor)
		{
			changeColors(clickedColor);
			messageDisplay.textContent = "Correct!";
			resetbutton.textContent = "Play Again?";
			h1.style.backgroundColor = clickedColor;
		}else{
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeColors(color)
{
	for(i =0;i <numsquares; i++)
	{
		squares[i].style.backgroundColor = color;
	}
}


function pickcolor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRandomColor(num)
{
	var arr=[];

	for(var i=0;i<num;i++)
	{
		arr.push(randomColor());
	}

	return arr;
}

function randomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}