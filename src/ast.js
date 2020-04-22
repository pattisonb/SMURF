export class BinOp {
  constructor(l, op, r) {
    this.left  = l
    this.op    = op
    this.right = r
  }
  accept(visitor) {
    return visitor.BinOp(this)
  }
}

export class IntegerValue {
  constructor(value) {
    this.value = value
  }

  accept(visitor) {
    return visitor.IntegerValue(this)
  }
}


export class ifStatement {
  constructor(cond, ifPart, elsePart) {
    this.cond = cond;
    this.ifPart = ifPart
    this.elsePart = elsePart
  }
  accept(visitor) {
    return visitor.ifStatement(this)
  }
}

export class nullStatements {
  constructor() {}
  accept(visitor){
      return visitor.nullStatements(this)
  }
}

export class var_name {
  constructor(name) {
      this.name = name
  }

  accept(visitor) {
      return visitor.var_name(this)
  }
}

export class var_val {
  constructor(name) {
      this.name = name
  }

  accept(visitor) {
      return visitor.var_val(this)
  }
}

export class Assignment {
  constructor(l, r) {
      this.l = l
      this.r = r
  }

  accept(visitor) {
      return visitor.Assignment(this)
  }
}

export class funcDef {
  constructor(params, list){
      this.params = params
      this.list = list
  }

  accept(visitor){
      return visitor.funcDef(this)
  }
}

export class Statements {
  constructor(statements){
      this.statements = statements
  }

  accept(visitor){
      return visitor.Statements(this)
  }
}

export class funcCall {
  constructor(name, args){
      this.name = name;
      this.args = args;
  }
  accept(visitor){
      return visitor.funcCall(this);
  }
}