/*
---
description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: [Core/Number, Complex]

provides:
  - Number

...
*/

Number.precision = 1e-6;

(function(){

var methods = {};
['multiply', 'devide', 'add', 'substract', 'power'].each(function(method){
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


/*
---
description: Provides a way to use Complex Numbers in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: [Core/Core, Core/Number]

provides:
  - Complex

...
*/

(function(){

var Complex = this.Complex = new Type('Complex', function(real, im){

	this.real = +Number.from(real);
	this.im = +Number.from(im);

});

Complex.from = function(obj){
	if(instanceOf(obj, Complex)) return obj;
	var type = typeOf(obj);
	if(type == 'array') return new Complex(obj[0], obj[1]);
	return new Complex(obj);
};

Complex.i = new Complex(0, 1);

Complex.implement({

	magnitude: function(){
		return Math.sqrt(this.real*this.real + this.im*this.im);
	},

	angle: function(){
		return Math.atan(this.im / this.real);
	},

	conjungate: function(){
		return new Complex(this.real, -this.im);
	},

	multiply: function(number){
		number = Complex.from(number);
		var real = number.real * this.real - number.im * this.im,
		im = this.im * number.real + number.im * this.real;
		this.real = real;
		this.im = im;
		return this;
	},

	devide: function(number){
		number = Complex.from(number);
		var real = (this.real * number.real + this.im * number.im) / (Math.pow(number.real, 2) + Math.pow(number.im, 2));
		var im = (this.im * number.real - this.real*number.im) / (Math.pow(number.real, 2) + Math.pow(number.im, 2));
		this.real = real;
		this.im = im;
		return this;
	},

	add: function(number){
		number = Complex.from(number);
		this.real += number.real;
		this.im += number.im;
		return this;
	},

	substract: function(number){
		this.add(Complex.from(number).multiply(-1));
		return this;
	},

	power: function(n){
		var r = this.magnitude(),
			phi = this.angle();
		this.real = Math.pow(r, n) * Math.cos(n * phi);
		this.im = Math.pow(r, n) * Math.sin(n * phi);
		return this;
	},

	clone: function(){
		return new Complex(this.real, this.im);
	},

	toString: function(){
		return this.real+'+'+this.im+'i';
	}

});

})();

