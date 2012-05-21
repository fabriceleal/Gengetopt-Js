var parser = require("./parser.js");


exports.parseArgs = function(args){
	var treated = 
			args.
			slice(2).
			map(function(n, idx){
				if(idx % 2)
					return JSON.stringify(n);
				return n;
			}).
			join(" ");
	//---

	try{
		var parsed = parser.parse(treated);
		var transf = {};

		// Transforms the parsed args (array of tuples) in a dictionary
		parsed.forEach(function(tuple){
			transf[ tuple[0] ] = tuple[1];
		});		

		return {
			raw : args,
			parsed : parsed,
			transf : transf
		};
	}catch(e){
		throw 'Error parsing args ' + JSON.stringify(args);
	}
};
