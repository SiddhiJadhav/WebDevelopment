var arr=[1,1,1,1];
var pivot = arr[0];


function isUniform(arr)
{
	for(var i=1;i<3;i++)
	{
	if(arr[i]!==pivot)
	{
		return false;
	}
    }
    return true
}

var bb=isUniform(arr);
console.log(bb);
