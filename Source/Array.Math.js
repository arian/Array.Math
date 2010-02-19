/*
---
description: Array.Math is an extension for Array with Math methods

license: MIT-style

authors:
- Arian Stolwijk

requires: 
  core/1.2.4: 
  - Array

provides: [Array.sum,Array.product,Array.quotient,Array.power,Array.add,Array.substract,Array.count,Array.range,Array.sequence,Array.median,Array.variance,Array.stdDeviation,Array.transpose,Array.dot,Array.cross,Array.project,Array.determinant,Array.vectorLength,Array.normalize,Array.slope,Array.distance]

...
*/

Array.implement({

	// Calculus
	
	sum: function(start,length){
		var sum = 0, 
			start = start ? start : 0,
			length = length ? length : this.count()-start;
		length = start ? length + 2 : length;
		for(var i=start;i<length;i++) sum += this[i];
		return sum;
	},
	
	product: function(p){
		var arr = $type(p) == 'array';
		return this.map(function(entity,i){
			return arr ? (entity * p[i]) : (entity * p);
		});
	},
	
	quotient: function(q){
		var arr = $type(q) == 'array';
		return this.map(function(entity,i){
			return arr ? (entity / q[i]) : (entity / q);
		});
	},
	
	power: function(pow){
		var arr = $type(pow) == 'array';
		return this.map(function(entity,i){
			return Math.pow(entity,arr ? pow[i] : pow);
		});
	},
	
	add: function(add){
		var arr = $type(add) == 'array';
		return this.map(function(entity,i){
			return arr ? entity + add[i] : entity + add;
		});
	},
	
	substract: function(substract){
		var arr = $type(substract) == 'array';
		return this.map(function(entity,i){
			return arr ? entity - substract[i] : entity - substract;
		});
	},
	
	count: function(){
		return this.length;
	},
	
	range: function(start,end,step){
		step = step ? step : 1;
		for(var i=start; i<=end;i+=step) this.push(i);
		return this;
	},
	
	sequence: function(fn,start,length){
		start = start ? start : 0;
		length = length ? length : 10;
		for(var i = start; i < (start+length); i++){
			var e = fn.apply(this,[i]);
			if(e) this[i] = e; 
		}
		return this;
	},
	
	// Statistics
	
	median: function(){
		this.sort();
		var middle = (this.length+1) / 2;
		return (this.length % 2) ? this[middle-1] : (this[middle - 1.5]+this[middle - 0.5])/2;
	},
	
	variance: function(){
		var length = this.count(), avg = this.sum()/length;
		return this.substract(avg).power(2).sum()/length;
	},
	
	stdDeviation: function(){
		return Math.sqrt(this.variance());
	},
	
	// Vector and matrices
	
	transpose: function(){
		var trans = [];
		this.each(function(row,y){
			row.each(function(col,x){
				if(!trans[x]) trans[x] = [];
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
			this[1]*arr2[2] - this[2]*arr2[1],
			this[2]*arr2[0] - this[0]*arr2[2],
			this[0]*arr2[2] - this[2]*arr2[0]
		];
	},
	
	projection: function(proj){
		return proj.product(this.dot(proj)/proj.dot(proj));
	},
	
	determinant: function(){
		if(this.count() == 2) // only 2x2 matrices for now
			return this[0][0] * this[1][1] - this[0][1] * this[1][0];
	},
	
	vectorLength: function(){
		return Math.sqrt(this.dot(this));
	},
	
	normalize: function(){
		return this.quotient(this.vectorLength());
	},
	
	angle: function(a){
		return Math.acos(this.dot(a)/(this.vectorLength()*a.vectorLength()));
	},
	
	// Geometry
	
	slope: function(p2){
		return (p2[1] - this[1]) / (p2[0] - this[0]); 
	},
	
	distance: function(p2){
		return Math.sqrt(this.substract(p2).power(2).sum());
	}
	
});
