var gengetopt = require('./gengetopt.js');

//process.argv = ['-d', 'one parameter']

console.log(JSON.stringify(process.argv));

console.log(JSON.stringify(gengetopt.parseArgs(process.argv)));


