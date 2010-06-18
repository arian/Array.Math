/*
Script: Vector.js
	Specs for Vector.js

License:
	MIT-style license.
*/

(function(){

var createVector = function(){
	return new Vector('2 3 5'); 
},
vec = createVector(); 


describe('Vector', {
	'Create a vector': function(){
		value_of(new Vector([1,2,3]).inspect()).should_be('[1, 2, 3]')
	},
	'Create a vector from a string': function(){
		value_of(new Vector('1 2 3').inspect()).should_be('[1, 2, 3]')
	}
});

describe('Vector.Random', {
	'Create a random vector': function(){
		value_of(Vector.Random(3).getDimensions()).should_be(3)
	}
});

describe('Vector.Zero', {
	'Create a empty vector': function(){
		value_of(Vector.Zero(3).inspect()).should_be('[0, 0, 0]')
	}
});

describe('Vector.i', {
	'Cartesian vector i': function(){
		value_of(Vector.i.inspect()).should_be('[1, 0, 0]')
	}
});
describe('Vector.j', {
	'Cartesian vector j': function(){
		value_of(Vector.j.inspect()).should_be('[0, 1, 0]')
	}
});
describe('Vector.k', {
	'Cartesian vector k': function(){
		value_of(Vector.k.inspect()).should_be('[0, 0, 1]')
	}
});

describe('Vector.Random', {
	'Create a random vector': function(){
		value_of(Vector.Random(3).elements.length).should_be(3)
	}
});

describe('setElements', {
	'setElements with array': function(){
		value_of(createVector().setElements([1,2,3]).inspect()).should_be('[1, 2, 3]')
	},
	'setElements with arguments': function(){
		value_of(createVector().setElements(1,2,3).inspect()).should_be('[1, 2, 3]')
	},
	'setElements with string': function(){
		value_of(createVector().setElements('1 2 3').inspect()).should_be('[1, 2, 3]')
	},
	'setElements with Vector': function(){
		value_of(createVector().setElements(new Vector('1 2 3')).inspect()).should_be('[1, 2, 3]')
	}
});

describe('getElement', {
	'Get a entity': function(){
		value_of(new Vector('1 2 3').getElement(2)).should_be(2)
	}
});

describe('getDimensions', {
	'get the dimensions of the vector': function(){
		value_of(new Vector('1 2 3').getDimensions()).should_be(3)
	}
});

describe('getModulus', {
	'Get the modulus (or the vector length)': function(){
		value_of(new Vector('4 3').getModulus()).should_be(5)
	}
});

describe('isEqual', {
	'Compare two vectors': function(){
		value_of(new Vector('4 3').isEqual(new Vector(4,3))).should_be_true()
	}
});

describe('dot', {
	'Dot product': function(){
		value_of(new Vector('4 3').dot(new Vector(4,3))).should_be(25)
	}
});
describe('cross', {
	'cross product': function(){
		value_of(new Vector('4 3 0').cross(new Vector(4,3,1))).should_be([3, -4, 4])
	}
});


})();