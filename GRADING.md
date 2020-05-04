# Week 3

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | 5 failed    |     55 |
| extras         | 4 failed    |      2 |
| Coding         |             |     22 |
| **TOTAL**      |             |     79 |


        File: Interpreter.js
        38:     FunctionCall(node) {
        39:         let thunk = node.name.accept(this)
        40:         let newBinding = thunk.binding.push();
        41:         let values = node.args
        42:         let names = thunk.formals

All this stripping and skipping is a whole lot easier in the grammar
stages. You can arrange only to pass the important things into the AST,
and then in the interpreter just deal with real values.

        43:         //removing leading and trailing parenthesis from the args
        44:         names.shift()
        45:         names.pop();
        46:             //check to see if there are no arameters

This would work if the function declares local variables: it still needs
its own binding to hold them.

        47:         if(names.length == 0) {
        48:             return thunk.code.accept(this)
        49:         }
        50:         names.forEach(function(variable, i) {
        51:             if(variable.name) {

Why test this inside the loop? not only is it unnecessary, but it's also
a bug. The the definition has no formals, but the function is called
with some, this won't detect it.

        52:                 if((names.length) != values.length) {
        53:                     throw new Error(`Function calls for ${names.length} parameters but was only passed ${values.length}`)
        54:                 }
        55:                 //name of variable stored inside of name
        56:                 let name = variable.name

All these checks for `null` are a pretty good clue that something is
amiss...

        57:                 let val = values[i].value != null ? values[i].value : newBinding.parent.getVariableValue(name);
        58:                 if(!newBinding.checkVariableExists(name)) {
        59:                     newBinding.setVariable(name, val)
        60:                 } else {
        61:                     newBinding.updateVariable(name, val)
        62:                 }
        63:             }
        64:         });
        65:         let newInter = new Interpreter(this.target, this.printFunction, newBinding);
        66:         this.binding = newBinding.parent;
        67:         return newInter.visit(thunk.code)
        68:     }
        9:     FunctionDefinition(node) {


# Week 2

| Part           | Comments    | Points |
|----------------|-------------|--------|
| provided tests | All passed  |     65 |
| extras         | 3 failures  |      8 |
| Coding         |             |     22 |
| Bonus          |             |      5 |
| **TOTAL**      |             |     84 |

As far as I can tell, you're the only person to correctly check for
duplicate and undefined variables in all places that it's needed. A
quick +5 for making me happy :)


Coding stuff:

- This code isn't right

     ifStatement(node) {
         let cond = node.cond.accept(this)
         let ifPart = node.ifPart
         let elsePart = node.elsePart

         if(elsePart == null) {
           return ifPart
         }

  You can only execute `ifPart` if the predicate is true.

And, no deduction but

 Statements(node) {
    let tempState = node.statements;
    let count = 0;
    for (let statement of tempState) {
      count = statement.accept(this)
    }
    return count;
  }

`count`??? srsly???

Failures in my torture tests:

- the interpreter blows up given `if 0 { 99 }`. It should either raise
  an error or return 0.


# Week 1

| Part           | Comments    | Points |
|----------------|-------------|--------|
| 00-test_values | All passed  |     75 |
| 00-test_extras | All passed  |     10 |
| Coding         |             |     25 |
| **TOTAL**      |             |    100 |

Two minor observations (no deductions)

1. I feel that the interpretation of operator associativity is a parsing
   function, and not a runtime one. I therefore feel the reduce code
   should be in the grammar and not the interpreter.

2. You have a separate sign field in your integer node. I feel that's
   not really correct: "-2" is the literal -2, and it's the result of
   runtime calculation.