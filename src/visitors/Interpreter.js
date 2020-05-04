function bool(value) {
    return value ? 1 : 0
}
const operations = {
    "+": (l, r) => l + r,
    "-": (l, r) => l - r,
    "*": (l, r) => l * r,
    "/": (l, r) => Math.round(l / r),
    "<": (l, r) => bool(l < r),
    "<=": (l, r) => bool(l <= r),
    "==": (l, r) => bool(l == r),
    ">=": (l, r) => bool(l >= r),
    ">": (l, r) => bool(l > r),
    "!=": (l, r) => bool(l != r),
}
import Binding from "../binding.js"
import * as AST from "../ast.js"
export default class Interpreter {
    constructor(target, printFunction) {
        this.target = target
        this.printFunction = printFunction
        this.binding = new Binding()
    }
    visit() {
        return this.target.accept(this)
    }
    Assignment(node) {
        let variable = node.variable.accept(this)
        let expr = node.expr.accept(this)
        this.binding.updateVariable(variable, expr)
        return expr
    }
    BinOp(node) {
        let l = node.l.accept(this)
        let r = node.r.accept(this)
        return operations[node.op](l, r)
    }
    FunctionCall(node) {
        let thunk = node.name.accept(this)
        let newBinding = thunk.binding.push();
        let values = node.args
        let names = thunk.formals
        names.shift()
        names.pop();
            //check to see if there are no parameters
        if(names.length == 0) {
            return thunk.code.accept(this)
        }
        names.forEach(function(variable, i) {
            if(variable.name) {
                if((names.length) != values.length) {
                    throw new Error(`Function calls for ${names.length} parameters but was only passed ${values.length}`)
                }
                //name of variable stored inside of name
                let name = variable.name
                let val = values[i].value != null ? values[i].value : newBinding.parent.getVariableValue(name);
                if(!newBinding.checkVariableExists(name)) {
                    newBinding.setVariable(name, val)
                    console.log(newBinding)
                } else {
                    newBinding.updateVariable(name, val)
                }
            }
        });
        let newInter = new Interpreter(this.target, this.printFunction, newBinding);
        this.binding = newBinding.parent;
        return newInter.visit(thunk.code)
    }
    FunctionDefinition(node) {
        return new AST.Thunk(node.formals, node.code, this.binding)
    }
    IfStatement(node) {
        let predicate = bool(node.predicate.accept(this))
        if(predicate == 1) return node.thenCode.accept(this)
        return node.elseCode.accept(this)
    }
    IntegerValue(node) {
        return node.value
    }
    InternalPrint(node) {
        let args = node.args.map(a => a.accept(this).toString())
        this.printFunction(args)
        return args
    }
    StatementList(node) {
        let result = 0
        node.statements.forEach(statement => result = statement.accept(this))
        return result
    }
    VariableDeclaration(node) {
        let variable = node.variable.accept(this)
        let initialValue = 0
        if(node.initialValue) {
            initialValue = node.initialValue.accept(this)
        }
        this.binding.setVariable(variable, initialValue)
        return initialValue
    }
    VariableName(node) {
        return node.name
    }
    VariableValue(node) {
        return this.binding.getVariableValue(node.name)
    }
}