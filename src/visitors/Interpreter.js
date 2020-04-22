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
      let ifPart = node.ifPart.accept(this)
      let elsePart = node.elsePart.accept(this)

      if(cond == 1) {
        return ifPart
      }

      else {
        return elsePart
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
    let variable = node.l.accept(this)
    let expression = node.r.accept(this)
    this.setVariable(variable, expression)
    return expression
  }
}