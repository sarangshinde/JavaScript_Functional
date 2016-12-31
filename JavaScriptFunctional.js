  //---------------------------Object oriented Style ----------------------------------------

 var columnbian={ name : 'columnbian',basePrice :5};
var indian={ name : 'indian',basePrice :15};
var american={ name : 'american',basePrice :10};

function	printPrice(coffee,	size)	{
		if	(size	==	'small')	{
				var	price	=	coffee.basePrice	+	2;
		}
		else	if	(size	==	'medium')	{
				var	price	=	coffee.basePrice	+	4;
		}
		else	{
				var	price	=	coffee.basePrice	+	6;
		}
		
				var	node	=	document.createElement("li");
		var	label	=	coffee.name	+	'	'	+	size;
		var	textnode	=	document.createTextNode(label+'	price:	$'+price);
		node.appendChild(textnode);
		document.getElementById('products').appendChild(node);
}



printPrice(columnbian,	'small');
printPrice(columnbian,	'medium');

  //---------------------------END Object oriented Style ----------------------------------------

  	//---------------------------Functional Style -------------------------------------------------

//Factories

function bindFirstArgument(func,argx){

	return function(argy){
		return func(argx,argy);
	};
}

var powof2 = bindFirstArgument(Math.pow,2);
console.log(powof2(3));

//More Genric
var makePowersOf= bindFirstArgument(bindFirstArgument,Math.pow);
var powOf3 = makePowersOf(3);
console.log(powOf3(2));


//------------------------------------------------------------------------------------------------------------------------------

//partial function from left

Function.prototype.partialApply=function(){

	var func= this;
	args = Array.prototype.slice.call(arguments);

	return function(){

		return func.apply(this,args.concat(Array.prototype.slice.call(arguments)));

	};

}

function num2Hex()
{

	function componentToHex(cmp){
		var hex= cmp.toString(16);
		if(hex.length==1)
			return "0"+hex;
		else
			return hex;
	}

	return Array.prototype.map.call(arguments,componentToHex).join(' ');
	
}

console.log(num2Hex());
console.log(num2Hex(100,200));	

var	myOUI	=	123;
var	getMacAddress	=	num2Hex.partialApply(myOUI);
console.log(getMacAddress());

//partial function from right

Function.prototype.partialApplyRight	=	function(){
		var	func	=	this;	
		args	=	Array.prototype.slice.call(arguments);
		return	function(){
				return	func.apply(
						this,
						[].slice.call(arguments,	0)
						.concat(args));
		};
};
var	shadesOfBlue	=	num2Hex.partialApplyRight(255);
console.log(shadesOfBlue(123,	0));			//	'7b00ff'
console.log(shadesOfBlue(100,	200));	//	'64c8ff'
var	shadesOfGreen	=	num2Hex.partialApplyRight(255,	0);
console.log(shadesOfGreen(123));