var li=document.querySelectorAll("li");

for (var i =0 ; i <li.length; i++)
{
	li[i].addEventListener("mouseover",function(){
		this.style.color="green";
	});

	li[i].addEventListener("mouseout",function(){
		this.style.color="black";
	});

}