var p1 = document.querySelector("#p1");
var p2 = document.querySelector("#p2");
var reset = document.querySelector("#reset");
var input = document.querySelector("input");
var span = document.querySelector("p span");
var s1 = document.querySelector("#s1");
var s2 = document.querySelector("#s2");

var p1score=0;
var p2score=0;

var gameOver=false;
var win=5;

p1.addEventListener("click",function(){
	if(!gameOver)
	{
		p1score++;
		if(p1score === win)
		{
			gameOver=true;
			s1.style.color="green";
		}
	    s1.textContent=p1score;
	}
});


p2.addEventListener("click",function(){
	if(!gameOver)
	{
		p2score++;
		if(p2score === win)
		{
			gameOver=true;
			s2.style.color="green";
		}
	    s2.textContent=p2score;
	}
});

reset.addEventListener("click",function(){
	reset1();
});

function reset1()
{
	p1score=0;
	p2score=0;
	s1.textContent=0;
	s2.textContent=0;
	s1.style.color="black";
	s2.style.color="black";
	gameOver=false;
}


input.addEventListener("change",function(){
	span.textContent=this.value;
	win=Number(this.value);
	reset1();

});