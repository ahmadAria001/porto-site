import { defineStore } from 'pinia'
import { ulid } from 'ulid'

export enum PROGRESS {
  'todo' = 'todo',
  'doing' = 'doing',
  'done' = 'done',
}

export type Todo = {
  id: string
  title: string
  description: string
  progress: PROGRESS
}

const initialTodos: Todo[] = [
  {
    id: ulid(),
    title: 'Learn Vue',
    description: 'Learn Vue from the official documentation',
    progress: PROGRESS.done,
  },
  {
    id: ulid(),
    title: 'Build a Vue app',
    description: 'Build a Vue app from scratch',
    progress: PROGRESS.doing,
  },
  {
    id: ulid(),
    title: 'Master Vue',
    description: 'Master Vue by building a real-world application',
    progress: PROGRESS.todo,
  },
]

export enum Filters {
  'all' = 'all',
  'todo' = 'todo',
  'doing' = 'doing',
  'done' = 'done',
}

export const TodosActions = {
  addTodo: 'add',
  removeTodo: 'remove',
  setFilter: 'setFilter',
}

export const TodosGetters = {
  filteredTodos: 'filteredTodos',
  remainingTodos: 'remainingTodos',
  allTodos: 'allTodos',
}

export const TodosState = {
  todos: 'todos',
  filter: 'filter',
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    /** @type {Todo[]} */
    todos: initialTodos,
    /** @type {PROGRESS} */
    filter: Filters.all,
  }),
  getters: {
    /** @type {Todo[]} */
    filteredTodos: (state) => {
      if (state.filter === Filters.all) {
        return state.todos
      }

      return state.todos.filter((todo) => todo.progress == state.filter)
    },
    /** @type {Todo[]} */
    remainingTodos: (state) => {
      return state.todos.filter((todo) => todo.progress != state.filter)
    },
    /** @type {Todo[]} */
    allTodos: (state) => {
      return state.todos
    },
  },
  actions: {
    add({ id, title, description, progress }: Todo) {
      if (!id) {
        id = ulid()
      }
      if (!progress) {
        progress = PROGRESS.todo
      }

      this.todos.push({ id, title, description, progress })
    },
    remove(id: string) {
      this.todos = this.todos.filter((data) => data.id !== id)
    },
    setFilter(filter: Filters) {
      this.filter = filter
    },
    setProgress(id: string, progress: PROGRESS) {
      this.todos.filter((todo) => todo.id === id)[0].progress = progress
    },
  },
})
