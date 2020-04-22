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
  = expr

identifier       
   = id:([a-z][a-zA-Z_0-9]*)
    { return text() }

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = statement+

statement
  = "let" _ variable_declaration
  / assignment
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = v:variable_name "=" exp:expr
    {return new AST.Assignment(v, exp)}
  / var:variable_name

variable_value             // as rvalue
  =  id: identifier 
    {return new AST.var_val(id)}


variable_name              // as lvalue
  =   id: identifier 
    {return new AST.var_name(id)}

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = condition:expr ifPart:brace_block "else" elsePart:brace_block
    {return new AST.ifStatement(condition, ifPart, elsePart)}
  / condition:expr ifPart:brace_block
    {return new AST.ifStatement(condition, ifPart, new AST.nullStatements())}

//////////////////////////////// assignment /////////////////////////////

assignment
  = variable_name "=" expr

//////////////////////////////// expression /////////////////////////////

expr
  = "fn" _ expr:function_definition
  {return expr}
  / "if" _ expr:if_expression
  {return expr}
  / boolean_expression
  / arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = head:arithmetic_expression rest:(relop arithmetic_expression)*
    { return rollupBinOp(head, rest) }

//////////////////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = head:mult_term rest:(addop mult_term)*
    { return rollupBinOp(head, rest) }

mult_term
  = head:primary rest:(mulop primary)*
    { return rollupBinOp(head, rest) }

primary
  = integer
  / _ "(" _ expr:arithmetic_expression _ ")" _
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

relop
  = '==' / '!=' / '>=' / '>' / '<=' / '<'


/////////////////////// utility NTs //////////////////////////////

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

digits            
  = [-+]? [0-9]+
   { return parseInt(text(), 10) }