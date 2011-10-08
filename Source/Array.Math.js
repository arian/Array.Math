/*
---
name: Array.Math

description: Array.Math is an extension for Array with Math methods

license: MIT-style

authors:
  - Arian Stolwijk

requires:
  - Core/Array

provides:
  - Array.Math
  - Array.sum
  - Array.product
  - Array.quotient
  - Array.power
  - Array.add
  - Array.substract
  - Array.count
  - Array.range
  - Array.sequence
  - Array.median
  - Array.variance
  - Array.stdDeviation
  - Array.transpose
  - Array.dot
  - Array.cross
  - Array.project
  - Array.determinant
  - Array.vectorLength
  - Array.normalize
  - Array.slope
  - Array.distance

...
*/
(function(){

function isSquare(matrix){
	var n = matrix.count();
	return matrix.every(function(line){
		return line.count() == n;
	});
}

function Sarrus(m){
	return m[0][0] * m[1][1] * m[2][2] +
		m[0][1] * m[1][2] * m[2][0] +
		m[0][2] * m[1][0] * m[2][1] -
		m[0][2] * m[1][1] * m[2][0] -
		m[0][1] * m[1][0] * m[2][2] -
		m[0][0] * m[1][2] * m[2][1];
}

function Laplace(matrix){
	var det = 0,
		l = matrix.length,
		cache = copy(matrix, 1);

	for (var i = 0; i < l; ++i){
		det += Math.pow(-1, i+2) * matrix[i][0] * copy(cache).splice(i, 1).determinant();
	}

	return det;
}

/**
 * Returns a two-level deep copy of an array.
 */
function copy(array, i)
{
	var copied = [];
	array.each(function(line){
		copied.push(line.slice(i));
	});
	return copied;
}

Array.implement({

	toNumbers: function(){
		return this.map(Number.from);
	},

	sortNumbers: function(){
		return this.sort(function(a, b){
			return a - b;
		});
	},

	// Calculus

	sum: function(start, length){
		var sum = 0,
			start = start ? start : 0,
			length = length ? length : this.count() - start;
		length = start ? length + 2 : length;
		for (var i = start; i < length; i++) sum += this[i];
		return sum;
	},

	product: function(p){
		var isArray = typeOf(p) == 'array';
		return this.map(function(entity, i){
			return entity * (isArray ? p[i] : p);
		});
	},

	quotient: function(q){
		var isArray = typeOf(q) == 'array';
		return this.map(function(entity, i){
			return entity / (isArray ? q[i] : q);
		});
	},

	power: function(pow){
		var isArray = typeOf(pow) == 'array';
		return this.map(function(entity, i){
			return Math.pow(entity, isArray ? pow[i] : pow);
		});
	},

	add: function(add){
		var isArray = typeOf(add) == 'array';
		return this.map(function(entity, i){
			return entity + (isArray ? add[i] : add);
		});
	},

	subtract: function(subtract){
		var isArray = typeOf(subtract) == 'array';
		return this.map(function(entity, i){
			return entity - (isArray ? subtract[i] : subtract);
		});
	},

	count: function(){
		return this.length;
	},

	range: function(start, end, step){
		if (!step) step = 1;
		for (var i = start; i <= end; i += step) this.push(i);
		return this;
	},

	sequence: function(fn,start,length){
		if (start == null) start = 0;
		if (!length) length = 10;
		for (var i = start; i < (start + length); i++){
			var e = fn.call(this, i);
			if (e != null || e != undefined) this[i] = e;
		}
		return this;
	},

	// Statistics

	median: function(){
		var arr = this.toNumbers().sortNumbers();
		var middle = (arr.length + 1) / 2;
		return (arr.length % 2) ? arr[middle - 1] : (arr[middle - 1.5] + arr[middle - 0.5]) / 2;
	},

	variance: function(){
		var length = this.count(),
			avg = this.sum() / length;
		return this.subtract(avg).power(2).sum() / length;
	},

	stdDeviation: function(){
		return Math.sqrt(this.variance());
	},

	// Vector and matrices

	transpose: function(){
		var trans = [];
		this.each(function(row, y){
			row.each(function(col, x){
				if (!trans[x]) trans[x] = [];
				trans[x][y] = col;
			});
		});
		return trans;
	},

	dot: function(arr2){
		return this.product(arr2).sum();
	},

	cross: function(arr2){
		return [
			this[1] * arr2[2] - this[2] * arr2[1],
			this[2] * arr2[0] - this[0] * arr2[2],
			this[0] * arr2[2] - this[2] * arr2[0]
		];
	},

	projection: function(proj){
		return proj.product(this.dot(proj) / proj.dot(proj));
	},

	determinant: function(){
		if (!isSquare(this)) return 0; // only square matrices have determinants
		switch (this.count())
		{
			case 1:
				return this[0];
			case 2:
				return this[0][0] * this[1][1] - this[0][1] * this[1][0];
			case 3:
				return Sarrus(this);
			default:
				return Laplace(this);
		}
	},

	vectorLength: function(){
		return Math.sqrt(this.dot(this));
	},

	normalize: function(){
		return this.quotient(this.vectorLength());
	},

	angle: function(a){
		return Math.acos(this.dot(a) / (this.vectorLength() * a.vectorLength()));
	},

	// Geometry

	slope: function(p2){
		return (p2[1] - this[1]) / (p2[0] - this[0]);
	},

	distance: function(p2){
		return Math.sqrt(this.subtract(p2).power(2).sum());
	}

});

})()