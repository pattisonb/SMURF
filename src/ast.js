//mulop and addop always undefined in the grammar
//so i combined the operation with the rightside of the equation

export class BinOp {
	constructor(left, right) {
		this.left = left; 
		this.right = right;
	}
	accept(visit) {
		return visit.visitBinOp(this)
	}
}


//have to put sign in the constructor
//can't figure out another way
export class IntegerValue {
	constructor(sign, value) {
		this.sign = sign;
		this.value = value;
	}
	accept(visit) {
		return visit.visitIntegerValue(this)
	}
}