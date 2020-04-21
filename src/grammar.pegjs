{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
  const AST = options.AST
}

start
  = code

identifier
  = <lowercase letter> <letter or digit or _>*

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = statement+

statement
  = "let" __ variable_declaration
  | assignment
  | expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = variable_name "=" expr
  | variable_name

variable_value             // as rvalue
  =  identifier

variable_name              // as lvalue
  =  identifier

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = expr brace_block "else" brace_block
  | expr brace_block

//////////////////////////////// assignment /////////////////////////////

assignment
  = variable_name "=" expr

//////////////////////////////// expression /////////////////////////////

expr
  = "fn" _ function_definition
  | "if" _ if_expression
  | boolean_expression
  | arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = arithmetic_expression relop arithmetic_expression

//////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = left:mult_term right:(addop mult_term)*
  {return new AST.BinOp(left, right)}

mult_term
  = left:primary right:(mulop primary)*
  {return new AST.BinOp(left, right)}


primary
  = integer
  | function_call                   // this was commented out last week
  | variable_value                  // as was this
  | "(" arithmetic_expression ")"


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


//////////////////////////////// function call /////////////////////////////

function_call
  = variable_value "(" ")"     // note: no parameters

//////////////////////// function definition /////////////////////////////

function_definition
  = param_list brace_block

param_list
   = "(" ")"

brace_block
  = "{" code "}"

_ "whitespace"
  = [ \t\n\r]*
