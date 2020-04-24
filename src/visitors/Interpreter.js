function boolean (val) 
{
  return val ? 1:0
}

const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
  "==": (l, r) => boolean(l == r),
  "!=": (l, r) => boolean(l != r),
  ">=": (l, r) => boolean(l >= r),
  ">": (l, r) => boolean(l > r),
  "<=": (l, r) => boolean(l <= r),
  "<": (l, r) => boolean(l < r),
}

export default class Interpreter {

  constructor(target, printFunction) {
    this.target = target
    this.printFunction = printFunction
    this.binding = new Map();
  }

  visit() {
    return this.target.accept(this)
  }

  BinOp(node) {
    let l = node.left.accept(this)
    let r = node.right.accept(this)
    return Operations[node.op](l, r)
  }

  IntegerValue(node) {
    return node.value
  }

  ifStatement(node) {
      let cond = node.cond.accept(this)
      let ifPart = node.ifPart
      let elsePart = node.elsePart

      if(elsePart == null) {
        return ifPart
      }

      else if(cond) {
        return ifPart.accept(this)
      }

      else {
        return elsePart.accept(this)
      }
  }

  nullStatements(node) {
    return null;
  }

  var_name(node) {
    return node.name
  }

  var_val(node) {
    return this.getVariable(node.name)
  }

  setVariable(name, value){
    this.binding.set(name, value)
  }

  getVariable(name){
    if(this.binding.has(name)){
      return this.binding.get(name)
    }
    else {
      throw new Error(`undefined var ${name}`)
    }
  }


  Assignment(node) {
    let name = node.l.accept(this)
    let value = node.r.accept(this)
    if(this.binding.has(name)) {
      this.setVariable(name, value)
    }
    else {
      throw new Error(`undefined var ${name}`)
    }
    return value
  }

  var_dec (node) {
    let name = node.l.accept(this)
    let value = node.r.accept(this)
    if(this.binding.has(name)) {
      throw new Error(`previously defined var ${name}`)
    }
    else {
      this.setVariable(name, value)
    }
    return value
  }

  funcDef(node) {
    return node.list
  }

  Statements(node) {
    let tempState = node.statements;
    let count = 0;
    for (let statement of tempState) {
      count = statement.accept(this)
    }
    return count;
  }
  
  funcCall(node) {
    let name = node.name.accept(this)
    return name.accept(this)
  }
}
