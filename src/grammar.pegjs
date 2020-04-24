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
  = code

identifier       
   = [a-z][a-zA-Z_0-9]*
    { return text() }

///////////////////////// blocks (lists of statements) /////////////////////////

code
  = _ state:statement+ _
  {return new AST.Statements(state)}

statement
  = "let" _ d:variable_declaration
  {return d}
  / assign:assignment _
    {return assign}
  / expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = v:variable_name "=" e:expr
    {return new AST.var_dec(v,e)}
  / v:variable_name
    {return new AST.var_dec(v, new AST.IntegerValue(0))}

variable_value             // as rvalue
  = _ id:identifier _
      {return new AST.var_val(id)}

variable_name              // as lvalue
  = _ id:identifier _
      {return new AST.var_name(id)}

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = condition:expr ifPart:brace_block "else" elsePart:brace_block
    {return new AST.ifStatement(condition, ifPart, elsePart)}
  / condition:expr ifPart:brace_block
    {return new AST.ifStatement(condition, ifPart, [])}

//////////////////////////////// assignment /////////////////////////////

assignment
  = left:variable_name _ "=" _ right:expr
    {return new AST.Assignment(left, right)}

//////////////////////////////// expression /////////////////////////////

expr
  = _ "fn" expr:function_definition 
  {return expr}
  / _ "if" expr:if_expression 
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
  /function_call
  /variable_value
  / _ "(" expr:arithmetic_expression ")" _
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
  = call:variable_value "(" _ ")" _    // note: no parameters
   {return new AST.funcCall(call, [])}

//////////////////////// function definition /////////////////////////////

function_definition
  = params:param_list code:brace_block
  {return new AST.funcDef(params, code)}

param_list
   = _ "(" _ ")" _

brace_block
  = _ "{" c:code "}" _
  {return c}

_ "whitespace"
  = [ \t\n\r]*

digits            
  = [-+]? [0-9]+
   { return parseInt(text(), 10) }