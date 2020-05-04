export default class Binding {
  constructor(parent = null) {
    this.parent = parent
    this.binding = new Map()
  }

  getVariableValue(name) {
    if(this.binding.has(name)) {
      return this.binding.get(name)
    }
    else if (this.parent != null) {
        return this.parent.getVariableValue(name);
    }
    else {
      throw new Error (`The variable ${name} does not exist`)
    }
  }



  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    if (this.binding.has(name)) {
      this.binding.set(name, value)
    }
    else if (this.parent.checkVariableExists(name)) {
      this.parent.updateVariable(name, value)
    }
    else {
      throw new Error (`The variable ${name} does not exist`)
    }
  }

  checkVariableExists(name) {
    if (this.binding.has(name)) {
      return true;
    }
    else {
      if(this.parent == null){
        return false
      }
      return this.parent.checkVariableExists(name)
    }
  }

  push() {
    return new Binding(this)
  }

  pop() {
    return this.parent
  }
}