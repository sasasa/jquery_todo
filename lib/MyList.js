
export class MyList {
  constructor(data) {
    this.data = data
  }

  *[Symbol.iterator]() {
    let current = 0;
    while(current < this.data.length) {
      yield this.data[current++]
    }
  }
}
