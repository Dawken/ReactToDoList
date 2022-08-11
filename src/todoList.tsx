import * as React from 'react'
import CreateContainer from "./createContainer";

interface type_alias {
    text: string,
    id:number
}

type Props = {
    todos: type_alias[],
    durings: type_alias[],
    setTodos: React.Dispatch<type_alias[]>,
    setDurings: React.Dispatch<type_alias[]>,
    dones: type_alias[],
    setDones:React.Dispatch<type_alias[]>
}

const TodoList = ({todos,setTodos,durings,setDurings,dones,setDones}:Props) => {

    return (
        <main>
            <div className="container">
            <div className="todo">
                <div id="top">
                    <h1>To do</h1>
                </div>
                {todos?.map((todo) => (
                    <CreateContainer
                        text={todo.text}
                        id={todo.id}
                        key={todo.id}
                        tasks={todos}
                        task={todo}
                        todos={todos}
                        deleteTask={setTodos}
                        durings={durings}
                        setDurings={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus="todo"
                        setTodos={setTodos}
                    />
                ))}
            </div>

            <div className="during">
                <div id="top">
                    <h1>During</h1>
                </div>
                {durings?.map((during) => (
                    <CreateContainer
                        text={during.text}
                        id={during.id}
                        key={during.id}
                        tasks={durings}
                        task={during}
                        durings={durings}
                        todos={todos}
                        setTodos={setTodos}
                        deleteTask={setDurings}
                        dones={dones}
                        setDones={setDones}
                        taskStatus="during"
                        setDurings={setDurings}
                    />
                ))}
            </div>

            <div className="done">
                <div id="top">
                    <h1>Done</h1>
                </div>
                {dones?.map((done) => (
                    <CreateContainer
                        text={done.text}
                        id={done.id}
                        key={done.id}
                        tasks={dones}
                        task={done}
                        todos={todos}
                        setTodos={setTodos}
                        durings={durings}
                        deleteTask={setDones}
                        setDurings={setDurings}
                        taskStatus="done"
                        dones={[]}
                        setDones={setDones}
                    />
                ))}
            </div>
        </div>
</main>
  )
}
export default TodoList
