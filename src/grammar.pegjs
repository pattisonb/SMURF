{
  const AST = options.AST

  function rollupBinOp(head, rest) {
    return rest.reduce(
      (result, [op, right]) => new AST.BinOp(result, op, right),
      head
    )
  }
}

start
  = arithmentic_expression

//////////////////////////////// arithmetic expression /////////////////////////////

arithmentic_expression
  = head:mult_term rest:(addop mult_term)*
    { return rollupBinOp(head, rest) }

mult_term
  = head:primary rest:(mulop primary)*
    { return rollupBinOp(head, rest) }

primary
  = integer
  / _ "(" _ expr:arithmentic_expression _ ")" _
    { return expr }


integer
  = _ number: digits _
    { return new AST.IntegerValue(number) }

addop
  = _ op:[-+] _
    { return op }

mulop
  = _ op:[*/] _
    { return op }


/////////////////////// utility NTs //////////////////////////////

_ "whitespace"
  = [ \t\n\r]*

identifier       
   = id:([a-z][a-zA-Z_0-9]*)
    { return text() }

digits            
  = [-+]? [0-9]+
   { return parseInt(text(), 10) }