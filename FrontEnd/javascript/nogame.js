var no=7;
var no1  = Number(prompt("Guess the number : "));

if(no1>no)
{
	alert("To High.Try Again")
}

else if(no1<no)
{
	alert("To Low.Try Again")
}

else if(no1===no){
	alert("You gussed it!!!")
}