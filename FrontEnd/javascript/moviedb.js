var movies=[
	{
		title:"In Bruges",
		rating:5,
		hasWatched:true
	},
	
	{
		title:"Frozen",
		rating:4.5,
		hasWatched:false
	},

	{
		title:"Mad Max Fury Road",
		rating:5,
		hasWatched:true
	},

	{
		title:"Les Miserable",
		rating:3.5,
		hasWatched:false
	}
];



movies.forEach(function(movie)
{
	if(movie.hasWatched===true)
	{
	console.log("You have seen \"" + movie.title + "\" - " + movie.rating +" stars");
	}
	else
	{
	console.log("You have not seen \"" + movie.title + "\" - " + movie.rating +" stars");
	}
});

