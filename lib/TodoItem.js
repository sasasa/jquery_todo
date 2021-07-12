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
    this.num = [...text].length
  }
  required() {
    throw new ValidationError('やることを入力してください')
  }
  [SEC_METHOD]() {
    return lastInstanceId++
  }
  get text() {
    if(this._text.match(/\([0-9]+\)$/u)) {
      return `${this._text}`
    } else {
      return `${this._text}(${this.num})`
    }
  }
}
export class CountableTodoItem extends TodoItem {
  constructor(text) {
    super(text)
    this.num = [...text].length
  }
  get num() {
    return this._num
  }
  set num(value) {
    this._num = value
  }
}
