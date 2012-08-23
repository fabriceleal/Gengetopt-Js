[![build status](https://secure.travis-ci.org/fabriceleal/Gengetopt-Js.png)](http://travis-ci.org/fabriceleal/Gengetopt-Js)
# Gengetopt-Js
### Gengetopt-like lib for parsing command line args for Node

A simple lib for parsing pairs of named command line arguments (behaviour is undefined for non-named arguments, sorry ...), for node.

Check the dir release/ for the actual module's code. Anything outside that folder is not included in the module.

## To Build
You'll need the pegjs module.

## Instalation:

npm install gengetopt-js

## Usage:
Use the parseArgs function to parse the process's argv object.
Use the transf property of the result, which contains all your args in a dictionary.
The raw and parsed properties are just for bookkeping...

> var r = require('gengetopt-js')

> process.argv
['node', 'dummy.js', '-d', 'some string', '-s', 123]

> var args = r.parseArgs(process.argv)

> JSON.stringify(args)
'{"raw":["node","dummy.js","-d","some string","-s",123],"parsed":[["d","some string"],["s","123"]],"transf":{"d":"some string","s":"123"}}'

> JSON.stringify(args.transf)
'{"d":"some string","s":"123"}'

> JSON.stringify(args.parsed)
'[["d","some string"],["s","123"]]'

> JSON.stringify(args.raw)
'["node","dummy.js","-d","some string","-s",123]'

