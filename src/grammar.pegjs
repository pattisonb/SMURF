{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
  const AST = options.AST
}

arithmetic_expression
  = left:mult_term right:(addop mult_term)*
  {return new AST.BinOp(left, right)}

mult_term
  = left:primary right:(mulop primary)*
  {return new AST.BinOp(left, right)}

primary
  =  integer / _ "(" equation: arithmetic_expression ")" _ {return equation}

integer
  = _ sign:('+' / '-')? number:number _ {return new AST.IntegerValue(sign, makeInteger(number));}

number
 = [0-9]+

addop
  = '+' / '-'

mulop
  = '*' / '/'

relop
  = '==' / '!=' / '>=' / '>' / '<=' / '<'


function_definition
  = _ param_list brace_block _

param_list
   = "(" ")"

brace_block
  = "{" code "}"

_ "whitespace"
  = [ \t\n\r]*