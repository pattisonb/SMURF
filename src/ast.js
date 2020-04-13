export class BinOp {
	constructor(left, right, operation) {
		this.left = left;
		this.right = right;
		this.operation = operation;
	}
	accept(visit) {
		return visit.visitBinOp(this)
	}
}

export class IntegerValue {
	constructor(value) {
		this.value = value;
	}
	accept(visit) {
		return visit.visitIntegerValue(this)
	}
}