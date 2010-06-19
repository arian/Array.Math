
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


var oldSqrt = Number.prototype.sqrt;

// Replace sqrt method so it can handle negative values
Number.prototype.sqrt = function(){
	if(this < 0) return new Complex(0, Math.sqrt(-this));
	return oldSqrt.apply(this);
};

})();
