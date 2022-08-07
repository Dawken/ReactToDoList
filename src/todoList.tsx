import * as React from 'react'
import CreateContainer from "./createContainer.tsx";

const TodoList = ({todos}) => {
    console.log(todos)
  return (
        <main>
            <div className="container">
            <div className="todo">
                <div id="top">
                    <h1>To do</h1>
                </div>
                {todos.map((todo) => (
                    <CreateContainer text={todo.text} key={todo.id}/>
                ))}
            </div>

            <div className="during">
                <div id="top">
                    <h1>During</h1>
                </div>
            </div>

            <div className="done">
                <div id="top">
                    <h1>Done</h1>
                </div>
            </div>
        </div>
</main>
  )
}
export default TodoList
