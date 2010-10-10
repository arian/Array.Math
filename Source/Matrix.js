/*
---
name: Matrix

description: Provides a way to use Matrices in JavaScript

license: MIT-style

authors:
  - Arian Stolwijk

requires: 
  - Core/Class
  - Core/Array
  - Core/Number
  - Vector
  - Complex/Complex

provides:
  - Matrix

...
*/

(function(){

var Matrix = this.Matrix = new Class({
	
	vectors: [],
	
	initialize: function(){
		this.setVectors(Array.flatten(arguments));
	},
	
	setVectors: function(vects){
		var l = vects.length,
			matrix = [];
		vects.each(function(vec){
			if (instanceOf(vec, Vector)){
				matrix.push(vec);
			}
		});
		this.vectors = matrix;
	},
	
	getElement: function(m, n){
		var vec = this.getColumn(n);
		if (vec) return vec.getElement(m);
	},
	
	setElement: function(m, n, value){
		var vec = this.getColumn(n);
		if (vec) vec.setElement(m, value);
		return this;
	},
	
	getColumn: function(i){
		i = i - 1;
		if (this.vectors[i]) return this.vectors[i];
	},
	
	getRow: function(i){
		var row = [];
		this.each(function(vector){
			row.push(vector.getElement(i));
		});
		return new Vector(row);
	},
	
	getSize: function(){
		return {
			m: this.getRows(),
			n: this.getColumns()
		};
	},
	
	getRows: function(){
		var m = 0;
		this.vectors.each(function(vec){
			var l = vec.getDimensions();
			if (l > m) m = l;
		});
		return m;
	},
	
	getColumns: function(){
		return this.vectors.length;
	},
	
	each: function(){
		Array.prototype.each.apply(this.vectors, arguments);
		return this;
	},
	
	addToRow: function(m, value){
		if (!instanceOf(value, Vector)){
			value = Vector.Zero(this.getRows()).add(value);
		}
		this.vectors.each(function(vec, n){
			this.setElement(m, n + 1, vec.getElement(m) + value.getElement(n + 1));
		}.bind(this));
		return this;
	},
	
/*	
	ref: function(){
		var size = this.getSize();
		var i = 1, j = 1l
		while (i <= size.m && j <= size.n){
			maxi = i;
		}
	},
*/	
	inspect: function(){
		var i, l, size = this.getSize();
		var row, rows = [];
		for (i = 1; i <= size.m; i++){
			row = [];
			this.vectors.each(function(vec){
				row.push(vec.getElement(i));
			});
			rows.push(row.join(' '));
		}
		return '[' + rows.join('\n') + ']';
	}
	
});

Matrix.extend({
		
	Random: function(m, n){
		if (!n) n = m;
		var els = [];
		do {
			els.push(Vector.Random(m));
		} while (--n);
		return new Matrix(els);
	},
	
	Zero: function(m, n){
		if (!n) n = m;
		var els = [];
		do {
			els.push(Vector.Zero(m));
		} while (--n);
		return new Matrix(els);		
	},
	
	Diagonal: function(els){
		els = new Vector(arguments).toArray();
		var vectors = [], l = els.length;
		els.each(function(el, i){
			var vec = new Vector.Zero(l);
			vec.setElement(i + 1, el);
			vectors.push(vec);
		});
		return new Matrix(vectors);
	}
	
});

Matrix.extend({
	I: function(m, n){
		var matrix = Matrix.Zero(m, n);
		matrix.each(function(vec, i){
			vec.setElement(i + 1, 1);
		});
		return matrix;
	}
});

Matrix.extend({
	Identity: Matrix.I
});


Vector.implement({
	
	getDiagnalMatrix: function(){
		return Matrix.Diagonal(this.elements);
	}
	
});


})();

