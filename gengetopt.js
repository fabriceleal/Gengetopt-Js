var fs = require('fs');


/*
	First element is the name of the process ('node').
	Second element is the name of the script.

	A parameter can be a flag or can be complex.
	A complex parameter can be a enum.
*/

//FIXME: If the value of a arg starts with --, there will be issues ...
var isParameterName = function(current){
	return isLongParameterName(current) || isShortParameterName(current);
}

var isLongParameterName = function(current){
	// It starts with "--", any char
	return current.match("^--.+$") != null;
}

var isShortParameterName = function(current){
	// It starts with "-", one char (not a -)
	return current.match("^-[^-]$") != null;
}


// Read following args
var valued_parameter = {
	parse: function(parsed, parameter_name){
		console.log('Parsing ' + parameter_name + ' as parameter_name');
		// Create slot
		parsed[parameter_name] = null;
		return parsed;
	},
	next: function(parameter_name, next_value){
		// FIXME Assume is a value
		// Generate state to read and store the value of the parameter
		return {
			parse: 	function(parsed, next_value){
					console.log('Parsing '+ next_value +' as parameter_value of ' + parameter_name)
					// Put value
					parsed[parameter_name] = next_value;
					return parsed;
				},
			next:	function(parameter_value){
					// FIXME Assume is another name of a parameter ...
					return valued_parameter;
				}
		}
	}
}

// Read first 2 args
var command_state = {
	// Name of the command ('node')
	parse: function(parsed, command_name){
		console.log('Parsing ' + command_name + ' as command_name');
		parsed["command"] = command_name;
		return parsed;
	},
	// Next element
	next : function(command_name, next_value){
		return {
			// Name of the script
			parse : function(parsed, script_name){
				console.log('Parsing ' + script_name + ' as script_name');
				parsed["script"] = script_name;
				return parsed;
			},
			next : function(script_name, next_value){
				// FIXME Assume that is the name of a parameter ...
				return valued_parameter;
			}
		};
	}
};

// Init state machine
var machine = {
	next : function(ignore_me, value){
		return command_state;
	}
};

exports.parse = function(configFile, args){
	console.log('parsing ...');

	fs.readFile(configFile, function(err, data){
		if(err) throw err;

		console.log('read file ' + configFile);

		var config = JSON.parse(data);

		var processedArgs = {};
		var lastProcessed = null;
		
		args.forEach(function(item, idx, arr){

			machine = machine.next(lastProcessed, item);

			machine.parse(processedArgs, item);

			lastProcessed = item;
		});
		
	});	
};

exports.parseArgs = function(configFile){
	exports.parse(configFile, process.argv);
};
