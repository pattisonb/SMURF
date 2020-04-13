export default class Inter {	

	visit(node) {
		return node.accept(this)
	}
	
	visitBinOp(node) {
		let left = node.left.accept(this);
		let right = node.right.accept(this);
		switch (node.operation) {
			case "+":
				return left + right
		}
		switch (node.operation) {
			case "*":
				return left * right
		}
	}

	visitIntegerValue(node) {
		return node.value
	}
}