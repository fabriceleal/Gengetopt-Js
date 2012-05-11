#!/usr/local/bin/node

var pegs = require('pegjs');
var fs = require('fs');

fs.readFile('grammar.peg', 'utf-8', function(err, data){
	if(err) throw err;

	var parse = pegs.buildParser(data).parse;

	// Print to stdout. Redirect to wherever you what!
	console.log(parse.toString());
});
