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