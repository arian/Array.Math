
var GLOBAL = function(){
	for(var key in this) global[key] = this[key];
};

require.paths.push("./jasmine-node/lib");
var jasmine = require('jasmine');
var sys = require('sys');

for(var key in jasmine) global[key] = jasmine[key];

var isVerbose = false;
var showColors = true;
process.argv.forEach(function(arg){
  switch(arg) {
  case '--color': showColors = true; break;
  case '--noColor': showColors = false; break;
  case '--verbose': isVerbose = true; break;
  }
});


require('./mootools');
require('./../Source/Array.Math');

require('./../Source/Complex');
require('./../Source/Vector');
require('./../Source/Matrix');


jasmine.runSpecs(jasmine.getAllSpecFiles(__dirname + '/spec'), function(runner, log){
  process.exit(runner.results().failedCount);
}, isVerbose, showColors);
