/*
---
name: Number

description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: 
  - Complex
  - Core/Number

provides:
  - Number

...
*/

Number.precision = 1e-6;

(function(){

var methods = {};
['multiply', 'devide', 'add', 'substract'].each(function(method){
	methods[method] = function(number){
		return Complex.from(this)[method](number);
	};
});

Object.append(methods, {
	toComplex: function(){
		return Complex.from(this);
	}
});

Number.implement(methods);

})();

// Replace sqrt method so it can handle negative values
(function(sqrt){
	
Number.prototype.sqrt = function(){
	if(this < 0) return new Complex(0, Math.sqrt(-this));
	return sqrt.apply(this);
};
	
})(Number.prototype.sqrt);

