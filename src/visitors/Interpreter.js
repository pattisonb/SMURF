const Operations = {
  "+": (l, r) => l + r,
  "-": (l, r) => l - r,
  "*": (l, r) => l * r,
  "/": (l, r) => Math.round(l / r),
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
    return Operations[node.op](l, r)
  }

  IntegerValue(node) {
    return node.value
  }
}