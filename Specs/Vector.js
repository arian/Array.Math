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


describe('Vector', function(){
	it('Create a vector', function(){
		expect(new Vector([1,2,3]).inspect()).toBe('[1, 2, 3]')
	});
	it('Create a vector from a string', function(){
		expect(new Vector('1 2 3').inspect()).toBe('[1, 2, 3]')
	});
});

describe('Vector.Random', function(){
	it('Create a random vector', function(){
		expect(Vector.Random(3).getDimensions()).toBe(3)
	});
});

describe('Vector.Zero', function(){
	it('Create a empty vector', function(){
		expect(Vector.Zero(3).inspect()).toBe('[0, 0, 0]')
	});
});

describe('Vector.i', function(){
	it('Cartesian vector i', function(){
		expect(Vector.i.inspect()).toBe('[1, 0, 0]')
	});
});
describe('Vector.j', function(){
	it('Cartesian vector j', function(){
		expect(Vector.j.inspect()).toBe('[0, 1, 0]')
	});
});
describe('Vector.k', function(){
	it('Cartesian vector k', function(){
		expect(Vector.k.inspect()).toBe('[0, 0, 1]')
	});
});

describe('Vector.Random', function(){
	it('Create a random vector', function(){
		expect(Vector.Random(3).elements.length).toBe(3)
	});
});

describe('setElements', function(){
	it('setElements with array', function(){
		expect(createVector().setElements([1,2,3]).inspect()).toBe('[1, 2, 3]')
	});
	it('setElements with arguments', function(){
		expect(createVector().setElements(1,2,3).inspect()).toBe('[1, 2, 3]')
	});
	it('setElements with string', function(){
		expect(createVector().setElements('1 2 3').inspect()).toBe('[1, 2, 3]')
	});
	it('setElements with Vector', function(){
		expect(createVector().setElements(new Vector('1 2 3')).inspect()).toBe('[1, 2, 3]')
	});
});

describe('getElement', function(){
	it('Get a entity', function(){
		expect(new Vector('1 2 3').getElement(2)).toBe(2)
	});
});

describe('getDimensions', function(){
	it('get the dimensions of the vector', function(){
		expect(new Vector('1 2 3').getDimensions()).toBe(3)
	});
});

describe('getModulus', function(){
	it('Get the modulus (or the vector length)', function(){
		expect(new Vector('4 3').getModulus()).toBe(5)
	});
});

describe('isEqual', function(){
	it('Compare two vectors', function(){
		expect(new Vector('4 3').isEqual(new Vector(4,3))).toBeTruthy()
	});
});

describe('dot', function(){
	it('Dot product', function(){
		expect(new Vector('4 3').dot(new Vector(4,3))).toBe(25)
	});
});
describe('cross', function(){
	it('cross product', function(){
		expect(new Vector('4 3 0').cross(new Vector(4,3,1))).toEqual([3, -4, 4])
	});
});


})();