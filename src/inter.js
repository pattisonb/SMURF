export default class Inter {	

	visit(node) {
		return node.accept(this)
	}
	
	visitBinOp(node) {
		let left = node.left.accept(this);

		//have to use the reduce function to separate the operand from the number
		//because the rightside is all combined
		return node.right.reduce(
			(total, [operand, right]) => {
				right = right.accept(this);
					switch (operand) {
						case "+":
					return total + right
						case "*":
					return total * right
						case "-":
					return total - right
						case "/":
					return Math.round(total / right)
				}
			}, left
		)
	}

	visitIntegerValue(node) {
		if (node.sign == "-") {
			return -1 * node.value
		}
		return node.value
	}
}