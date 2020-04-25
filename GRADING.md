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