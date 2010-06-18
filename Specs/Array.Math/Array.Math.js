/*
Script: Array.Math.js
	Specs for Array.Math.js

License:
	MIT-style license.
*/

(function(){

describe('sum', {
	
	'All the entities in the array should be summated': function(){
		value_of([1, 2, 3].sum()).should_be(6)
	},
	
	'Sum a part of the array': function(){
		value_of([2,5,2,7,7,12,8].sum(2,3)).should_be(16);
	}
	
	
});

describe('product', {
	
	'The product of an array and a number': function(){
		value_of([2,5,6,2].product(3)).should_be([6,15,18,6]);
	},
	
	'The product of an array with another array': function(){
		value_of([2,5,6,2].product([5,2,8,4])).should_be([10,10,48,8])
	}
	
});

describe('quotient', {
	
	'The quotient of an array and a number': function(){
		value_of([9,12,15].quotient(3)).should_be([3,4,5]);
	},
	
	'The quotient of an array with another array': function(){
		value_of([2,10,24].quotient([2,2,8])).should_be([1,5,3])
	}
	
});

describe('power', {
	
	'The power of an array and a number': function(){
		value_of([3,6,2].power(3)).should_be([27,216,8]);
	},
	
	'The power of an array with another array': function(){
		value_of([3,6,2].power([3, 2, 1])).should_be([27,36,2]);
	}
	
});

describe('add', {
	
	'add a number to each entity of the array': function(){
		value_of([2,5,1].add(4)).should_be([6,9,5]);
	},
	
	'add two arrays': function(){
		value_of([3, 6, 2].add([3, 2, 1])).should_be([6,8,3]);
	}
	
});


describe('substract', {
	
	'substract a number from each entity of the array': function(){
		value_of([6,9,5].substract(4)).should_be([2,5,1]);
	},
	
	'substract two arrays': function(){
		value_of([6,9,5].substract([4, 5, 3])).should_be([2,4,2]);
	}
	
});

describe('count', {
	'count number of entities in array': function(){
		value_of([1,3,56,3,56].count()).should_be(5);
	}
});

describe('range', {
	'set a range of numbers in a array': function(){
		value_of([].range(1,8,2)).should_be([1,3,5,7]);
	}
});

describe('sequence', {
	
	'Should return e': function(){
		
		var factorial = function(n){
			if(n == 0) return 1;
			var ans = 1;
			for(i=n-1;i;i--) 
				ans = ans*(i+1);
			return ans;
		};

		
		var e = [].sequence(function(n){
			return 1/factorial(n);
		},0,10).sum();
		e = Math.round(e * 1e9) * 1e-9;
		value_of(e).should_be(2.718281526);
		
	},
	
	'create a sequence': function(){
		value_of([].sequence(function(n){
				return Math.pow(-1,n);
			},0,5)).should_be([1,-1,1,-1,1]);
	},
	
	'create a recursive sequence (fibonacci)': function(){
		value_of([1,1].sequence(function(n){
				this[n+2] = this[n]+this[n+1];
			},0,4)).should_be([1,1,2,3,5,8]);
	}
	
});

describe('median', {
	
	'odd length': function(){
		value_of([1,5,2,8,7].median()).should_be(5);
	},
	
	'even length': function(){
		value_of([1,5,2,8,7,2].median()).should_be(3.5);
	}
	
});

describe('variance', {
	'variance': function(){
		value_of([3,7,7,19].variance()).should_be(36);
	}
});

describe('stdDeviation', {
	'Standard Deviation': function(){
		value_of([3,7,7,19].stdDeviation()).should_be(6);
	}
});

describe('transpose', {
	'Transpose Matrix': function(){
		value_of([ [1,2,3], [4,5,6], [7,8,9] ].transpose()).should_be([ [1,4,7], [2,5,8], [3,6,9] ]);
	}
});

describe('dot', {
	'Dot product': function(){
		value_of([1,2,3].dot([4,5,6])).should_be(32);
	}
});

describe('cross', {
	'Cross product': function(){
		value_of([1,2,3].cross([4,5,6])).should_be([-3,6,-6]);
	}
});

describe('projection', {
	'Projection of a vector on another one, Gram-Schmidt': function(){
		value_of([3,3].projection([2,0])).should_be([3,0]);
	}
});

describe('determinant', {
	'Calculate the determinant': function(){
		value_of([[4,6],[3,5]].determinant()).should_be(2);
	}
});

describe('vectorLength', {
	'Calculate the determinant': function(){
		value_of([3,6,2].vectorLength()).should_be(7);
	}
});

describe('normalize', {
	
	'Normalize a vector to a unit vector': function(){
		value_of([8,6].normalize()).should_be([4/5,3/5]);
	},
	
	'Normalize vector length': function(){
		value_of([8,6].normalize().vectorLength()).should_be(1);
	}
});

describe('angle', {
	'Calculate the angle between two vectors': function(){
		value_of([3,7,1].angle([3,3,6]) / Math.PI ).should_be(0.2798476073884561);
	}
});

describe('slope', {
	'Calculate the slope between two points': function(){
		value_of([3,4].slope([5,8])).should_be(2);
	}
});

describe('distance', {
	'Calculate the distence between two points': function(){
		value_of([4,1].distance([7,5])).should_be(5);
	}
});








})();