
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

//------------------------------------------------------------------------------------------------------------------------------


//Currying 

function rgb2Hex(r,g,b){
	return '#' + num2Hex(r) +num2Hex(g) +num2Hex(b);
}

Function.prototype.curry=function(numArgs){

	var func = this;
	numArgs = numArgs || func.length;

	//recursively aquire the arguments

	function subCurry(prev){

		return function(arg)
		{
			var args = prev.concat(arg);

			if(args.length<numArgs)
			{
				//recursive case we still need more arguments
				return subCurry(args);
			}
			else{
				//base case apply function
				return func.apply(this,args);
			}
		};

		
	}
			return subCurry([]);
}

var	hexColors	=	rgb2Hex.curry();
console.log(hexColors(11));	//	returns	a	curried	function
console.log(hexColors(11,12,123));	//	returns	a	curried	function
console.log(hexColors(11)(12)(123));	//	returns	#0b0c7b
console.log(hexColors(210)(12)(0));	//	returns	#d20c00

//-------------------------------------------------------------------------------------------------------------------------------

//Function composition

Function.prototype.compose	=	function(prevFunc)	{
		var	nextFunc	=	this;
		return	function()	{
				return	nextFunc.call(this,prevFunc.apply(this,arguments));
		}
}

function	function1(a){return	a	+	'	1';}
function	function2(b){return	b	+	'	2';}
function	function3(c){return	c	+	'	3';}
var	composition	=	function3.compose(function2).compose(function1);

console.log(composition('count'));	


//recursion

/*function fib(n) {
  if (n <= 1){
    return n;
  } else {
    return fib(n-1) + fib(n - 2);
  }
}*/
'use strict';
function fibIterRecursive(n, a, b){
  if (n === 0) {
    return b;
  } else {
    return fibIterRecursive(n-1, a + b, a);
  }
};

function fib(n){
  return fibIterRecursive(n, 1, 0);
}

fib(5);
