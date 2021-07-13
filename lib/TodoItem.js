let lastInstanceId = 0
const SEC_METHOD = Symbol();

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
class TodoItem {
  constructor(text=this.required()) {
    if(!text) {
      this.required()
    }
    this.id = `todo${this[SEC_METHOD]()}`
    this._text = text
  }
  required() {
    throw new ValidationError('やることを入力してください')
  }
  [SEC_METHOD]() {
    return lastInstanceId++
  }
}
export class CountableTodoItem extends TodoItem {
  constructor(text) {
    super(text)
    this.num = [...text].length
  }
  get text() {
    if(this._text.match(/\([0-9]+\)$/u)) {
      return `${this._text}`
    } else {
      return `${this._text}(${this.num})`
    }
  }
  get num() {
    return this._num
  }
  set num(value) {
    this._num = value
  }
}
