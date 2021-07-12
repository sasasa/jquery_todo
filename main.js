import $ from 'jquery'
// CSSファイルもimportで読み込みできます
import './style.css'
// JavaScriptを分割してimportで読み込みできます
import { addTodo, removeTodo, } from './lib/TodoList'
import { MyList, } from './lib/MyList'

function sum(...args) {
  let result = 0;
  for(let arg of args) {
    result += arg
  }
  return result
}
function* countdown(time) {
  while (time >= 0) {
    yield time--
  }
}

let times = 1;
function delayTextCheck(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      times *= 1.15
      if(text) {
        if(text.includes('うんこ')) {
          reject(new Error('入力値が不適切です'))
        } else {
          resolve(`${text}`)
        }
      } else {
        reject(new Error('入力値が空です'))
      }
    }, 150 * times)
  })
}
async function* serial(text) {
  //Promiseを返す関数の呼び出し
  let result = await delayTextCheck(text)
  const reg = /(?<area>0\d{1,4})-(?<city>\d{1,4})-(?<local>\d{3,4})/g;
  result = await delayTextCheck(result.replace(reg, '$<area>($<city>)$<local>'))
  result = await delayTextCheck(result.trimStart().trimEnd())
  console.log('1:処理が終了しました');
  yield `${result}(${[...result].length})`;
}
async function serial2(text) {
  //Promiseを返す関数の呼び出し
  let result = await delayTextCheck(text)
  const reg = /(?<area>0\d{1,4})-(?<city>\d{1,4})-(?<local>\d{3,4})/g;
  result = await delayTextCheck(result.replace(reg, '$<area>($<city>)$<local>'))
  result = await delayTextCheck(result.trimStart().trimEnd())
  console.log('1:処理が終了しました');
  return `${result}(${[...result].length})`;
}

try {
  // HTMLからTODO入力用input要素を取得
  const newInput = $('#itemInput')
  // HTMLからTODO追加用button 要素を取得
  const addButton = $('#addButton')

  // ボタンクリック時にTODOアイテムを追加
  addButton?.on('click', () => {
    const text = newInput?.val()
    if (!text) return
    addTodo(text)
    newInput?.val('')
  })

  let total = 0
  for(let i of countdown(10)) {
    total += i
  }
  // サンプルのTODOを追加
  const yen = sum(...[
    10,
    4 ** 2,
    total,
  ].map(val => val * val))

  const todoTextList = new MyList([
    `${yen}円分の買い物`,
    '部屋の掃除',
    '部屋の掃除',
    '  Viteの入門   ',
    '便秘なのでうんこする',
    '0123-554-9484に電話する',
    null,
    null
  ])
  const todoTextList2 = new MyList([
    `${yen}円分の借金を返す`,
    '部屋の破壊',
    '部屋の掃除',
    '  Viteの入門記事を書く   ',
    '便秘なのでうんこする',
    '033-535-2222に電話する',
    null,
    null
  ])
  async function forfunc(func, text) {
    try {
      for await (let t of func(text)) {
        console.log(`2:${t}`)
        addTodo(t)
      }
    } catch (error) {
      console.log(`2:Error. ${error.message}`)
    } finally {
      console.log('3:終了')
      setTimeout(() => {
        removeTodo({id:'xx', text:`部屋の掃除(${[...'部屋の掃除'].length})`,})
      }, 1500)
    }

  }
  for(let todoText of todoTextList) {
    forfunc(serial, todoText)
  }
  for(let todoText of todoTextList2) {
    serial2(todoText)
      .then(response => {
        console.log(`2:${response}`)
        addTodo(response)
      })
      .catch(error => {
        console.log(`2:Error. ${error.message}`)
      })
      .finally(() => {
        console.log('3:終了')
        setTimeout(() => {
          removeTodo({id:'xx', text:`部屋の掃除(${[...'部屋の掃除'].length})`,})
        }, 1500)
      })
  }
  addTodo()
} catch(error) {
  console.log(error)
}
