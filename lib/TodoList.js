import { CountableTodoItem } from './TodoItem'
import $ from 'jquery'
import Velocity from 'velocity-animate'

/** TODOリストのUL要素のID */
const LIST_UL_ID = '#todoList'
/** CountableTodoItemの配列 */
const todoItemMap = new Map()
const todoItemList = []

/**
 * todoアイテムの表示要素(li)を作成します
 * @param {CountableTodoItem} item
 */
const createTodoItemLi = ({id, text},) => {
  return $(`
    <li id="${id}">
      <p>${text}</p>
      <button>削除</button>
    </li>
  `).css({opacity: 0.3, height: 0})
}


/**
 * 新しいTODOアイテムを追加します
 * @param {String} text
 * @return {String} 追加したアイテムのID
 */
export const addTodo = (text=null,) => {
  const item = new CountableTodoItem(text ?? 'デフォルト値が入ります')
  // items.push(item)
  todoItemMap.set(item.id, item)
  todoItemList.push(item)
  const ul = $(LIST_UL_ID)
  const li = createTodoItemLi(item)
  li.find('button').on('click', () => {
    removeTodo({id: item.id})
  })
  ul?.append(li)
  Velocity(li, {height: '3em', opacity: 1.0}, {
    duration: 400,
    easing: 'easeInOutQuad',
    complete() {
      console.log('----li.append')
    }
  })
  return item.id
}

/**
 * TODOアイテムを削除します
 * @param {String} id
 */
export const removeTodo = ({id, text,},) => {
  let index = todoItemList.findIndex(item => item.id === id)
  if (index == -1) {
    index = todoItemList.findIndex((item) => {
      return item.text == text
    })
    const item = todoItemList.find((item) => {
      return item.text == text
    })
    id = item?.id
  }
  if (index !== -1) {
    todoItemList.splice(index, 1)
  }
  todoItemMap.delete(id)
  const li = $('#' + id)
  Velocity(li, {height: 0, opacity: 0.0}, {
    duration: 400,
    easing: 'easeInOutQuad',
    complete() {
      li?.remove()
      console.log('----li.remove')
    }
  })
}
