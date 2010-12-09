/*
---
name: Vector

description: Provides a way to use Vectors in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires:
  - Core/Class
  - Core/Array
  - Core/Number
  - Array.Math
  - Complex/Complex

provides:
  - Vector

...
*/

(function(){

var Vector = this.Vector = new Class({

	elements: [],

	initialize: function(){
		this.setElements(arguments);
	},

	setElements: function(){
		var els = Array.from(arguments).flatten();
		if (els[0].elements) els = els[0].elements;
		if (typeof els[0] == 'string') els = els[0].split(' ');
		this.elements = Array.from(els.elements || els).map(function(e){
			return Number.from(e);
		});
		return this;
	},

	getElement: function(i){
		return (i < 1 || i > this.elements.length) ? null : this.elements[i - 1];
	},

	setElement: function(i, value){
		if (i >= 1 && i <= this.elements.length) this.elements[i - 1] = Number.from(value);
		return this;
	},

	getDimensions: function(){
		return this.elements.length;
	},

	getModulus: function(){
		return this.elements.vectorLength();
	},

	isEqual: function(vector){
		var arr = vector.elements || vector,
			n = this.elements.length;
		if (arr.length != n) return false;
		var subtract = this.elements.subtract(vector);
		do {
			if (Math.abs(subtract[n] > Number.precision)) return false;
		} while (n--)
		return true;
	},

	clone: function(){
		return new Vector(this.elements);
	},

	map: function(){
		Array.prototype.map.apply(this.elements, arguments);
		return this;
	},

	each: function(){
		Array.prototype.each.apply(this.elements, arguments);
		return this;
	},

	toUnitVector: function(){
		this.elements.normalize();
	},

	getAngle: function(vector){
		this.elements.angle(vector.elements || vector);
	},

	isParallelTo: function(vector){
		var angle = this.getAngle(vector);
		return Math.abs(angle) <= Number.precision;
	},

	isAntiParallelTo: function(vector){
		var angle = this.getAngle(vector);
		return Math.abs(angle - Math.PI) <= Number.precision;
	},

	isPerpendicularTo: function(vector){
		return Math.abs(this.dot(vector)) <= Number.precision;
	},

	add: function(){
		this.elements = Array.prototype.add.apply(this.elements, arguments);
		return this;
	},

	subtract: function(){
		this.elements = Array.prototype.subtract.apply(this.elements, arguments);
		return this;
	},

	multiply: function(){
		this.elements = Array.prototype.product.apply(this.elements, arguments);
		return this;
	},

	dot: function(vector){
		return Array.prototype.dot.apply(this.elements, [vector.elements || vector]);
	},

	cross: function(vector){
		return Array.prototype.cross.apply(this.to3D().elements, [vector.to3D ? vector.to3D().elements : vector]);
	},

	max: function(){
		m = 0;
		this.map(function(e){
			e = Math.abs(e);
			if (e > m) m = e;
		});
		return m;
	},

	indexOf: function(x){
		return this.elements.indexOf(x);
	},

	round: function(){
		return this.map(function(x){
			return Math.round(x);
		});
	},

	snapTo: function(x){
		return this.map(function(e){
			return Math.abs(e - x) <= Number.precision ? x : e;
		});
	},

	getDistanceFrom: function(){
		return Array.prototype.distance(this.elements, arguments);
	},

	to3D: function(){
		var l = this.elements.length;
		if (l < 3){
			var n = 3 - l;
			do {
				this.elements.push(0)
			} while (n--);
		}
		this.elements = this.elements.slice(0, 3);
		return this;
	},

	inspect: function(shrt){
		return (shrt === false ? '' : '[') + this.elements.join(shrt === false ? '\n' : ', ') + (shrt === false ? '' : ']');
	},

	toArray: function(){
		return this.elements;
	}

});

Vector.extend({

	from: function(){
		var els = Array.from(arguments).flatten();
		if (typeOf(els[0]) == 'object' && Object.values) els = Object.values(els[0]);
		return new Vector(els);
	},

	Random: function(n){
		var els = [];
		while (n--){
			els.push(Math.random());
		}
		return new Vector(els);
	},

	Zero: function(n){
		var els = [];
		while (n--){
			els.push(0);
		}
		return new Vector(els);
	},

	i: new Vector('1 0 0'),
	j: new Vector('0 1 0'),
	k: new Vector('0 0 1')

});

})();

