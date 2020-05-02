export default class Binding {
  constructor() {
    this.binding = new Map()
  }

  getVariableValue(name) {
    this.checkVariableExists(name)
    return this.binding.get(name)
  }


  setVariable(name, value) {
    if (this.binding.has(name))
      throw new Error(`Duplicate declaration for variable ${name}`)
    this.binding.set(name, value)
  }

  updateVariable(name, value) {
    this.checkVariableExists(name)
    this.setVariable(name, value)
  }

  checkVariableExists(name) {
    if (!this.binding.has(name))
      throw new Error(`Reference to unknown variable ${name}`)
  }
}