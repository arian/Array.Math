
Number.implement({
	
	multiply: function(number){
		number = Complex.from(number);
		return number.real * this;
	},
	
	devide: function(number){
		number = Complex.from(number);
		return this / number.real;
	},
	
	add: function(number){
		number = Complex.from(number);
		return this + number.real;
	},
	
	substract: function(number){
		number = Complex.from(number);
		return this - number.real;
	}	
	
});

(function(){
var old = Number.prototype.sqrt;

// Replace sqrt method so it can handle negative values
Number.prototype.sqrt = function(){
	if(this < 0) return new Complex(0, Math.sqrt(-this));
	return old.apply(this);
};

})();
