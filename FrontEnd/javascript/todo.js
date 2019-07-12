var toin=[];

var input = prompt("What you want to do?");


while(input != "quit")
{
	if(input === "new")
	{
		newtodo();
	}
	else if(input === "list")
	{
		listtodo();
	}
	else if(input === "delete")
	{
		deletetodo();
	}

	input = prompt("What you want to do?");

}

console.log("You quit the app");

function newtodo()
{
		var newtodo = prompt("Enter item to add into todo list...");
		toin.push(newtodo);
		console.log(newtodo + " is added to todo list.")
}

function listtodo()
{
	console.log("*******************");
		toin.forEach(function(print,index)
		{
				console.log(index + ":" +print)
		});
		console.log("*******************");
}

function deletetodo()
{
	var i = prompt("Enter index to delete ");

		toin.splice(i,1);
		console.log("Deleted todo");
}
