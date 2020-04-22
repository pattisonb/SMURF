const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
  "==": (l, r) => l == r,
  "!=": (l, r) => l != r,
  ">=": (l, r) => l >= r,
  ">": (l, r) => l > r,
  "<=": (l, r) => l <= r,
  "<": (l, r) => l < r,
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
    if (Operations[node.op](l, r) == true) {
      return 1;
    }
    if (Operations[node.op](l, r) == false) {
      return 0;
    }
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
    return node.name
  }

  Assignment(node) {
    let l = node.l.accept(this)
    let r = node.r.accept(this)
    if(this.binding.has(l)) {
      this.setVariable(l, r)
    }
    return r
  }

  funcDef(node) {
    return node.code.accept(this)
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
    let call = node.call.accept(this)
    return call.accept(this)
  }
}
