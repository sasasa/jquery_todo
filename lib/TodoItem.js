let lastInstanceId = 0
const SEC_METHOD = Symbol();

export class TodoItem {
  constructor(text=this.required()) {
    if(!text) {
      this.required()
    }
    this.id = `todo${this[SEC_METHOD]()}`
    this.text = text
  }
  required() { 
    throw new Error('Arguments is missing')
  }
  [SEC_METHOD]() {
    return lastInstanceId++
  }
}