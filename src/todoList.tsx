import * as React from 'react'
import CreateContainer from "./createContainer.tsx";

const TodoList = ({todos,setTodos,durings,setDurings,dones, setDones}) => {

  return (
        <main>
            <div className="container">
            <div className="todo">
                <div id="top">
                    <h1>To do</h1>
                </div>
                {todos?.map((todo) => (
                    // eslint-disable-next-line react/jsx-key
                    <CreateContainer
                        text={todo.text}
                        id={todo.id}
                        tasks={todos}
                        task={todo}
                        todos={todos}
                        deleteTask={setTodos}
                        durings={durings}
                        setDurings={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus = "todo"
                    />
                ))}
            </div>

            <div className="during">
                <div id="top">
                    <h1>During</h1>
                </div>
                {durings?.map((during) => (
                    // eslint-disable-next-line react/jsx-key
                    <CreateContainer
                        text={during.text}
                        id={during.id}
                        tasks={durings}
                        task={during}
                        durings={durings}
                        todos={todos}
                        setTodos={setTodos}
                        deleteTask={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus = "during"
                    />
                ))}
            </div>

            <div className="done">
                <div id="top">
                    <h1>Done</h1>
                </div>
                {dones?.map((done) => (
                    // eslint-disable-next-line react/jsx-key
                    <CreateContainer
                        text={done.text}
                        id={done.id}
                        tasks={dones}
                        task={done}
                        todos={todos}
                        setTodos={setTodos}
                        durings={durings}
                        deleteTask={setDones}
                        setDurings={setDurings}
                        taskStatus = "done"
                    />
                ))}
            </div>
        </div>
</main>
  )
}
export default TodoList
