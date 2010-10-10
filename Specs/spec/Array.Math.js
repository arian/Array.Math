/*
Script: Array.Math.js
	Specs for Array.Math.js

License:
	MIT-style license.
*/

describe('sum', function(){
	
	it('All the entities in the array should be summated', function(){
		expect([1, 2, 3].sum()).toBe(6)
	});
	
	it('Sum a part of the array', function(){
		expect([2, 5, 2, 7, 7, 12, 8].sum(2, 3)).toBe(16);
	});
	
	
});

describe('product', function(){
	
	it('The product of an array and a number', function(){
		expect([2, 5, 6, 2].product(3)).toEqual([6, 15, 18, 6]);
	});
	
	it('The product of an array with another array', function(){
		expect([2, 5, 6, 2].product([5, 2, 8, 4])).toEqual([10, 10, 48, 8])
	});
	
});

describe('quotient', function(){
	
	it('The quotient of an array and a number', function(){
		expect([9, 12, 15].quotient(3)).toEqual([3, 4, 5]);
	});
	
	it('The quotient of an array with another array', function(){
		expect([2, 10, 24].quotient([2, 2, 8])).toEqual([1, 5, 3])
	});
	
});

describe('power', function(){
	
	it('The power of an array and a number', function(){
		expect([3, 6, 2].power(3)).toEqual([27, 216, 8]);
	});
	
	it('The power of an array with another array', function(){
		expect([3, 6, 2].power([3, 2, 1])).toEqual([27, 36, 2]);
	});
	
});

describe('add', function(){
	
	it('add a number to each entity of the array', function(){
		expect([2, 5, 1].add(4)).toEqual([6, 9, 5]);
	});
	
	it('add two arrays', function(){
		expect([3, 6, 2].add([3, 2, 1])).toEqual([6, 8, 3]);
	});
	
});


describe('substract', function(){
	
	it('substract a number from each entity of the array', function(){
		expect([6, 9, 5].substract(4)).toEqual([2, 5, 1]);
	});
	
	it('substract two arrays', function(){
		expect([6, 9, 5].substract([4, 5, 3])).toEqual([2, 4, 2]);
	});
	
});

describe('count', function(){
	it('count number of entities in array', function(){
		expect([1, 3, 56, 3, 56].count()).toBe(5);
	});
});

describe('range', function(){
	it('set a range of numbers in a array', function(){
		expect([].range(1, 8, 2)).toEqual([1, 3, 5, 7]);
	});
});

describe('sequence', function(){
	
	it('Should return e', function(){
		
		var factorial = function(n){
			if(n == 0) return 1;
			var ans = 1;
			for(var i = n-1; i; i--) 
				ans = ans * (i + 1);
			return ans;
		};

		
		var e = [].sequence(function(n){
			return 1 / factorial(n);
		}, 0, 10).sum();
		e = Math.round(e * 1e9) * 1e-9;
		expect(e).toBe(2.718281526);
		
	});
	
	it('create a sequence', function(){
		expect([].sequence(function(n){
				return Math.pow(-1, n);
			}, 0, 5)).toEqual([1, -1, 1, -1, 1]);
	});
	
	it('create a recursive sequence (fibonacci)', function(){
		expect([1, 1].sequence(function(n){
			this[n + 2] = this[n] + this[n + 1];
		}, 0, 4)).toEqual([1, 1, 2, 3, 5, 8]);
	});
	
});

describe('median', function(){
	
	it('odd length', function(){
		expect([1, 5, 2, 8, 7].median()).toBe(5);
	});
	
	it('even length', function(){
		expect([1, 5, 2, 8, 7, 2].median()).toBe(3.5);
	});
	
});

describe('variance', function(){
	it('variance', function(){
		expect([3, 7, 7, 19].variance()).toBe(36);
	});
});

describe('stdDeviation', function(){
	it('Standard Deviation', function(){
		expect([3, 7, 7, 19].stdDeviation()).toBe(6);
	});
});

describe('transpose', function(){
	it('Transpose Matrix', function(){
		expect([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ].transpose()).toEqual([ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
	});
});

describe('dot', function(){
	it('Dot product', function(){
		expect([1, 2, 3].dot([4, 5, 6])).toBe(32);
	});
});

describe('cross', function(){
	it('Cross product', function(){
		expect([1, 2, 3].cross([4, 5, 6])).toEqual([-3, 6, -6]);
	});
});

describe('projection', function(){
	it('Projection of a vector on another one, Gram-Schmidt', function(){
		expect([3, 3].projection([2, 0])).toEqual([3, 0]);
	});
});

describe('determinant', function(){
	it('Calculate the determinant', function(){
		expect([[4, 6], [3, 5]].determinant()).toBe(2);
	});
});

describe('vectorLength', function(){
	it('Calculate the determinant', function(){
		expect([3, 6, 2].vectorLength()).toBe(7);
	});
});

describe('normalize', function(){
	
	it('Normalize a vector to a unit vector', function(){
		expect([8, 6].normalize()).toEqual([4/5, 3/5]);
	});
	
	it('Normalize vector length', function(){
		expect([8, 6].normalize().vectorLength()).toBe(1);
	});
});

describe('angle', function(){
	it('Calculate the angle between two vectors', function(){
		expect([3, 7, 1].angle([3, 3, 6]) / Math.PI ).toBe(0.2798476073884561);
	});
});

describe('slope', function(){
	it('Calculate the slope between two points', function(){
		expect([3, 4].slope([5, 8])).toBe(2);
	})
});

describe('distance', function(){
	it('Calculate the distence between two points', function(){
		expect([4, 1].distance([7, 5])).toBe(5);
	});
});

