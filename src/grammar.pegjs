arithmetic_expression
  = mult_term (addop mult_term)*

mult_term
  = primary (mulop primary)*

primary
  = integer
  / "(" arithmetic_expression ")"

integer
  = ("+" / "-") digits

digits
  = ("0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9")+

addop
  = '+' / '-'

mulop
  = '*' / '/'


_ "whitespace"
  = [ \t\n\r]*