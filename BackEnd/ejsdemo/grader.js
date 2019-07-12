var score=[90,98,89,100,100,86,94];
average(score);

function average(scoreList){
    var total = 0;
    var avg = 0;
    for(var i=0;i<scoreList.length;i++)
    {
        total = total + scoreList[i];
    }

    avg = total/scoreList.length;
    console.log(Math.round(avg));
}