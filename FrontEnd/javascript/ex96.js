var age = Number(prompt("What is your age?"));

if(age < 0)
{
	alert("Invalid Age");
}

if(age == 21)
{
	alert("Happy 21 st Birthday");
}

if((age % 2)!=0)
{
	alert("Your age is odd");
}

if(age % Math.sqrt(age) === 0)
{
  alert("Your age is a perfect square!");
}