// This is the top-level of your code. It is responsible for
// parsing a script and then running it. It returns the
// value of the last thing executed in the script.

// It takes three parameters:

// * grammar

//   The compiled version of the PEG.JS grammar. This is automatically
//   generated for you by the smurf.js driver program.

//   You use it by calling

//       grammar.parse(script, options...)

// * script

//   The SMURF source that is to be compiled and run. This is a string.

// * printFunction

//   This is a JavaScript function that your interpreter should use
//   when it executes the SMURF `print` function. You pass it
//   one or more values to display.

//   The default printFunction simply writes to the console. I also have
//   a version that the tests use so I can capture output.

import Inter from "./inter.js"
import * as AST from "./ast.js"

export default function compileAndRun(grammar, script, printFunction) {

	let ast = grammar.parse(script, {AST: AST});

	let inter = new Inter();

	let result = inter.visit(ast);

	  // printFunction(result)
	return result;

  	// ... the value returned by executing the SMURF script
}