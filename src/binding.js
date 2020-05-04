export default class Binding {
  constructor(parent = null) {
    parent = this.parent
    this.binding = new Map()
  }

  getVariableValue(name) {
    if(this.checkVariableExists(name)) {
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
    if (!this.binding.has(name)){
      if(this.parent == null){
        return false
      }
      return this.parent.checkVariableExists(name)
    }
    return true
  }

  push() {
    return new Binding(this)
  }

  pop() {
    return this.parent
  }
}